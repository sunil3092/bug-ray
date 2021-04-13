import React, { useEffect, useState } from "react";
import { Button, Grid, Header, Image } from "semantic-ui-react";
import PhotoUploadDropzone from "./PhotoUploadDropzone";
import { Cropper } from "react-cropper";
import PhotoUploadCropper from "./PhotoUploadCropper";

const PhotoUploadWidget = () => {
  const [files, setFiles] = useState<any>([]);
  const [cropper, setCropper] = useState<Cropper>();

  function onCrop() {
    if (cropper) {
      cropper.getCroppedCanvas().toBlob((blob) => console.log(blob));
    }
  }

  //Despose the preview object
  useEffect(() => {
    return () => {
      files.forEach((file: any) => URL.revokeObjectURL(file.preview));
    };
  }, [files]);

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header sub content="Step 1 - Add Photo" />
        <PhotoUploadDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub content="Step 2 - Resize" />
        {files && files.length > 0 && (
          <PhotoUploadCropper
            setCropper={setCropper}
            imagePreview={files[0].preview}
          />
        )}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub content="Step 3 - Preview" />
        {files && files.length > 0 && (
          <>
            <div
              className="image-preview"
              style={{ minHeight: 200, overflow: "hidden" }}
            />
            <Button.Group widths={2}>
              <Button onClick={onCrop} positive icon="check" />
              <Button onClick={() => setFiles([])} negative icon="close" />
            </Button.Group>
          </>
        )}
      </Grid.Column>
      <Grid.Column width={1} />
    </Grid>
  );
};

export default PhotoUploadWidget;
