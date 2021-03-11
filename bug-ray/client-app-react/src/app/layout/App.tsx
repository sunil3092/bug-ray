import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { Container, List } from "semantic-ui-react";
import { Effort } from "../models/effort";
import Navbar from "./Navbar";

function App() {
  const [efforts, setEfforts] = useState<Effort[]>([]);

  useEffect(() => {
    axios.get<Effort[]>("http://localhost:5000/api/effort").then((response) => {
      console.log(response);
      setEfforts(response.data);
    });
  }, []);

  return (
    <>
      <Navbar />
      <Container style={{ marginTop: "7em" }}>
        <List>
          {efforts.map((effort) => (
            <List.Item key={effort.id}>{effort.title}</List.Item>
          ))}
        </List>
      </Container>
    </>
  );
}

export default App;
