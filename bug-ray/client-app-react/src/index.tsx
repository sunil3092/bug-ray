import React from "react";
import { Router } from "react-router-dom";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "react-calendar/dist/Calendar.css";
import "react-toastify/dist/ReactToastify.min.css";
import "./app/layout/styles.css";
import App from "./app/layout/App";
import reportWebVitals from "./reportWebVitals";
import { store, StoreContext } from "./app/stores/store";
import { createBrowserHistory } from "history";

// To make history object avilable to store and other places in application
export const history = createBrowserHistory();

ReactDOM.render(
  <StoreContext.Provider value={store}>
    {/* Using "Router" insted of "BrowserRouter" would require history object to be passed manually to be available in react application,  */}
    {/* in this way history object is available thougout the application */}
    <Router history={history}>
      <App />
    </Router>
  </StoreContext.Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
