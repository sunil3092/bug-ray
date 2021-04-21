import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Grid, Loader } from "semantic-ui-react";
import { PaginationPrams } from "../../../app/models/pagination";
import { useStore } from "../../../app/stores/store";
import ProjectFilters from "./ProjectFilters";
import ProjectList from "./ProjectList";
import ProjectListItemPlaceholder from "./ProjectListItemPlaceholder";

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

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width="16">
          <ProjectFilters />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width="16">
          {projectStore.lodaingInital && !loadingNext ? (
            <>
              <ProjectListItemPlaceholder />
              <ProjectListItemPlaceholder />
            </>
          ) : (
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
          )}
        </Grid.Column>
        <Grid.Column width={16}>
          <Loader active={loadingNext} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default observer(ProjectDashboard);
