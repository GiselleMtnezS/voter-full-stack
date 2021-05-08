function IssueObject(title, description, date, UserID, upVotes, downVotes) {
  (this.title = title),
    (this.description = description),
    (this.date = date),
    (this.upVotes = upVotes),
    (this.downVotes = downVotes),
    (this.UserID = UserID);
}

module.exports = IssueObject;
