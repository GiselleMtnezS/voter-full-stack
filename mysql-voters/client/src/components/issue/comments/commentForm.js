import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const initInputs = {
  text: "",
};

export default function CommentForm(props) {
  const { addComment, errMsg } = props;
  const [inputs, setInputs] = useState(initInputs);

  let simpleErrArray = [];
  if (errMsg) {
    let simpleErr = errMsg.split("Path");

    for (let i = 0; i < simpleErr.length; i++) {
      if (
        errMsg.split("Path")[0].substring(0, 25) ===
          "Comment validation failed: " &&
        i > 0
      ) {
        simpleErrArray.push(errMsg.split("Path")[i].split(".")[0]);
      }
    }
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    addComment(e, inputs);
  }

  const useNewCommentStyles = makeStyles((theme) => ({
    paper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },

    form: {
      width: "100%",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classesNewComment = useNewCommentStyles();

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classesNewComment.paper}>
          <form
            id={props.issueId}
            className={classesNewComment.form}
            onSubmit={handleSubmit}
          >
            <TextField
              variant="outlined"
              margin="normal"
              onBlur={handleChange}
              required
              fullWidth
              name="text"
              label="Text"
              type="text"
              id="text"
              autoComplete="text"
            />

            <Button
              id={props.issueId}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classesNewComment.submit}
            >
              Submit Comment
            </Button>
            {simpleErrArray.map((errString) => {
              return (
                <FormControlLabel
                  style={{ color: "red", fontWeight: "bold" }}
                  control={<p>{errString}</p>}
                />
              );
            })}

            <Grid container></Grid>
          </form>
        </div>
      </Container>
    </>
  );
}
