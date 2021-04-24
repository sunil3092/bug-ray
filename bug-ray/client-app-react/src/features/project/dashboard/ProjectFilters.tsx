import { observer } from "mobx-react-lite";
import React from "react";
import { Icon, Menu } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

const ProjectFilters = () => {
  const {
    projectStore: { predicate, setPredicate },
  } = useStore();

  return (
    <>
      <Menu>
        <Menu.Item>
          <Icon className="filter" />
        </Menu.Item>
        <Menu.Item
          active={predicate.has("all")}
          onClick={() => setPredicate("all", "true")}
        >
          All
        </Menu.Item>
        <Menu.Item
          active={predicate.has("isOwner")}
          onClick={() => setPredicate("isOwner", "true")}
        >
          Owner
        </Menu.Item>
        <Menu.Item
          active={predicate.has("isContributing")}
          onClick={() => setPredicate("isContributing", "true")}
        >
          Contributing
        </Menu.Item>
        {/* <Dropdown text="By Date" pointing="left" className="link item">
          <Dropdown.Menu>
            <Dropdown.Item>
              <Calendar
                onChange={(date) => setPredicate("estimate", date as Date)}
                value={predicate.get("estimate" || new Date())}
              />
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown> */}
      </Menu>
    </>
  );
};

export default observer(ProjectFilters);
