import React, { useEffect } from "react";
import { css } from "styled-components/macro";
import { Form, Formik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { InputField } from "./fields/InputField";
import { Button } from "../components/Button";
import { gql, useMutation } from "@apollo/client";
import { useAuth } from "../context/UserContext";
import { Message } from "../components/Message";

export interface FormValues {
  email: string;
  password: string;
}

const TOKEN_AUTH = gql`
  mutation TokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      token
    }
  }
`;

export function LoginForm(props: {
  onClose: () => void;
  onResetPassword: () => void;
}) {
  const [login, { data, error }] = useMutation(TOKEN_AUTH);
  const { authenticate } = useAuth();

  useEffect(() => {
    if (!data) return;

    async function handleLogin() {
      await authenticate(data.tokenAuth.token);
      props.onClose();
    }

    handleLogin();
  }, [data, authenticate, props]);

  return (
    <Formik<FormValues>
      enableReinitialize
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().label("Email").required(),
        password: Yup.string().label("Password").required(),
      })}
      onSubmit={async (
        values: FormValues,
        { setSubmitting }: FormikHelpers<FormValues>
      ) => {
        try {
          setSubmitting(true);

          await login({
            variables: {
              email: values.email.toLowerCase(),
              password: values.password,
            },
          });
        } catch (error: any) {
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, dirty, isValid }) => (
        <Form noValidate>
          <InputField name={"email"} type="text" label={"Email"} />

          <InputField name={"password"} type="password" label={`Password`} />

          <div
            css={css`
              margin-top: 20px;
              display: flex;
              flex-flow: row wrap;
              justify-content: space-between;
            `}
          >
            <Button isSubmitting={isSubmitting} type="submit">
              Login
            </Button>
            <Button
              look="blank"
              type="button"
              onClick={() => {
                props.onResetPassword();
              }}
            >
              <span
                css={css`
                  vertical-align: middle;
                `}
              >
                Reset password
              </span>
            </Button>
          </div>
          {error && <Message message={`Error: ${error.message}`} />}
        </Form>
      )}
    </Formik>
  );
}
