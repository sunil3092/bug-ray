import React from "react";
import Calendar from "react-calendar";
import {
  Dropdown,
  Header,
  Icon,
  Menu,
  Popup,
  Segment,
} from "semantic-ui-react";

const ProjectFilters = () => {
  const filterOptions = [
    { value: "all", content: "All", render: () => <Menu.Item content="All" /> },
    {
      value: "owner",
      content: "Owner",
      render: () => <Menu.Item content="Owner" />,
    },
    {
      value: "contributing",
      content: "Contributing",
      render: () => <Menu.Item content="Contributing" />,
    },
  ];

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
