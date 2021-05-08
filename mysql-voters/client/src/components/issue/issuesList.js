import React from "react";
import Issue from "./issue.js";

export default function IssuesList(props) {
  const { issues } = props;
  return (
    <section id="issueList" style={{ display: "flex", flexFlow: "row wrap" }}>
      {issues.map((issue) => (
        <Issue {...issue} key={issue._id} id={issue._id} />
      ))}
    </section>
  );
}
