import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Form, Segment } from "semantic-ui-react";
import LodingComponet from "../../../app/layout/LodingComponet";
import { useStore } from "../../../app/stores/store";

const ProjectForm = () => {
  const { projectStore } = useStore();
  const {
    loading,
    createProject,
    updateProject,
    loadProject,
    lodaingInital,
  } = projectStore;

  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState({
    id: "",
    name: "",
    description: "",
    estimate: "",
    isFavourate: false,
  });

  useEffect(() => {
    if (id) loadProject(id).then((project) => setProject(project!));
  }, [id, loadProject]);

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

  if (lodaingInital && id) return <LodingComponet content="Loading Project" />;

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
