import React, { useEffect } from "react";
import { css } from "styled-components/macro";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextareaField } from "./fields/TextareaField";
import { Button } from "../components/Button";
import { gql, useMutation } from "@apollo/client";
import { mapUserData } from "../components/__generated__/mapUserData";
import { Message } from "../components/Message";

export interface FormValues {
  message: string;
}

const SEND_CONNECTION_INVITE = gql`
  mutation SendConnectionInvite($inviteeId: ID!, $message: String!) {
    sendConnectionInvite(inviteeId: $inviteeId, message: $message) {
      ok
    }
  }
`;

export function ConnectForm(props: {
  user: mapUserData;
  onClose: () => void;
  onConnect?: () => void;
}) {
  const [sendConnectionInvite, { data, error }] = useMutation(
    SEND_CONNECTION_INVITE
  );

  useEffect(() => {
    if (!data) return;

    props.onClose();
  }, [data, props]);

  return (
    <Formik<FormValues>
      enableReinitialize
      initialValues={{
        message: "",
      }}
      validationSchema={Yup.object().shape({
        message: Yup.string().max(200).label("Message"),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(true);

          await sendConnectionInvite({
            variables: {
              inviteeId: props.user.id,
              message: values.message,
            },
          });
          if (props.onConnect) props.onConnect();
        } catch (error: any) {
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, values, dirty, isValid, setFieldValue }) => (
        <Form noValidate>
          <TextareaField
            label={`Message`}
            name={"message"}
            tip={`Let ${props.user.firstName} know why you are interested`}
            maxLength={500}
            css={css`
              width: 100%;
            `}
          />

          <div
            css={css`
              margin-top: 20px;
            `}
          >
            <Button isSubmitting={isSubmitting} type="submit">
              Message {props.user.firstName}
            </Button>
          </div>
          {error && <Message message={`Error: ${error.message}`} />}
        </Form>
      )}
    </Formik>
  );
}
