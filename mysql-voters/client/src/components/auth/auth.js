import React, { useState, useContext } from "react";
import { UserContext } from "../../context/userProvider";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

export default function Auth() {
  const initInputs = { fullName: "", username: "", password: "" };
  const [inputs, setInputs] = useState(initInputs);
  const [toggle, setToggle] = useState(false);
  const { signup, login, errMsg } = useContext(UserContext);
  function handleChange(e) {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  }

  function handleSignup(e) {
    e.preventDefault();
    signup(inputs);
  }

  function handleLogin(e) {
    e.preventDefault();
    login(inputs);
  }
  const useLoginStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classesLogin = useLoginStyles();
  const useSignUpStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: "100%",
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classesSignUp = useSignUpStyles();

  return (
    <div className="auth-container">
      {!toggle ? (
        <>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classesLogin.paper}>
              <Typography component="h1" variant="h5">
                Login
              </Typography>
              <form className={classesLogin.form} onSubmit={handleLogin}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  onBlur={handleChange}
                  id="username"
                  label="Username"
                  name="username"
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  onBlur={handleChange}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classesLogin.submit}
                >
                  Login
                </Button>
                <FormControlLabel
                  style={{ color: "red", fontWeight: "bold" }}
                  control={<p>{errMsg}</p>}
                />
                <Grid container>
                  <Grid item>
                    <Link
                      href="#"
                      onClick={() => setToggle((prev) => !prev)}
                      variant="body2"
                    >
                      {"Not a User - Yet? Sign Up!"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>

          {/* <AuthForm
            handleChange={handleChange}
            handleSubmit={handleLogin}
            inputs={inputs}
            btnText="Login"
            errMsg={errMsg}
          />
          <p >Not a member?</p> */}
        </>
      ) : (
        <>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classesSignUp.paper}>
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
              <form className={classesSignUp.form} onSubmit={handleSignup}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="fname"
                      name="Name"
                      variant="outlined"
                      required
                      fullWidth
                      onBlur={handleChange}
                      id="fullName"
                      label="FullName"
                      autoFocus
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                    />
                  </Grid> */}
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="username"
                      label="User Name"
                      name="username"
                      onBlur={handleChange}
                      autoComplete="username"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      onBlur={handleChange}
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                </Grid>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classesSignUp.submit}
                >
                  Sign Up
                </Button>
                <p style={{ color: "red", fontWeight: "bold" }}>{errMsg}</p>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link
                      href="#"
                      variant="body2"
                      onClick={() => setToggle((prev) => !prev)}
                    >
                      Already have a user?
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
          </Container>
          {/* <AuthForm
            handleChange={handleChange}
            handleSubmit={handleSignup}
            inputs={inputs}
            btnText="Sign up"
            errMsg={errMsg}
          />
          <p >Already a member?</p> */}
        </>
      )}
    </div>
  );
}
