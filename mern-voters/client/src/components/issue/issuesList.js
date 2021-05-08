import React from "react";
import Issue from "./issue.js";

export default function IssuesList(props) {
  const { issues, errMsg } = props;
  console.log("issues in issuelist", issues);
  return (
    <section id="issueList" style={{ display: "flex", flexFlow: "row wrap" }}>
      {issues.map((issue) => (
        <Issue {...issue} errMsg={errMsg} key={issue._id} id={issue._id} />
      ))}
    </section>
  );
}
