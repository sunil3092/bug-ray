import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Project } from "../../../app/models/project";

interface Props {
  selectedProject: Project | undefined;
  closeForm: () => void;
  createOrEdit: (project: Project) => void;
}

const ProjectForm = ({ selectedProject, closeForm, createOrEdit }: Props) => {
  const initalState = selectedProject ?? {
    id: "",
    name: "",
    description: "",
    estimate: "",
    isFavourate: false,
  };

  const [project, setProject] = useState(initalState);

  function handleSubmit() {
    createOrEdit(project);
  }

  // React makes the inputs readonly by default because it cannot track changes when 'Value' attribute is added. hence onchange needs to be handled seperatley.
  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setProject({ ...project, [name]: value });
  }

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Name"
          name="name"
          value={project.name}
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="description"
          name="description"
          value={project.description}
          onChange={handleInputChange}
        />
        <Form.Input placeholder="Estimate" value={project.estimate} />
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
