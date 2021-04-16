import { Formik, Form } from "formik";
import { values } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Comment, Grid, Header, Segment } from "semantic-ui-react";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { useStore } from "../../../app/stores/store";

interface Props {
  projectId: string;
}

const ProjectComments = ({ projectId }: Props) => {
  const { discussionStore } = useStore();

  useEffect(() => {
    if (projectId) {
      discussionStore.createHubConnection(projectId);
    }
    return () => {
      discussionStore.clearDiscussion();
    };
  }, [discussionStore, projectId]);

  return (
    <Segment.Group>
      <Segment>
        <Grid>
          <Grid.Row centered>
            <Header>Discussions</Header>
          </Grid.Row>
        </Grid>
      </Segment>
      <Segment secondary>
        <Grid>
          <Grid.Row>
            <Comment.Group style={{ margin: "auto" }}>
              {discussionStore.discssions.map((discussion) => (
                <Comment key={discussion.id}>
                  <Comment.Avatar
                    as="a"
                    src={discussion.image || "/assets/user.png"}
                  />
                  <Comment.Content>
                    <Comment.Author
                      as={Link}
                      to={`/profiles/${discussion.username}`}
                    >
                      {discussion.displayName}
                    </Comment.Author>
                    <Comment.Metadata>
                      <div>{discussion.createdAt}</div>
                    </Comment.Metadata>
                    <Comment.Text>{discussion.body}</Comment.Text>
                    <Comment.Actions>
                      <Comment.Action>Reply</Comment.Action>
                    </Comment.Actions>
                  </Comment.Content>
                </Comment>
              ))}

              <Formik
                onSubmit={(values, { resetForm }) =>
                  discussionStore.addDiscussion(values).then(() => resetForm())
                }
                initialValues={{ body: "" }}
              >
                {({ isSubmitting, isValid }) => (
                  <Form className="ui form">
                    <MyTextArea placeholder="Add" name="body" rows={2} />
                    <Button
                      loading={isSubmitting}
                      disabled={isSubmitting || !isValid}
                      content="Add Reply"
                      labelPosition="left"
                      icon="edit"
                      primary
                      type="submit"
                      floated="right"
                    />
                  </Form>
                )}
              </Formik>
            </Comment.Group>
          </Grid.Row>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default observer(ProjectComments);
