import React from "react";
import "./App.css";
import Movies from "./Component/movies";
import Customer from "./Component/customer";
import NotFound from "./Component/notFound";
import { Route, Redirect, Switch } from "react-router-dom";
import NavBar from "./Component/navBar";
import Rentals from "./Component/rentals";
import MovieForm from "./Component/movieForm";
import LoginForm from "./Component/loginForm";
import RegisterForm from "./Component/registerForm";

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/register" component={RegisterForm} />
          <Route path="/login" component={LoginForm} />
          <Route path="/movies/:id" component={MovieForm} />
          <Route path="/not-found" component={NotFound} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/customers" component={Customer} />
          <Route path="/movies" component={Movies} />
          <Redirect from="/" exact to="/movies" />
          <Redirect to="not-found" />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
