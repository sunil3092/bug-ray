import React from "react";
import { Link } from "react-router-dom";
import { List, Image, Popup } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";
import ProfileCard from "../../profiles/ProfileCard";

interface Props {
  contributors: Profile[];
}

// Orange Halo for Host
const ProjectSidebar = ({ contributors }: Props) => {
  return (
    <List horizontal>
      {contributors.map((contributor) => (
        <Popup
          size="mini"
          key={contributor.username}
          hoverable
          trigger={
            <List.Item
              key={contributor.username}
              as={Link}
              to={`/profile/${contributor.username}`}
            >
              <Image
                size="mini"
                circular
                src={contributor.image || "/assets/user.png"}
              />
            </List.Item>
          }
        >
          <Popup.Content>
            <ProfileCard profile={contributor} />
          </Popup.Content>
        </Popup>
      ))}
    </List>
  );
};

export default ProjectSidebar;
