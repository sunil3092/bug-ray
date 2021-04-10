import React from "react";
import { Button, Card, Image } from "semantic-ui-react";

const EffortListItem = () => {
  return (
    <Card>
      <Card.Content>
        <Image circular floated="right" size="mini" src="/assets/user.png" />
        <Card.Header>Bug/Task</Card.Header>
        <Card.Meta>Assigned To</Card.Meta>
        <Card.Description>Bug/Task Description</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green">
            Select
          </Button>
          <Button basic color="red">
            Delete
          </Button>
        </div>
      </Card.Content>
    </Card>
  );
};

export default EffortListItem;
