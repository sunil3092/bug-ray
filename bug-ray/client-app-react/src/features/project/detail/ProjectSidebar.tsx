import React from "react";
import { Link } from "react-router-dom";
import { List, Image } from "semantic-ui-react";
import { Profile } from "../../../app/models/profile";

interface Props {
  contributors: Profile[];
}

// Orange Halo for Host
const ProjectSidebar = ({ contributors }: Props) => {
  return (
    <List horizontal>
      {contributors.map((contributor) => (
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
      ))}
    </List>
  );
};

export default ProjectSidebar;
