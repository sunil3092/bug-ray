import React, { useState } from "react";
import { Grid, Header, Image } from "semantic-ui-react";
import PhotoUploadDropzone from "./PhotoUploadDropzone";

const PhotoUploadWidget = () => {
  const [files, setFiles] = useState<any>([]);

  return (
    <Grid>
      <Grid.Column width={4}>
        <Header sub content="Step 1 - Add Photo" />
        <PhotoUploadDropzone setFiles={setFiles} />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub content="Step 2 - Resize" />
        {files && files.length > 0 && <Image src={files[0].preview} />}
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub content="Step 3 - Preview" />
      </Grid.Column>
      <Grid.Column width={1} />
    </Grid>
  );
};

export default PhotoUploadWidget;
