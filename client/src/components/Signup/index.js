import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import Auth from "../../utils/auth";
import { useChatContext } from "../../utils/GlobalState";
import { ADD_USER } from "../../utils/mutations";
import { TOGGLE_SHOW } from "../../utils/actions";

import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";

const Signup = () => {
  const toast = useToast();
  const [addUser, { error }] = useMutation(ADD_USER);
  const [state, dispatch] = useChatContext();

  const { showOpen } = state;

  function toggleShow() {
    dispatch({ type: TOGGLE_SHOW });
  }

  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form (notice the async!)
  const handleFormSubmit = async (event) => {
    console.log("formstate: ", formState);
    console.log("event: ", event);

    event.preventDefault();

    // use try/catch instead of promises to handle errors
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await addUser({
        variables: { ...formState },
      });
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      Auth.login(data.addUser.token);
    } catch (error) {
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
    <>{console.log("COMPONENT:  SINGUP")}
      {" "}
      <VStack spacing="5px">
        <FormControl id="signup-username" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            name="username"
            placeholder="Enter Your Name"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="signup-email" isRequired>
          <FormLabel>Email Address</FormLabel>
          <Input
            name="email"
            type="email"
            placeholder="Enter Your Email Address"
            onChange={handleChange}
          />
        </FormControl>
        <FormControl id="signup-password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              name="password"
              type={showOpen ? "text" : "password"}
              placeholder="Enter Password"
              onChange={handleChange}
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={toggleShow}>
                {showOpen ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        {/* <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            type={showOpen ? "text" : "password"}
            placeholder="Confirm password"
            onChange={handleConfirm}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={toggleShow}>
              {showOpen ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl> */}
        <Button
          colorScheme="blue"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={handleFormSubmit}
        >
          Sign Up
        </Button>
      </VStack>
    </>
  );
};

export default Signup;
