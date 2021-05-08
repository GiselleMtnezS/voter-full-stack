import React from "react";

export default function Comment(props) {
  var { text, date } = props;
  console.log(props);
  return (
    <div id="comment">
      <p>{text}</p>
      <span>{date}</span>
    </div>
  );
}
