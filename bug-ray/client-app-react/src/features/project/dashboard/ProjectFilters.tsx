import React from "react";
import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

const ProjectFilters = () => {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: 20 }}>
        <Header icon="filter" attached color="purple" content="Filters" />
        <Menu.Item content="All" />
        <Menu.Item content="Owner" />
        <Menu.Item content="Contributing" />
      </Menu>
      <Header />
      <Calendar />
    </>
  );
};

export default ProjectFilters;
