import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";

const InputTag = () => {
  const [selected, setSelected] = useState([]);

  return (
    <div className="tag__input" style={{ color: "black" }}>
      {/* <pre>{JSON.stringify(selected)}</pre> */}
      <TagsInput
        value={selected}
        onChange={setSelected}
        name="fruits"
        placeHolder="enter fruits"
      />
    </div>
  );
};

export default InputTag;
