import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Button, FormField, Label, Segment } from "semantic-ui-react";
import LodingComponet from "../../../app/layout/LodingComponet";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { values } from "mobx";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/catagoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

const ProjectForm = () => {
  const history = useHistory();
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

  const validationSchema = Yup.object({
    name: Yup.string().required("Project name is required"),
    estimate: Yup.string().required("Project estimate is required"),
    description: Yup.string().required("Project description is required"),
  });

  useEffect(() => {
    if (id) loadProject(id).then((project) => setProject(project!));
  }, [id, loadProject]);

  // function handleSubmit() {
  //   if (project.id.length === 0) {
  //     let newProject = { ...project, id: uuid() };
  //     createProject(newProject).then(() =>
  //       history.push(`/projects/${newProject.id}`)
  //     );
  //   } else {
  //     updateProject(project).then(() =>
  //       history.push(`/projects/${project.id}`)
  //     );
  //   }
  // }

  // // React makes the inputs readonly by default because it cannot track changes when 'Value' attribute is added. hence onchange needs to be handled seperatley.
  // function handleInputChange(
  //   event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) {
  //   const { name, value } = event.target;
  //   setProject({ ...project, [name]: value });
  // }

  if (lodaingInital && id) return <LodingComponet content="Loading Project" />;

  return (
    <Segment clearing>
      <Formik
        validationSchema={validationSchema}
        enableReinitialize
        initialValues={project}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleSubmit }) => (
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
            <MyTextInput placeholder="Name" name="name" />
            <MyTextArea rows={3} placeholder="description" name="description" />
            <MyDateInput
              name="estimate"
              placeholderText="Estimate"
              showTimeSelect
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            {/* <MySelectInput options={categoryOptions} name="category" placeholder="Category" /> */}
            <Button
              loading={loading}
              floated="right"
              positive
              type="submit"
              content="Submit"
            />
            <Button
              as={Link}
              to="/projects"
              floated="right"
              type="button"
              content="Cancel"
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
};

export default observer(ProjectForm);
