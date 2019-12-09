import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import PostDetails from "./PostDetails";
import FilterPosts from "./FilterPosts";

const PostList = ({ data, loading, error, socket }) => {
  // const { loading, error, data } = useQuery(getPosts);
  const [SELECTEDID, setSELECTEDID] = useState("");



  if (loading) return <div class="loader">Loading...</div>;
  if (error) return <p>Error :(</p>;

  const posts =
    data && data.filterPosts.length > 0 ? (
      data.filterPosts.map(({ id, title, content }) => (
        <li
          key={id}
          onClick={e => {
            console.log(id);
            setSELECTEDID(id);
          }}
        >
          {title}
        </li>
      ))
    ) : (
      <>
        <p>Posts not found</p>
      </>
    );
  return (
    <>
      <div>
        <ul id="post-list">{posts}</ul>
        <PostDetails
          selected={SELECTEDID}
          setSELECTEDID={setSELECTEDID}
          socket={socket}
        />
      </div>
      {/* <FilterPosts/> */}
    </>
  );
};

export default PostList;
