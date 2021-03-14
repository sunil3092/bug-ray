import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Project } from "../../../app/models/project";

interface Props {
  selectedProject: Project | undefined;
  closeForm: () => void;
}

const ProjectForm = ({ selectedProject, closeForm }: Props) => {
  return (
    <Segment clearing>
      <Form>
        <Form.Input placeholder="Name" value={selectedProject?.name} />
        <Form.Input
          placeholder="Description"
          value={selectedProject?.description}
        />
        <Form.Input placeholder="Estimate" value={selectedProject?.estimate} />
        <Button floated="right" positive type="submit" content="Submit" />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={closeForm}
        />
      </Form>
    </Segment>
  );
};

export default ProjectForm;
