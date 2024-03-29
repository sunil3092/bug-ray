import { observer } from "mobx-react-lite";
import React from "react";
import { Tab } from "semantic-ui-react";
import { Profile } from "../../app/models/profile";
import { useStore } from "../../app/stores/store";
import ProfileAbout from "./ProfileAbout";
import ProfilePhoto from "./ProfilePhoto";
import ProfileProjects from "./ProfileProjects";
import ProfileTrackings from "./ProfileTrackings";

interface Props {
  profile: Profile;
}

const ProfileContent = ({ profile }: Props) => {
  const panes = [
    { menuItem: "About", render: () => <ProfileAbout /> },
    { menuItem: "Photos", render: () => <ProfilePhoto profile={profile} /> },
    { menuItem: "Projects", render: () => <ProfileProjects /> },
    {
      menuItem: "User Tracked By",
      render: () => <ProfileTrackings />,
    },
    {
      menuItem: "User Tracks",
      render: () => <ProfileTrackings />,
    },
  ];

  const { profileStore } = useStore();

  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition="right"
      panes={panes}
      onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
    />
  );
};

export default observer(ProfileContent);
