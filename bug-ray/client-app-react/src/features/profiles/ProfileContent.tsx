import { observer } from "mobx-react-lite";
import React from "react";
import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import ProfileAbout from "./ProfileAbout";
import ProfilePhoto from "./ProfilePhoto";
import ProfileTrackings from "./ProfileTrackings";

interface Props {
  profile: Profile;
}

const ProfileContent = ({ profile }: Props) => {
  const panes = [
    { menuItem: "About", render: () => <ProfileAbout /> },
    { menuItem: "Photos", render: () => <ProfilePhoto profile={profile} /> },
    {
      menuItem: "Trackers",
      render: () => <ProfileTrackings />,
    },
    {
      menuItem: "Tracking",
      render: () => <ProfileTrackings />,
    },
  ];

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
    />
  );
};

export default observer(ProfileContent);
