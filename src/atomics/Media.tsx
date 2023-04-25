import React from "react";

type MediaProps = {
  key: string;
};

export const Media = ({ key }: MediaProps) => {
  return (
    <div>
      <label>Media</label>
      <input
        type="file"
        onChange={(e) => {
          console.log(e.target.value);
        }}
      />
    </div>
  );
};
