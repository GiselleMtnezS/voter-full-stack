import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const initInputs = {
  title: "",
  description: "",
};

export default function IssueForm(props) {
  const { addIssue, errMsg } = props;
  const [inputs, setInputs] = useState(initInputs);

  let simpleErrArray = [];
  if (errMsg) {
    let simpleErr = errMsg.split("Path");

    for (let i = 0; i < simpleErr.length; i++) {
      if (
        errMsg.split("Path")[0].substring(0, 25) ===
          "Issue validation failed: " &&
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

    addIssue(inputs);
  }

  const useNewIssueStyles = makeStyles((theme) => ({
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
  const classesNewIssue = useNewIssueStyles();

  return (
    <>
      <Container component="main" maxWidth="xs">
        <div className={classesNewIssue.paper}>
          <form className={classesNewIssue.form} onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onBlur={handleChange}
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              onBlur={handleChange}
              required
              fullWidth
              name="description"
              label="Description"
              type="description"
              id="description"
              autoComplete="description"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classesNewIssue.submit}
            >
              Submit Issue
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
