import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import Auth from "../../utils/auth";
import { useChatContext } from "../../utils/GlobalState";
import { LOGIN_USER } from "../../utils/mutations";
import { TOGGLE_SHOW } from "../../utils/actions";

import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/react";

const Login = () => {
  const toast = useToast();
  const [login, { error }] = useMutation(LOGIN_USER);
  const [state, dispatch] = useChatContext();

  const { showOpen } = state;

  function toggleShow() {
    dispatch({ type: TOGGLE_SHOW });
  }

  const [formState, setFormState] = useState({ email: "", password: "" });
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    console.log("(((((=========LOGIN CLICKED========)))))");
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
      toast({
        title: "Error Occured!",
        description: error,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  return (
<<<<<<< HEAD
    <> {console.log("COMPONENT:  LOGIN")}
=======
    <>
      {console.log("COMPONENT:  LOGIN")}
>>>>>>> heroku-debug
      <VStack spacing="10px">
        <FormControl id="login-email" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="Enter Your Email Address"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="login-password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              name="password"
              onChange={handleChange}
              type={showOpen ? "text" : "password"}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={toggleShow}>
                {showOpen ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={handleFormSubmit}
        >
          Login
        </Button>
      </VStack>
    </>
  );
};

export default Login;
