import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { WebSocketLink } from "@apollo/client/link/ws";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";


import Header from "./components/Header"; 
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Home from './pages/Home';

// const link = new WebSocketLink({
//   uri: `ws://localhost:3000/`,
//   options: {
//     reconnect: true,
//   },
// });

const httpLink = createHttpLink({
  uri: "/graphql",
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
          <ThemeProvider theme={darkTheme}>
            <div className="App">
              <Header />
              <div className="container">
                <Switch>
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  {/* <Route exact path="/home" component={Home} /> */}
                </Switch>
              </div>
              {/* <Footer  */}
            </div>
          </ThemeProvider>
        </Stack>
      </Router>
    </ApolloProvider>
  );
}

export default App;
