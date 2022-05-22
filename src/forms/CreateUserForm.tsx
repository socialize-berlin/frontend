import React, { useEffect } from "react";
import { css } from "styled-components/macro";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { InputField } from "./fields/InputField";
import { Button } from "../components/Button";
import { gql, useMutation } from "@apollo/client";
import { useAuth } from "../context/UserContext";
import { Message } from "../components/Message";
import { useResponsive } from "../context/ResponsiveContext";
import { CheckboxField } from "./fields/CheckboxField";
import { Link } from "react-router-dom";

export interface FormValues {
  first_name: string;
  last_name: string;
  email: string;
  terms_conditions: boolean;
  password: string;
}

const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    createUser(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
    ) {
      token
    }
  }
`;

export function CreateUserForm(props: { onClose: () => void }) {
  const [createUser, { data, error }] = useMutation(CREATE_USER);
  const { authenticate } = useAuth();
  const { isMobile } = useResponsive();

  const re = new RegExp("[a-zA-Z-]");

  useEffect(() => {
    if (!data) return;

    async function handleLogin() {
      await authenticate(data.createUser.token);
      props.onClose();
    }

    handleLogin();
  }, [data, authenticate, props]);

  return (
    <Formik<FormValues>
      enableReinitialize
      initialValues={{
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        terms_conditions: false,
      }}
      validationSchema={Yup.object().shape({
        first_name: Yup.string().matches(re).required().label("First name"),
        last_name: Yup.string().matches(re).label("Last name"),
        email: Yup.string().email().label("Email").required(),
        password: Yup.string().label("Password").required(),
        terms_conditions: Yup.boolean()
          .oneOf([true], "You must agree to the terms and conditions")
          .label("Terms and Conditions")
          .required(),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(true);

          await createUser({
            variables: {
              firstName: values.first_name,
              lastName: values.last_name,
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
          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
              justify-content: space-between;
            `}
          >
            <div
              css={css`
                flex: 1 0 40%;
                margin-right: 10px;

                ${isMobile &&
                css`
                  margin-right: 0px;
                `}
              `}
            >
              <InputField
                name={"first_name"}
                type="text"
                label={"First name"}
                css={css`
                  width: 100%;
                `}
              />
            </div>
            <div
              css={css`
                flex: 1 0 40%;
                margin-left: 10px;
              `}
            >
              <InputField
                name={"last_name"}
                type="text"
                optional
                label={`Last name`}
                css={css`
                  width: 100%;
                `}
              />
            </div>
          </div>

          <InputField
            name={"email"}
            type="text"
            label={"Email"}
            tip="We are using email address for authentication and notifications"
          />

          <InputField name={"password"} type="password" label={`Password`} />

          <CheckboxField name="terms_conditions">
            I agree to the{" "}
            <Link to="/terms-and-conditions">terms and conditions</Link> and{" "}
            <Link to="/privacy-policy">privacy policy</Link>
          </CheckboxField>

          <div
            css={css`
              margin-top: 20px;
            `}
          >
            <Button isSubmitting={isSubmitting} type="submit">
              Create
            </Button>
          </div>
          {error && <Message message={`Error: ${error.message}`} />}
        </Form>
      )}
    </Formik>
  );
}
