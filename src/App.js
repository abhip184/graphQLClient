import React, { useState } from "react";
import PostList from "./components/PostList";
import AddPost from "./components/AddPost";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import GetPosts from "./components/GetPosts";
import io from "socket.io-client";
const socket = io.connect("http://192.168.0.147:4000");
//client setup

const client = new ApolloClient({
  uri: "http://192.168.0.147:4000/graphql"
});

function App() {
  const [loading, setLoading] = useState(false)
  return (
    <ApolloProvider client={client}>
      <div id="main">
        <h1>
          {" "}
          Reading list{" "}
          {loading && <span style={{ fontSize: "medium", float: "left" }}>Loading...</span>}
        </h1>
        <GetPosts socket={socket} />
        <AddPost socket={socket} />
      </div>
    </ApolloProvider>
  );
}

export default App;
