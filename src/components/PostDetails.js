import React, { useState, useEffect } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";

const GET_POST = gql`
  query($id: ID) {
    post(id: $id) {
      title
      content
      id
      author {
        id
        name
        age
        posts {
          title
          id
        }
      }
    }
  }
`;

const DELETE_POST = gql`
  mutation($id: ID!) {
    deletePost(id: $id) {
      title
      id
      author {
        name
        id
      }
    }
  }
`;

const FILTER_POSTS = gql`
  query($search: String) {
    filterPosts(search: $search) {
      title
      id
    }
  }
`;

export default function PostDetails({ selected, setSELECTEDID, socket }) {
  const [toggle, settoggle] = useState(true);
  // useEffect(() => {
  //   socket.on('refetch', function(data){
  //    refetch()
  // })
  // }, [toggle])
  const { loading, error, data } = useQuery(GET_POST, {
    variables: { id: selected || null }
  });
  useEffect(() => {
    // settoggle(true);
      
    if (selected) {
      socket.on("refetch", function(data) {
        if (data && data.id === selected) {
          console.log(data.id, selected)
          // settoggle(false);
          alert("This post has been deleted");
        }
      });
    }
  }, [selected]);

  const handlePostDeleted = ({ deletePost }) => {
    if (deletePost) {
      alert(
        `${deletePost.title} -  ${deletePost.author.name} has been deleted`
      );
      socket.emit("delete", {
        id: deletePost.id
      });
    }
  };
  const [deletePost, { loading: mutationLoading }] = useMutation(DELETE_POST, {
    onCompleted: handlePostDeleted
  });

  const formSameAuthor =
    data &&
    data.post &&
    data.post.author.posts.map(post => {
      if (post.id != data.post.id)
        return <li onClick={() => setSELECTEDID(post.id)}>{post.title}</li>;
    });
  return (
    <div id="post-details">
      {data && data.post ? (
        <>
          {!loading ? (
            <>
              {toggle && (
                <ul id="actions">
                  <li
                    className="disabled"
                    onClick={() => {
                      deletePost({
                        variables: {
                          id: data.post.id
                        },
                        refetchQueries: [
                          {
                            query: GET_POST,
                            variables: { id: selected }
                          },
                          { query: FILTER_POSTS, variables: { search: "" } }
                        ]
                      });
                    }}
                  >
                    {mutationLoading ? "Loading ..." : "Delete"}
                  </li>
                </ul>
              )}

              <h2>
                {data.post.title}
                <i>-{data.post.author.name}</i>
              </h2>
              <p> {data.post.content}</p>
              {formSameAuthor.length > 1 && (
                <>
                  <h2>
                    <i>
                      More {formSameAuthor.length - 1} posts from{" "}
                      {data.post.author.name}{" "}
                    </i>
                  </h2>
                  <ul id="fromSameAuthor">{formSameAuthor}</ul>
                </>
              )}
            </>
          ) : (
            <p>
              <div class="loader">Loading...</div>
            </p>
          )}
        </>
      ) : (
        <p>Please select post to start reading !!</p>
      )}
    </div>
  );
}
