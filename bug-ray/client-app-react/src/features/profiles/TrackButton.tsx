import React, { SyntheticEvent } from "react";
import { Button, Reveal } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";

interface Props {
  profile: Profile;
}

const TrackButton = ({ profile }: Props) => {
  const { profileStore, userStore } = useStore();
  const { updateTracking, loading } = profileStore;

  if (userStore.user?.username === profile.username) return null;

  function handleTracking(e: SyntheticEvent, username: string) {
    e.preventDefault();
    profile.tracking
      ? updateTracking(username, false)
      : updateTracking(username, true);
  }

  return (
    <Reveal animated="move">
      <Reveal.Content visible style={{ width: "100%" }}>
        <Button
          fluid
          color="blue"
          content={profile.tracking ? "Tracking" : "Not Tracking"}
        />
      </Reveal.Content>
      <Reveal.Content hidden style={{ width: "100%" }}>
        <Button
          fluid
          basic
          color={profile.tracking ? "red" : "green"}
          content={profile.tracking ? "Untrack" : "Track"}
          loading={loading}
          onClick={(e) => handleTracking(e, profile.username)}
        />
      </Reveal.Content>
    </Reveal>
  );
};

export default TrackButton;
