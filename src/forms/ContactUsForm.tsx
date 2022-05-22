import React from "react";
import { css } from "styled-components/macro";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { InputField } from "./fields/InputField";
import { TextareaField } from "./fields/TextareaField";
import { Button } from "../components/Button";
import { gql, useMutation } from "@apollo/client";
import { Message } from "../components/Message";

const SEND_MESSAGE = gql`
  mutation SendMessage($name: String!, $email: String!, $message: String!) {
    sendMessage(name: $name, email: $email, message: $message) {
      ok
    }
  }
`;

export interface FormValues {
  name: string;
  email: string;
  message: string;
}

export function ContactUsForm(props: {
  onSubmit: (values: FormValues) => Promise<void>;
}) {
  const [sendMessage, { data, error }] = useMutation(SEND_MESSAGE);
  const re = new RegExp("[a-zA-Z-]");

  return (
    <Formik<FormValues>
      enableReinitialize
      initialValues={{
        name: "",
        message: "",
        email: "",
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().matches(re).required().label("Name"),
        email: Yup.string().email().label("Email").required(),
        message: Yup.string().label("Message").required(),
      })}
      onSubmit={async (values, form) => {
        try {
          form.setSubmitting(true);

          await sendMessage({
            variables: values,
          });
        } catch (error: any) {
        } finally {
          form.setSubmitting(false);
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
              `}
            >
              <InputField
                name={"name"}
                type="text"
                label={"Name"}
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
              <InputField name={"email"} type="text" label={"Email"} />
            </div>
          </div>

          <TextareaField
            label={`Message`}
            name={"message"}
            css={css`
              width: 100%;
            `}
          />

          <div>
            <Button
              isSubmitting={isSubmitting}
              type="submit"
              disabled={!dirty || !isValid}
            >
              Send message
            </Button>
          </div>
          {error && <Message message={`Error: ${error.message}`} />}
          {data && (
            <Message message={`Message has been successfully sent! 🎉`} />
          )}
        </Form>
      )}
    </Formik>
  );
}
