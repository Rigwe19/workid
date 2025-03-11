import React, { useContext } from "react";
import {
  BoldLink,
  BoxContainer,
  FormContainer,
  Input,
  LineText,
  MutedLink,
  SubmitButton,
} from "./common";
import { Marginer } from "../marginer";
import { AccountContext } from './accountContext';

export function SignupForm() {

  const { switchToSignin } = useContext(AccountContext);
  return (
    <BoxContainer>
      <FormContainer>
        <Input type="text" placeholder="Full name" />
        <Marginer direction="vertical" margin={10} />
        <Input type="email" placeholder="Email" />
        <Marginer direction="vertical" margin={10} />
        <Input type="password" placeholder="Password" />
        <Marginer direction="vertical" margin={10} />
        <Input type="password" placeholder="Confirm password" />
      </FormContainer>
      <Marginer direction="vertical" margin={15} />
      <SubmitButton type="submit">Signup</SubmitButton>
      <Marginer direction="vertical" margin="15px" />
      <LineText>
        Already have an account?{" "}
        <BoldLink onClick={switchToSignin}>
          Signin
        </BoldLink>
      </LineText>
    </BoxContainer>
  );
}