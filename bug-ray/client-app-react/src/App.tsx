import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { Header, List } from "semantic-ui-react";

function App() {
  const [efforts, setEfforts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/effort").then((response) => {
      console.log(response);
      setEfforts(response.data);
    });
  }, []);

  return (
    <div>
      <Header as="h2" icon="users" content="Bug-Ray" />
      <List>
        {efforts.map((effort: any) => (
          <List.Item key={effort.id}>{effort.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
