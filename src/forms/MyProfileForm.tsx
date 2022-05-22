import React, { useEffect, useState } from "react";
import { css } from "styled-components/macro";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { InputField } from "./fields/InputField";
import { TextareaField } from "./fields/TextareaField";
import { Button } from "../components/Button";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import { useAuth } from "../context/UserContext";
import { Message } from "../components/Message";
import { Trash } from "react-feather";
import { ConfirmActionModal } from "../modals/ConfirmAction";

export interface FormValues {
  first_name: string;
  last_name: string;
  introduction: string;
  headline: string;
}

const UPDATE_USER = gql`
  mutation UpdateUser(
    $headline: String!
    $introduction: String!
    $firstName: String!
    $lastName: String!
  ) {
    updateUser(
      headline: $headline
      introduction: $introduction
      firstName: $firstName
      lastName: $lastName
    ) {
      user {
        headline
        introduction
        firstName
        lastName
      }
    }
  }
`;

const DELETE_USER = gql`
  mutation DeleteUser {
    deleteUser {
      ok
    }
  }
`;

export function MyProfileForm(props: {
  initialValues: FormValues;
  onClose: () => void;
}) {
  const re = new RegExp("[a-zA-Z-]");
  const [updateUser, { data, error }] = useMutation(UPDATE_USER);
  const [deleteModal, setDeleteModal] = useState(false);
  const { setProfile, deauthenticate } = useAuth();
  const client = useApolloClient();

  useEffect(() => {
    if (!data) return;

    setProfile(data.updateUser.user);
    props.onClose();
  }, [data, setProfile, props]);

  return (
    <Formik<FormValues>
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={Yup.object().shape({
        first_name: Yup.string().matches(re).required().label("First name"),
        last_name: Yup.string().matches(re).label("Last name"),
        introduction: Yup.string().max(200).label("Introduction"),
        headline: Yup.string().matches(re).label("Headline").max(30),
      })}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          setSubmitting(true);

          await updateUser({
            variables: {
              firstName: values.first_name,
              lastName: values.last_name,
              headline: values.headline,
              introduction: values.introduction,
            },
          });
        } catch (error: any) {
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting }) => (
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
            recommended
            name={"headline"}
            type="text"
            label={`Headline`}
            tip="This brief description that appears next to your name on the map"
          />

          <TextareaField
            label={`Introduction`}
            name={"introduction"}
            tip="A short summary of your skills and interests to receive more relevant messages from people around you"
            recommended
            maxLength={500}
            css={css`
              width: 100%;
            `}
          />

          <div
            css={css`
              margin-top: 20px;
              display: flex;
              flex-flow: row wrap;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <Button isSubmitting={isSubmitting} type="submit">
              Update
            </Button>
            <Button
              look="blank"
              type="button"
              onClick={() => {
                setDeleteModal(true);
              }}
            >
              <Trash
                size={20}
                css={css`
                  margin-right: 10px;
                  vertical-align: middle;
                `}
              />
              <span
                css={css`
                  vertical-align: middle;
                `}
              >
                Delete account
              </span>
            </Button>
          </div>
          {error && <Message message={`Error: ${error.message}`} />}

          <ConfirmActionModal
            title="Confirm account deletion"
            message="Are you sure you want to delete your account? In doing so, you will lose all your data and cannot recover it."
            isOpen={deleteModal}
            onClose={() => setDeleteModal(false)}
            action={async () => {
              const { data } = await client.mutate({
                mutation: DELETE_USER,
              });

              if (data.deleteUser.ok) {
                deauthenticate();
              }
            }}
          />
        </Form>
      )}
    </Formik>
  );
}
