import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";
import { useAuth } from "../../context/auth";

export default function ProfileUpload({
  photo,
  setPhoto,
  uploading,
  setUploading,
}) {
  const [auth, setAuth] = useAuth();

  const handleUpload = async (e) => {
    try {
      let file = e.target.files[0];

      if (file) {
        setUploading(true);

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
                const { data } = await axios.post("/upload-image", {
                  image: uri,
                });
                setPhoto(data);
                setUploading(false);
              } catch (err) {
                console.log(err);
                setUploading(false);
              }
            },
            "base64"
          );
        });
      }
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    const answer = window.confirm("Delete image?");
    if (!answer) return;
    setUploading(true);
    try {
      const { data } = await axios.post("/remove-image", photo);
      if (data?.ok) {
        setPhoto(null);
        setUploading(false);
      }
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  return (
    <div className="flex items-center space-x-4 mt-4">
      {photo?.Location && (
        <>
          <Avatar
            src={photo.Location}
            shape="square"
            style={{ width: "120px", height: "120px" }}
            className="border-2 border-[#cbc385]"
          />

          <button
            onClick={handleDelete}
            className="bg-[#FFFAFA] hover:bg-[#cbc385] 
            border-2 border-[#cbc385] text-[#879c7d] px-4 py-4 rounded"
          >
            Delete Photo
          </button>
        </>
      )}

      <label
        className={`${
          uploading ? "bg-[#FFFAFA]" : "bg-[#FFFAFA] hover:bg-[#cbc385] text-[#879c7d] border-2 border-[#cbc385] px-4 py-4 rounded"
        } text-[#879c7d] px-4 rounded cursor-pointer`}
      >
        {uploading ? "Processing..." : "Upload Photo"}
        <input
          onChange={handleUpload}
          type="file"
          accept="image/*"
          hidden
        />
      </label>
    </div>
  );
}






/*060125import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";
import { useAuth } from "../../context/auth";

export default function ProfileUpload({
  photo,
  setPhoto,
  uploading,
  setUploading,
}) {
  // context
  const [auth, setAuth] = useAuth();

  const handleUpload = async (e) => {
    try {
      let file = e.target.files[0];

      if (file) {
        setUploading(true);

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
                const { data } = await axios.post("/upload-image", {
                  image: uri,
                });
                setPhoto(data);
                setUploading(false);
              } catch (err) {
                console.log(err);
                setUploading(false);
              }
            },
            "base64"
          );
        });
      }
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const handleDelete = async () => {
    const answer = window.confirm("Delete image?");
    if (!answer) return;
    setUploading(true);
    try {
      const { data } = await axios.post("/remove-image", photo);
      if (data?.ok) {
        setPhoto(null);
        setUploading(false);
      }
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  return (
    <div className="grid-row: 1; mt-4">
      <label
        className={`${
          uploading ? "bg-gray-300" : "bg-[#cbc385] hover:bg-[#cf8c60]"
        } text-[#879c7d] py-2 px-4 rounded cursor-pointer`}
      >
        {uploading ? "Processing..." : "Upload Photo"}
        <input
          onChange={handleUpload}
          type="file"
          accept="image/*"
          hidden
        />
      </label>
      {photo?.Location && (
        <div className="mt-4">
          <Avatar
            src={photo.Location}
            shape="square"
            size="100"
            className="mb-0 mx-4"
          />
          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-[#879c7d] py-2 px-4 rounded"
          >
            Delete Photo
          </button>
        </div>
      )}
    </div>
  );
}*/




/*import Resizer from "react-image-file-resizer";
import axios from "axios";
import { Avatar } from "antd";
import { useAuth } from "../../context/auth";

export default function ProfileUpload({
  photo,
  setPhoto,
  uploading,
  setUploading,
}) {
  // context
  const [auth, setAuth] = useAuth();

  const handleUpload = async (e) => {
    try {
      let file = e.target.files[0];

      if (file) {
        // console.log(files);
        setUploading(true);

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
                setPhoto(data);
                setUploading(false);
              } catch (err) {
                console.log(err);
                setUploading(false);
              }
            },
            "base64"
          );
        });
      }
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const handleDelete = async (file) => {
    const answer = window.confirm("Delete image?");
    if (!answer) return;
    setUploading(true);
    try {
      const { data } = await axios.post("/remove-image", photo);
      if (data?.ok) {
        setPhoto(null);
        setUploading(false);
      }
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  return (
    <>
      <label className="btn btn-secondary mb-4 mt-4">
        {uploading ? "Processing..." : "Upload photos"}
        <input
          onChange={handleUpload}
          type="file"
          accept="image/*"
          // multiple
          hidden
        />
      </label>
      {photo?.Location ? (
        <Avatar
          src={photo.Location}
          shape="square"
          size="46"
          className="ml-2 mb-4 mt-4"
          onClick={() => handleDelete()}
        />
      ) : (
        ""
      )}
    </>
  );
}*/