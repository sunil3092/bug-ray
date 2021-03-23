import React from "react";
import { Header, Segment } from "semantic-ui-react";
import EffortListItem from "./EffortListItem";

const EffortList = () => {
  return (
    <>
      <Segment
        textAlign="center"
        attached="top"
        inverted
        secondary
        style={{ border: "none", backgroundColor: "#0d324d" }}
      >
        <Header>Efforts</Header>
      </Segment>
      <Segment attached>
        <Segment>
          <EffortListItem />
        </Segment>
        <Segment>
          <EffortListItem />
        </Segment>
        <Segment>
          <EffortListItem />
        </Segment>
      </Segment>
    </>
  );
};

export default EffortList;
