import React from "react";
import { Button, Icon, List } from "semantic-ui-react";

const EffortListItem = () => {
  return (
    <List divided verticalAlign="middle">
      <List.Item>
        <List.Content floated="right">
          <Button>Fixed</Button>
        </List.Content>
        <Icon className="bug" />
        <List.Content>Fix UI</List.Content>
      </List.Item>
    </List>
  );
};

export default EffortListItem;
