import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";

const RegisterPage = () => {
  const [error, setError] = useState("");
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onsubmit = async () => {
    const firstname = firstnameRef.current?.value;
    const lastname = lastnameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    //make the call to api to create new user

    const response = await fetch(`${BASE_URL}/users/register`, {
      headers: {
        "content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ firstname, lastname, email, password }),
    });
    if (!response.ok) {
      setError("Unable to register user , please try different credientials");
      return;
    }

    const data = await response.json();
  };

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 4,
          flexDirection: "column",
        }}
      >
        <Typography variant="h6">Register New Account</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            border: 1,
            padding: 2,
            borderColor: "#f5f5f5",
          }}
        >
          <TextField
            inputRef={firstnameRef}
            label="first name"
            name="fullname"
          />
          <TextField inputRef={lastnameRef} label="last name" name="fullname" />
          <TextField inputRef={emailRef} label="email" name="email" />
          <TextField
            inputRef={passwordRef}
            type="password"
            label="password"
            name="password"
          />
          <Button onClick={onsubmit} variant="contained">
            Register
          </Button>
          {error && <Typography sx={{ color: "red" }}>{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
