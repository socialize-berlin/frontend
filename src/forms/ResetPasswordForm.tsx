import { css } from "styled-components/macro";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Button } from "../components/Button";
import { InputField } from "./fields/InputField";
import { gql, useMutation } from "@apollo/client";

interface FormValues {
  email: string;
}

const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!) {
    resetPassword(email: $email) {
      ok
    }
  }
`;

export function ResetPasswordForm() {
  const [resetPassword, { data, error }] = useMutation(RESET_PASSWORD);

  return (
    <div>
      <Formik<FormValues>
        initialValues={{
          email: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email().label("Email").required(),
        })}
        onSubmit={async (values: FormValues, { setSubmitting }) => {
          try {
            setSubmitting(true);

            await resetPassword({
              variables: {
                email: values.email,
              },
            });
          } catch (error) {
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form noValidate>
            <InputField
              name="email"
              type="text"
              placeholder="Email"
              css={css`
                border-radius: 10px;
              `}
            />

            {data && data.resetPassword.ok && (
              <p>
                We have sent you an email with reset password link. If you don't
                see the email, check your spam folder.
              </p>
            )}
            {error && <p>{error.message}</p>}

            <Button
              isSubmitting={isSubmitting}
              type="submit"
              disabled={!dirty || !isValid}
            >
              Reset password
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
