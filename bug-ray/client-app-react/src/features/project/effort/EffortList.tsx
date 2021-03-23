import React from "react";
import { Segment } from "semantic-ui-react";
import EffortListItem from "./EffortListItem";

const EffortList = () => {
  return (
    <Segment>
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
  );
};

export default EffortList;
