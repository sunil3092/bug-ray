import React, { Fragment } from "react";
import { Card } from "semantic-ui-react";
import EffortListItem from "./EffortListItem";

const EffortList = () => {
  return (
    <Fragment>
      <Card.Group itemsPerRow={5}>
        <EffortListItem />
        <EffortListItem />
      </Card.Group>
    </Fragment>
  );
};

export default EffortList;
