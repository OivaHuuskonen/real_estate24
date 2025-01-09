












// ImageUpload.jsx
/*import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";

export default function ImageUpload({ ad, setAd }) {
  const handleUpload = async (e) => {
    try {
      let files = e.target.files;
      files = [...files];
      if (files?.length) {
        setAd({ ...ad, uploading: true });
        files.map((file) => {
          new Promise(() => {
            Resizer.imageFileResizer(
              file,
              1080,
              720,
              "JPEG",
              100,
              0,
              async (uri) => {
                try {
                  const { data } = await axios.post("/upload-image", { image: uri });
                  setAd((prev) => ({
                    ...prev,
                    photos: [data, ...prev.photos],
                    uploading: false,
                  }));
                } catch (err) {
                  console.log(err);
                  setAd({ ...ad, uploading: false });
                }
              },
              "base64"
            );
          });
        });
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, uploading: false });
    }
  };

  const handleDelete = async (file) => {
    const answer = window.confirm("Delete image?");
    if (!answer) return;
    setAd({ ...ad, uploading: true });
    try {
      const { data } = await axios.post("/remove-image", file);
      if (data?.ok) {
        setAd((prev) => ({
          ...prev,
          photos: prev.photos.filter((p) => p.Key !== file.Key),
          uploading: false,
        }));
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, uploading: false });
    }
  };

  return (
    <>
      <label className="btn btn-secondary mb-4">
        {ad.uploading ? "Processing..." : "Upload photos"}
        <input
          onChange={handleUpload}
          type="file"
          accept="image/*"
          multiple
          hidden
        />
      </label>
      {ad.photos?.map((file, index) => (
        <Avatar
          key={index}
          src={file?.Location}
          shape="square"
          size="46"
          className="ml-2 mb-4"
          onClick={() => handleDelete(file)}
        />
      ))}
    </>
  );
}*/











/*import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";

export default function ImageUpload({ ad, setAd }) {
  const handleUpload = async (e) => {
    try {
      let files = e.target.files;
      files = [...files];
      if (files?.length) {
        setAd({ ...ad, uploading: true });

        files.map((file) => {
          new Promise(() => {
            Resizer.imageFileResizer(
              file,
              1080,
              720,
              "JPEG",
              100,
              0,
              async (uri) => {
                try {
                  const { data } = await axios.post(
                    "/upload-image",
                    { image: uri },
                    {
                      headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer your_jwt_token_here', // Lisää JWT-tunniste, jos tarvitset
                      },
                    }
                  );
                  setAd((prev) => ({
                    ...prev,
                    photos: [data, ...prev.photos],
                    uploading: false,
                  }));
                } catch (err) {
                  console.log(err);
                  setAd({ ...ad, uploading: false });
                }
              },
              "base64"
            );
          });
        });
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, uploading: false });
    }
  };

  const handleDelete = async (file) => {
    const answer = window.confirm("Delete image?");
    if (!answer) return;
    setAd({ ...ad, uploading: true });
    try {
      const { data } = await axios.post("/remove-image", file);
      if (data?.ok) {
        setAd((prev) => ({
          ...prev,
          photos: prev.photos.filter((p) => p.Key !== file.Key),
          uploading: false,
        }));
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, uploading: false });
    }
  };

  return (
    <>
      <label className="btn btn-secondary mb-4">
        {ad.uploading ? "Processing..." : "Upload photos"}
        <input
          onChange={handleUpload}
          type="file"
          accept="image/*" // Korjattu kirjoitusvirhe
          multiple
          hidden
        />
      </label>
      {ad.photos?.map((file, index) => (
        <Avatar
          key={index}
          src={file?.Location}
          shape="square"
          size="46"
          className="ml-2 mb-4"
          onClick={() => handleDelete(file)}
        />
      ))}
    </>
  );
}*/



import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";

export default function ImageUpload({ ad, setAd }) {
  const handleUpload = async (e) => {
    try {
      let files = e.target.files;
      files = [...files];
      if (files?.length) {
        // console.log(files);
        setAd({ ...ad, uploading: true });

        files.map((file) => {
          new Promise(() => {
            Resizer.imageFileResizer(
              file,
              1080,
              720,
              "JPEG",
              100,
              0,
              async (uri) => {
                try {
                  // console.log("UPLOAD URI => ", uri);
                  const { data } = await axios.post("/upload-image", {
                    image: uri,
                  });
                  setAd((prev) => ({
                    ...prev,
                    photos: [data, ...prev.photos],
                    uploading: false,
                  }));
                } catch (err) {
                  console.log(err);
                  setAd({ ...ad, uploading: false });
                }
              },
              "base64"
            );
          });
        });
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, uploading: false });
    }
  };

  const handleDelete = async (file) => {
    const answer = window.confirm("Delete image?");
    if (!answer) return;
    setAd({ ...ad, uploading: true });
    try {
      const { data } = await axios.post("/remove-image", file);
      if (data?.ok) {
        setAd((prev) => ({
          ...prev,
          photos: prev.photos.filter((p) => p.Key !== file.Key),
          uploading: false,
        }));
      }
    } catch (err) {
      console.log(err);
      setAd({ ...ad, uploading: false });
    }
  };

  return (
<div className="flex items-center space-x-4 mt-4">
<div className="flex mb-0">
  {ad.photos?.map((file, index) => (
    <Avatar
      key={index}
      src={file?.Location}
      shape="square"
      style={{ width: "120px", height: "120px" }}
            className="border-2 border-[#cbc385]"
     // size="46"
      onClick={() => handleDelete(file)}
    />
  ))}
</div>
  <label className={`bg-[#FFFAFA] hover:bg-[#cbc385] 
    border-2 border-[#cbc385] text-[#879c7d] px-4 py-4 
    rounded cursor-pointer`}>
    {ad.uploading ? "Processing..." : "Upload photos"}
    <input
      onChange={handleUpload}
      type="file"
      accept="image/*"
      multiple
      hidden
    />
  </label>
</div>

    );
  }



    {/*<>
      <label className="btn btn-secondary mb-4">
        {ad.uploading ? "Processing..." : "Upload photos"}
        <input
          onChange={handleUpload}
          type="file"
          accept="image/*"
          multiple
          hidden
        />
      </label>
      {ad.photos?.map((file, index) => (
        <Avatar
          key={index}
          src={file?.Location}
          shape="square"
          size="46"
          className="ml-2 mb-4"
          onClick={() => handleDelete(file)}
        />
      ))}
    </>*/}