import { Formik, Form, Field, FieldProps } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Comment, Grid, Header, Loader, Segment } from "semantic-ui-react";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";
import { formatDistanceToNow } from "date-fns";

interface Props {
  projectId: string;
}

const ProjectComments = ({ projectId }: Props) => {
  const { discussionStore, userStore } = useStore();

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
      <Segment secondary fluid="true">
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Comment.Group
                style={{ margin: "10px", padding: "10px", width: "inherit" }}
              >
                {discussionStore.discssions.map((discussion) => (
                  <Segment
                    key={discussion.id}
                    tertiary={discussion.username === userStore.user?.username}
                    color={
                      discussion.username === userStore.user?.username
                        ? "green"
                        : undefined
                    }
                  >
                    <Comment>
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
                          <div>
                            {" "}
                            {formatDistanceToNow(discussion.createdAt) + " ago"}
                          </div>
                        </Comment.Metadata>
                        <Comment.Text style={{ whiteSpace: "pre-wrap" }}>
                          {discussion.body}
                        </Comment.Text>
                      </Comment.Content>
                    </Comment>
                  </Segment>
                ))}

                <Formik
                  onSubmit={(values, { resetForm }) =>
                    discussionStore
                      .addDiscussion(values)
                      .then(() => resetForm())
                  }
                  initialValues={{ body: "" }}
                  validationSchema={Yup.object({
                    body: Yup.string().required(),
                  })}
                >
                  {({ isSubmitting, isValid, handleSubmit }) => (
                    <Form className="ui form">
                      <Field name="body">
                        {(porps: FieldProps) => (
                          <div style={{ position: "relative" }}>
                            <Loader active={isSubmitting} />
                            <textarea
                              style={{ width: "100%" }}
                              placeholder="Add (Enter to Submit, SHIFT + Enter for new line)"
                              rows={2}
                              {...porps.field}
                              onKeyPress={(e) => {
                                if (e.key === "Enter" && e.shiftKey) {
                                  return;
                                }
                                if (e.key === "Enter" && !e.shiftKey) {
                                  e.preventDefault();
                                  isValid && handleSubmit();
                                }
                              }}
                            />
                          </div>
                        )}
                      </Field>
                    </Form>
                  )}
                </Formik>
              </Comment.Group>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </Segment.Group>
  );
};

export default observer(ProjectComments);
