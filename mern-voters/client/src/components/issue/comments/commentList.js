import React from "react";
import Comment from "./comment.js";

export default function CommentsList(props) {
  const { comments, errMsg } = props;
  console.log("comments in commentlist", comments);
  return (
    <section id="commentList">
      {comments.map((comment) => (
        <Comment
          {...comment}
          errMsg={errMsg}
          key={comment._id}
          id={comment._id}
        />
      ))}
    </section>
  );
}
