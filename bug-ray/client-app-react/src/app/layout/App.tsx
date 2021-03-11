import React, { useEffect, useState } from "react";
import axios from "axios";
import { List } from "semantic-ui-react";
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
    <div>
      <Navbar />
      <List>
        {efforts.map((effort) => (
          <List.Item key={effort.id}>{effort.title}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
