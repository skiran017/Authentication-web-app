import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useAuth0 } from "./contexts/auth0.context";
import PrivateRoute from "./components/PrivateRoute";
import SiteHeader from "./components/SiteHeader";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import "./App.css";
import { useEffect } from "react";

export default function App() {
  const { getToken } = useAuth0();

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const token = await getToken();
    console.log(token);
    const response = await fetch(`http://example.com/api`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();

    //we have data
  }

  return (
    <Router>
      <div className="app">
        {/* site header */}
        <SiteHeader />

        {/* routes */}
        <Switch>
          <PrivateRoute path="/dashboard">
            <Dashboard />
          </PrivateRoute>
          <Route path="/" exact={true}>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
