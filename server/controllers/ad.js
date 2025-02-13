import * as config from "../config.js";
import { AWSS3 } from "../config.js";
import Ad from "../models/ad.js";
import User from "../models/user.js";
import slugify from "slugify";
import { emailTemplate } from "../helpers/email.js";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { SendEmailCommand } from "@aws-sdk/client-ses"; 
import { nanoid } from 'nanoid';

export const uploadImage = async (req, res) => {
  try {
    // Extract the base64 data from the request
    const { image } = req.body;
    
    // Prepare the base64 data
    const base64Data = new Buffer.from(
      image.replace(/^data:image\/\w+;base64,/, ''),
      'base64'
    );
    
    // Get the file type
    const type = image.split(';')[0].split('/')[1];
    
    // Parameters for S3 upload
    const params = {
      Bucket: 'emarket24', 
      Key: `${nanoid()}.${type}`,
      Body: base64Data,
      ACL: 'public-read',
      ContentEncoding: 'base64',
      ContentType: `image/${type}`
    };

    try {
      // Use the PutObjectCommand with the S3 client
      const command = new PutObjectCommand(params);
      const data = await AWSS3.send(command);
      
      // Construct the file URL
      const fileUrl = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
      
      // Return the response
      return res.json({
        url: fileUrl,
        key: params.Key,
        Location: fileUrl // For compatibility with your frontend code
      });
      
    } catch (err) {
      console.log("S3 UPLOAD ERROR", err);
      return res.status(400).json({ error: "S3 upload failed" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Upload failed" });
  }
};

export const removeImage = (req, res) => {
  try {
    const { Key, Bucket } = req.body;

    config.AWSS3.deleteObject({ Bucket, Key }, (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
      } else {
        res.send({ ok: true });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

export const create = async (req, res) => {
  try {
    // console.log(req.body); 
    const { photos, description, title, address, price, type, landsize } =
      req.body;
    if (!photos?.length) {
      return res.json({ error: "Photos are required" });
    }
    if (!price) {
      return res.json({ error: "Price is required" });
    }
    if (!type) {
      return res.json({ error: "Is property house or land?" });
    }
    if (!address) {
      return res.json({ error: "Address is required" });
    }
    if (!description) {
      return res.json({ error: "Description is required" });
    }

    const geo = await config.GOOGLE_GEOCODER.geocode(address);
    console.log("geo => ", geo);
    const ad = await new Ad({
      ...req.body,
      postedBy: req.user._id,
      location: {
        type: "Point",
        coordinates: [geo?.[0]?.longitude, geo?.[0]?.latitude],
      },
      googleMap: geo,
      slug: slugify(`${type}-${address}-${price}-${nanoid(6)}`),
    }).save();

    // make user role > Seller
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { role: "Seller" },
      },
      { new: true }
    );

    user.password = undefined;
    user.resetCode = undefined;

    res.json({
      ad,
      user,
    });
  } catch (err) {
    res.json({ error: "Something went wrong. Try again." });
    console.log(err);
  }
};

export const ads = async (req, res) => {
  try {
    const adsForSell = await Ad.find({ action: "Sell" })
      .select("-googleMap -location -photo.Key -photo.key -photo.ETag")
      .sort({ createdAt: -1 })
      .limit(12);

    const adsForRent = await Ad.find({ action: "Rent" })
      .select("-googleMap -location -photo.Key -photo.key -photo.ETag")
      .sort({ createdAt: -1 })
      .limit(12);

    res.json({ adsForSell, adsForRent });
  } catch (err) {
    console.log(err);
  }
};

export const read = async (req, res) => {
  try {
    const ad = await Ad.findOne({ slug: req.params.slug }).populate(
      "postedBy",
      "name username email phone company photo.Location"
    );
    // console.log("AD => ", ad);

    // related
    const related = await Ad.find({
      _id: { $ne: ad._id },
      action: ad.action,
      type: ad.type,
      address: {
        $regex: ad.googleMap[0]?.admininstrativeLevels?.levelllong || "",
        $options: "i",
      },
    })
      .limit(3)
      .select("-photos.Key -photos.key -photos.ETag -photos.Bucket -googleMap");

    res.json({ ad, related });
  } catch (err) {
    console.log(err);
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $addToSet: { wishlist: req.body.adId },
      },
      { new: true }
    );

    const { password, resetCode, ...rest } = user._doc;

    // console.log("added to wishlist => ", rest);

    res.json(rest);
  } catch (err) {
    console.log(err);
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      {
        $pull: { wishlist: req.params.adId },
      },
      { new: true }
    );

    const { password, resetCode, ...rest } = user._doc;
    // console.log("remove from wishlist => ", rest);

    res.json(rest);
  } catch (err) {
    console.log(err);
  }
};

export const contactSeller = async (req, res) => {
  try {
    const { name, email, message, phone, adId } = req.body;
    const ad = await Ad.findById(adId).populate("postedBy", "email");

    const user = await User.findByIdAndUpdate(req.user._id, {
      $addToSet: { enquiredProperties: adId },
    });

    if (!user) {
      return res.json({ error: "Could not find user with that email" });
    } else {
      // send email

      const emailParams = emailTemplate(
        ad.postedBy.email,
        `<p>You have received a new customer enquiry</p>
          <h4>Customer details</h4>
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Phone: ${phone}</p>
          <p>Message: ${message}</p>
          <a href="${config.CLIENT_URL}/ad/${ad.slug}">${ad.type} in ${ad.address} for ${ad.action} ${ad.price}</a>
        `,
        email,
        "New enquiry received"
      );

      try {
        const command = new SendEmailCommand(emailParams);
        const data = await config.AWSSES.send(command);
        console.log("Email sent successfully:", data);
        return res.json({ ok: true });
      } catch (err) {
        console.log("Error sending email:", err);
        return res.json({ ok: false });
      }
    }
  } catch (err) {
    console.log("Controller error:", err);
    return res.status(500).json({ error: "Failed to process request" });
  }
};


      /*config.AWSSES.sendEmail(
        emailTemplate(
          ad.postedBy.email,
          `<p>You have received a new customer enquiry</p>
            <h4>Customer details</h4>
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
            <p>Message: ${message}</p>
        <a href="${config.CLIENT_URL}/ad/${ad.slug}">${ad.type} in ${ad.address} for ${ad.action} ${ad.price}</a>
        `,
          email,
          "New enquiry received"
        ),
        (err, data) => {
          if (err) {
            console.log(err);
            return res.json({ ok: false });
          } else {
            console.log(data);
            return res.json({ ok: true });
          }
        }
      );
    }
  } catch (err) {
    console.log(err);
  }
};*/

export const userAds = async (req, res) => {
  try {
    const perPage = 3;
    const page = req.params.page ? req.params.page : 1;

    const total = await Ad.find({ postedBy: req.user._id });

    const ads = await Ad.find({ postedBy: req.user._id })
      .populate("postedBy", "name email username phone company")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.json({ ads, total: total.length });
  } catch (err) {
    console.log(err);
  }
};

export const update = async (req, res) => {
  try {
    const { photos, price, type, address, description } = req.body;

    const ad = await Ad.findById(req.params._id);

    const owner = req.user._id == ad?.postedBy;

    if (!owner) {
      return res.json({ error: "Permission denied" });
    } else {
      // validation
      if (!photos.length) {
        return res.json({ error: "Photos are required" });
      }
      if (!price) {
        return res.json({ error: "Price is required" });
      }
      if (!type) {
        return res.json({ error: "Is property hour or land?" });
      }
      if (!address) {
        return res.json({ error: "Address is required" });
      }
      if (!description) {
        return res.json({ error: "Description are required" });
      }

      const geo = await config.GOOGLE_GEOCODER.geocode(address);

      await ad.update({
        ...req.body,
        slug: ad.slug,
        location: {
          type: "Point",
          coordinates: [geo?.[0]?.longitude, geo?.[0]?.latitude],
        },
      });

      res.json({ ok: true });
    }
  } catch (err) {
    console.log(err);
  }
};

export const remove = async (req, res) => {
  try {
    const ad = await Ad.findOne({ _id: req.params._id });
    const owner = req.user._id == ad?.postedBy;
    if (!owner) {
      return res.json({ error: "Permission denied" });
    } else {
      await Ad.deleteOne({ _id: ad._id });
      res.json({ ok: true });
    }
  } catch (err) {
    console.log(err);
  }
};

export const enquiriedProperties = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const ads = await Ad.find({ _id: user.enquiredProperties }).sort({
      createdAt: -1,
    });
    res.json(ads);
  } catch (err) {
    console.log(err);
  }
};

