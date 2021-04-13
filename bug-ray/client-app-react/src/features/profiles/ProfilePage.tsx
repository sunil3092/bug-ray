import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Grid } from "semantic-ui-react";
import LodingComponet from "../../app/layout/LodingComponet";
import { useStore } from "../../app/stores/store";
import ProfileContent from "./ProfileContent";
import ProfileHeader from "./ProfileHeader";

const ProfilePage = () => {
  //getting values form  Route params
  const { username } = useParams<{ username: string }>();
  const { profileStore } = useStore();
  const { loadingProfile, loadProfile, profile } = profileStore;

  useEffect(() => {
    loadProfile(username);
  }, [loadProfile, username]);

  if (loadingProfile) return <LodingComponet content="Loading Profile..." />;

  return (
    <Grid>
      <Grid.Column width={16}>
        {profile && <ProfileHeader profile={profile} />}
        {profile && <ProfileContent profile={profile} />}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProfilePage);
