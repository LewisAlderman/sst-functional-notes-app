import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";
import {Auth} from "aws-amplify";
import {useAppContext} from "../lib/contextLib";
import {useNavigate} from "react-router-dom";
import LoaderButton from "../components/LoaderButton";
import {onError} from "../lib/errorLib";
import {useFormFields} from "../lib/hooksLib";

export default function Login() {
  const {isAuthenticated, setIsAuthenticated} = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const [fields, upsertFieldInput] = useFormFields({});
  const nav = useNavigate();

  function validateForm() {
    return fields.email?.length > 0 && fields.password?.length > 0;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true)

    try {
      await Auth.signIn(fields.email ?? "", fields.password ?? "");
      setIsLoading(false)
      setIsAuthenticated(true);
      nav('/')
    } catch (e: any) {
      onError(e)
      setIsLoading(false)
    }
  }

  return (
    <div className="Login">
      <Form onSubmit={handleSubmit}>
        <Form.Group size="lg" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={fields.email ?? ""}
            onChange={upsertFieldInput}
          />
        </Form.Group>
        <Form.Group size="lg" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={fields.password ?? ""}
            onChange={upsertFieldInput}
          />
        </Form.Group>
        <LoaderButton
          size="lg"
          type="submit"
          isLoading={isLoading}
          disabled={!validateForm()}
        >
          Login
        </LoaderButton>
      </Form>
    </div>
  );
}