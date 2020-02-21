import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router-dom";
import ActionsList from "./components/ActionsList";
import ActionCreateUpdate from "./components/ActionCreateUpdate";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";

const BaseLayout = () => (
  <div>
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="/">Actions</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    </Navbar>

    <div>
      <Route path="/" exact component={ActionsList} />
      <Route path="/create/" component={ActionCreateUpdate} />
      <Route path="/actions/:id" exact component={ActionCreateUpdate} />
    </div>
  </div>
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <BaseLayout />
      </BrowserRouter>
    );
  }
}

export default App;
