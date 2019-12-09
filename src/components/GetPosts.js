import React, {useState, useEffect}from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import PostList from "./PostList";
import FilterPosts from "./FilterPosts";

//components
const FILTER_POSTS = gql`
  query($search: String) {
    filterPosts(search: $search) {
      title
      id
    }
  }
`;
export default function GetPosts({socket}) {
  const [toggle, settoggle] = useState(false)
  useEffect(() => {
    socket.on('refetch', function(data){
     refetch()
  })
  }, [toggle])
    const [search, setsearch] = useState("")
  const { loading, error, data, refetch } = useQuery(FILTER_POSTS, {
    variables: { search: search ||""}
  });

 
  return (
    <div>
      {data && <PostList data={data} loading={loading} error={error} socket={socket} />}
      <FilterPosts setsearch={setsearch}></FilterPosts>
    </div>
  );
}
