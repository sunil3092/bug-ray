import React from "react";
import { Button, Menu } from "semantic-ui-react";
import { useStore } from "../stores/store";

const Navbar = () => {
  const { projectStore } = useStore();
  return (
    <Menu inverted fixed="top" size="huge">
      <Menu.Item icon="bug" className="whiteGlow" />
      <Menu.Item name="Bug-Ray" />
      <Menu.Item>
        <Button
          positive
          content="Add Project"
          onClick={() => projectStore.openForm()}
        />
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
