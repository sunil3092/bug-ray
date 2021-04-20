import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Button, Grid } from "semantic-ui-react";
import LodingComponet from "../../../app/layout/LodingComponet";
import { PaginationPrams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import ProjectFilters from "./ProjectFilters";
import ProjectList from "./ProjectList";

const ProjectDashboard = () => {
  const { projectStore } = useStore();
  const {
    loadProjects,
    projectRegistry,
    setPagingParams,
    pagination,
  } = projectStore;
  const [loadingNext, setLoadingNext] = useState(false);

  function handleGetNext() {
    setLoadingNext(true);
    setPagingParams(new PaginationPrams(pagination!.currentPage + 1));
    loadProjects().then(() => setLoadingNext(false));
  }

  useEffect(() => {
    if (projectRegistry.size <= 1) {
      loadProjects();
    }
  }, [loadProjects, projectRegistry, setPagingParams]);

  if (projectStore.lodaingInital)
    return <LodingComponet content="Loading app" />;

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width="16">
          <ProjectFilters />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width="16">
          <ProjectList />
          <Button
            floated="right"
            content="More..."
            positive
            onClick={handleGetNext}
            loading={loadingNext}
            disabled={pagination?.totalPages === pagination?.currentPage}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default observer(ProjectDashboard);
