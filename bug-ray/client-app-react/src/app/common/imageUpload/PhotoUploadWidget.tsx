import React from "react";
import { Grid, Header } from "semantic-ui-react";

const PhotoUploadWidget = () => {
  return (
    <Grid>
      <Grid.Column width={4}>
        <Header sub content="Step 1 - Add Photo" />
      </Grid.Column>
      <Grid.Column width={1} />
      <Grid.Column width={4}>
        <Header sub content="Step 2 - Resize" />
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
