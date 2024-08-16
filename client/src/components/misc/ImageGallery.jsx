import { useParams } from "react-router-dom";
//import { useState, useCallback } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function CustomImageGallery({ photos }) {
  // hooks
  const params = useParams();

  // Transform photos for react-image-gallery
  const galleryPhotos = photos.map((photo) => ({
    original: photo.src,
    thumbnail: photo.src,
    description: photo.title || "",
  }));

  return (
    <ImageGallery
      items={galleryPhotos}
      showThumbnails={true}
      showFullscreenButton={true}
      showPlayButton={true}
      onClick={() => console.log('Image clicked')}
    />
  );
}

