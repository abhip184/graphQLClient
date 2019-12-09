import React, { useState } from "react";
import { gql } from "apollo-boost"; 

const FilterPosts = ({setsearch}) => {
  const [search, setSearch] = useState("");
  const [AUTHOR, setAUTHOR] = useState("");

  const handleSearch = value => {
    setsearch(value)
  };

  //   const [addPost, { loading }] = useMutation(ADD_POST, {
  //     onCompleted: handlePostAdded
  //   });

  //   const handleSubmit = e => {
  //     e.preventDefault();
  //     var form = document.getElementById("add-book");
  //     form.reset();
  //     addPost({
  //       variables: { title: TITLE, content: CONTENT, author: AUTHOR },
  //       refetchQueries: [{ query: getPosts }]
  //     });
  //     console.log();
  //   };


  //   if (authorLoading) return <p>Loading...</p>;
  //   if (authorError) return <p>Error :(</p>;

  
 
  return (
      <>

    <form id="filter-post">
      <h3>Filter Posts</h3>
      <div className="field">
        <label>Title</label>
        <input
          type="text"
          onChange={e => {
            handleSearch(e.target.value);
          }}
          required
        />
      </div>
      {/* <div className="field">
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
      </div> */}
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

    </form>
    </>
  );
};

export default FilterPosts;