export const wishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const ads = await Ad.find({ _id: user.wishlist }).sort({
      createdAt: -1,
    });
    res.json(ads);
  } catch (err) {
    console.log(err);
  }
};

export const adsForSell = async (req, res) => {
  try {
    const ads = await Ad.find({ action: "Sell" })
      .select("-googleMap -location -photo.Key -photo.key -photo.ETag")
      .sort({ createdAt: -1 })
      .limit(24);

    res.json(ads);
  } catch (err) {
    console.log(err);
  }
};

export const adsForRent = async (req, res) => {
  try {
    const ads = await Ad.find({ action: "Rent" })
      .select("-googleMap -location -photo.Key -photo.key -photo.ETag")
      .sort({ createdAt: -1 })
      .limit(24);

    res.json(ads);
  } catch (err) {
    console.log(err);
  }
};

export const search = async (req, res) => {
  try {
    console.log("Search query params:", req.query);
    const { action, address, type, priceRange } = req.query;

    const geo = await config.GOOGLE_GEOCODER.geocode(address);
    console.log("Geocoding results:", geo);

    if (!geo?.[0]?.latitude || !geo?.[0]?.longitude) {
      return res.status(400).json({ error: "Location not found" });
    }

    // Haetaan kunnan/kaupungin nimi geocoding-tuloksista
    const locality = geo[0].city || geo[0].administrativeLevels?.level1long || geo[0].county;
    console.log("Searching in locality:", locality);

    const query = {
      action: action === "Buy" ? "Sell" : "Rent",
      type,
      price: {
        $gte: parseInt(priceRange[0]),
        $lte: parseInt(priceRange[1]),
      },
      // Käytetään $geoNear aggregaatiota tarkempaan sijaintihakuun
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [geo[0].longitude, geo[0].latitude]
          },
          $maxDistance: 5000, // 5km säde
          $minDistance: 0
        }
      }
    };
    // Lisätään tekstihaku osoitteelle
    if (locality) {
      query["$or"] = [
        { "googleMap.0.city": new RegExp(locality, "i") },
        { "googleMap.0.county": new RegExp(locality, "i") },
        { "googleMap.0.administrativeLevels.level1long": new RegExp(locality, "i") }
      ];
    }

    console.log("MongoDB query:", JSON.stringify(query, null, 2));

    const ads = await Ad.find(query)
      .limit(24)
      .sort({ createdAt: -1 })
      .select("-photos.key -photos.Key -photos.ETag -photos.Bucket -location -googleMap");

    console.log(`Found ${ads.length} matching ads`);
    res.json(ads);

  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ error: "Search failed" });
  }
};


