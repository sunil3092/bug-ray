import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";
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

  if (projectStore.lodaingInital && !loadingNext)
    return <LodingComponet content="Loading Projects" />;

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width="16">
          <ProjectFilters />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width="16">
          <InfiniteScroll
            pageStart={0}
            loadMore={handleGetNext}
            hasMore={
              !loadingNext &&
              !!pagination &&
              pagination.currentPage < pagination.totalPages
            }
            initialLoad={false}
          >
            <ProjectList />
          </InfiniteScroll>
        </Grid.Column>
        <Grid.Column width={16}>
          <Loader active={loadingNext} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default observer(ProjectDashboard);
