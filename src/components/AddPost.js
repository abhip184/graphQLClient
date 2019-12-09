import React, { useState } from "react";
import { gql } from "apollo-boost";
import { useQuery, useMutation } from "@apollo/react-hooks";

const getAuthors = gql`
  {
    authors {
      id
      name
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

const ADD_POST = gql`
  mutation AddPost($title: String!, $content: String!, $author: ID!) {
    addPost(title: $title, content: $content, author: $author) {
      title
      content
      author {
        name
      }
    }
  }
`;

const AddPost = ({socket}) => {
  const [TITLE, setTITLE] = useState("");
  const [CONTENT, setCONTENT] = useState("");
  const [AUTHOR, setAUTHOR] = useState("");

  const handlePostAdded = ({ addPost }) => {
    alert(`${addPost.title} is posted by ${addPost.author.name}`);
    socket.emit("add", {
      hello: "world"
    });
  };

  const [addPost, { loading }] = useMutation(ADD_POST, {
    onCompleted: handlePostAdded
  });

  const handleSubmit = e => {
    e.preventDefault();
    var form = document.getElementById("add-post");
    form.reset();
    addPost({
      variables: { title: TITLE, content: CONTENT, author: AUTHOR },
      refetchQueries: [{ query: FILTER_POSTS, variables:{search:""} }]
    });
    console.log();
  };

  const {
    data: authorData,
    error: authorError,
    loading: authorLoading
  } = useQuery(getAuthors);

  if (authorLoading) return <p>Loading...</p>;
  if (authorError) return <p>Error :(</p>;

  const authors = authorData.authors.map(({ id, name }) => (
    <option key={id} value={id}>
      {name}
    </option>
  ));
  return (
    <form id="add-post" onSubmit={handleSubmit}>
      <h3>Add Post</h3>
      <div className="field">
        <label>Title</label>
        <input
          type="text"
          onChange={e => {
            setTITLE(e.target.value);
          }}
          required
        />
      </div>
      <div className="field">
        <label>Content</label>
        <textarea
          type="text"
          onChange={e => {
            setCONTENT(e.target.value);
          }}
          required
        ></textarea>
      </div>
      <div className="field">
        <label>Author</label>
        <select
          defaultValue={""}
          onChange={e => {
            setAUTHOR(e.target.value);
          }}
          required
        >
          <option disabled={true} value="">
            select author
          </option>
          {authors}
        </select>
      </div>
      <button type="submit" className={loading ? "disabled" : ""}>
        +
      </button>
    </form>
  );
};

export default AddPost;
