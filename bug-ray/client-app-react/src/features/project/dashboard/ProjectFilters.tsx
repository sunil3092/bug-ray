import React from "react";
import Calendar from "react-calendar";
import { Dropdown, Icon, Menu } from "semantic-ui-react";

const ProjectFilters = () => {
  return (
    <>
      <Menu>
        <Menu.Item>
          <Icon className="filter" />
        </Menu.Item>
        <Menu.Item>All</Menu.Item>
        <Menu.Item>Owner</Menu.Item>
        <Menu.Item>Contributing</Menu.Item>
        <Dropdown text="By Date" pointing="left" className="link item">
          <Dropdown.Menu>
            <Dropdown.Item>
              <Calendar />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu>
    </>
  );
};

export default ProjectFilters;
