import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";

const ProjectForm = () => {
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Name" />
        <Form.Input placeholder="Description" />
        <Form.Input placeholder="Estimate" />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
};

export default ProjectForm;
