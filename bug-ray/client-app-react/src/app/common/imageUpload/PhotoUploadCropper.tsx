import React from "react";
import "cropperjs/dist/cropper.css";
import { Cropper } from "react-cropper";

interface Props {
  imagePreview: string;
  setCropper: (cropper: Cropper) => void;
}

// initalAspectRatio and aspectRatio when set to 1 it forces a square image
const PhotoUploadCropper = ({ setCropper, imagePreview }: Props) => {
  return (
    <Cropper
      src={imagePreview}
      style={{ height: 200, width: "100%" }}
      initialAspectRatio={1}
      aspectRatio={1}
      preview=".image-preview"
      guides={false}
      viewMode={1}
      autoCropArea={1}
      background={false}
      onInitialized={(cropper) => setCropper(cropper)}
    />
  );
};

export default PhotoUploadCropper;
