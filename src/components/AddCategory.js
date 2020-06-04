import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { ADD_CATEGORY, GET_CATEGORIES } from "../apollo/queries";

const AddCategory = () => {
  const [title, setTitle] = useState("");
  const [min, setMin] = useState(0);

  const [addCategory, { data }] = useMutation(ADD_CATEGORY, {
    update(cache, { data: { addCategory } }) {
      const { categories } = cache.readQuery({ query: GET_CATEGORIES });
      cache.writeQuery({
        query: GET_CATEGORIES,
        data: { categories: [...categories, addCategory] },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addCategory({ variables: { title, min } });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          name="name"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Min Value"
          type="number"
          name="minValue"
          onChange={(e) => setMin(Number(e.target.value))}
        />
        <button type="submit">Send</button>
      </form>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default AddCategory;
