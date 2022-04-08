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
import { setContext } from '@apollo/client/link/context';

import { ThemeProvider, createTheme } from "@mui/material/styles";
import Stack from "@mui/material/Stack";

import Header from "./components/Header";
import Chat from "./pages/Chat";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import NoMatch from "./pages/NoMatch";


// const link = new WebSocketLink({
//   uri: `ws://localhost:3000/`,
//   options: {
//     reconnect: true,
//   },
// });

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       main: "#1976d2",
//     },
//   },
// });

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Stack spacing={2} sx={{ flexGrow: 1 }}>
            <div className="App">
              <Header />
              <div className="container">
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route exact path="/dashboard" component={Dashboard} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/signup" component={Signup} />
                  <Route exact path="/chats" component={Chat} />
                  <Route component={NoMatch} />
                </Switch>
              </div>
              {/* <Footer  */}
            </div>
        </Stack>
      </Router>
    </ApolloProvider>
  );
}

export default App;
