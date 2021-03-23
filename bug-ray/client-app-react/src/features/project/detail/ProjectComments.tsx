import React from "react";
import { Button, Comment, Form, Header, Segment } from "semantic-ui-react";

const ProjectComments = () => {
  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        secondary
        style={{ border: "none", backgroundColor: "#0d324d" }}
      >
        <Header>Comments</Header>
      </Segment>
      <Segment attached>
        <Comment.Group>
          <Comment>
            <Comment.Avatar
              as="a"
              src="https://react.semantic-ui.com/images/avatar/small/joe.jpg"
            />
            <Comment.Content>
              <Comment.Author>Joe Henderson</Comment.Author>
              <Comment.Metadata>
                <div>1 day ago</div>
              </Comment.Metadata>
              <Comment.Text>
                <p>
                  The hours, minutes and seconds stand as visible reminders that
                  your effort put them all there.
                </p>
                <p>
                  Preserve until your next run, when the watch lets you see how
                  Impermanent your efforts are.
                </p>
              </Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

          <Comment>
            <Comment.Avatar
              as="a"
              src="https://react.semantic-ui.com/images/avatar/small/christian.jpg"
            />
            <Comment.Content>
              <Comment.Author>Christian Rocha</Comment.Author>
              <Comment.Metadata>
                <div>2 days ago</div>
              </Comment.Metadata>
              <Comment.Text>I re-tweeted this.</Comment.Text>
              <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
              </Comment.Actions>
            </Comment.Content>
          </Comment>

          <Form reply>
            <Form.TextArea />
            <Button
              content="Add Comment"
              labelPosition="left"
              icon="edit"
              primary
            />
          </Form>
        </Comment.Group>
      </Segment>
    </>
  );
};

export default ProjectComments;
