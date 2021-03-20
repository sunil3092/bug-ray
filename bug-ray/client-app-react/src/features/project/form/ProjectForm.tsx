import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";

const ProjectForm = () => {
  const { projectStore } = useStore();
  const {
    selectedProject,
    loading,
    createProject,
    updateProject,
  } = projectStore;
  const initalState = selectedProject ?? {
    id: "",
    name: "",
    description: "",
    estimate: "",
    isFavourate: false,
  };

  const [project, setProject] = useState(initalState);

  function handleSubmit() {
    project.id ? updateProject(project) : createProject(project);
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
        <Form.Input
          type="date"
          name="estimate"
          placeholder="Estimate"
          value={project.estimate}
          onChange={handleInputChange}
        />
        <Button
          loading={loading}
          floated="right"
          positive
          type="submit"
          content="Submit"
        />
        <Button floated="right" type="button" content="Cancel" />
      </Form>
    </Segment>
  );
};

export default observer(ProjectForm);
