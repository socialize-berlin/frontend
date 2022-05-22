import { css } from "styled-components/macro";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { InputField } from "./fields/InputField";
import { gql, useMutation } from "@apollo/client";

interface FormValues {
  new_password: string;
  confirm_password: string;
}

const SET_PASSWORD = gql`
  mutation SetPassword($token: String!, $password: String!) {
    setPassword(token: $token, password: $password) {
      ok
    }
  }
`;

export function SetNewPasswordForm() {
  const [setPassword, { data, error }] = useMutation(SET_PASSWORD);

  const params = useParams<{
    uuid: string;
  }>();

  return (
    <div>
      <Formik<FormValues>
        initialValues={{
          new_password: "",
          confirm_password: "",
        }}
        validationSchema={Yup.object().shape({
          new_password: Yup.string().min(8).label("New password").required(),
          confirm_password: Yup.string()
            .label("Confirm new password")
            .oneOf([Yup.ref("new_password"), null], "Passwords don't match")
            .required(),
        })}
        onSubmit={async (values: FormValues, { setSubmitting }) => {
          try {
            setSubmitting(true);

            await setPassword({
              variables: {
                password: values.new_password,
                token: params.uuid,
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
            <InputField
              name="new_password"
              type="password"
              placeholder={"New password"}
              css={css`
                border-radius: 10px 10px 0 0;
              `}
            />
            <InputField
              name="confirm_password"
              type="password"
              placeholder={"Confirm new password"}
              css={css`
                border-radius: 0 0 10px 10px;
                margin-top: 1px;
              `}
            />

            {data && data.setPassword.ok && (
              <p>Password was successfully reset.</p>
            )}
            {error && <p>{error.message}</p>}

            <Button
              isSubmitting={isSubmitting}
              type="submit"
              disabled={!dirty || !isValid}
            >
              Save Password
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
