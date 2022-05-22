import React from "react";
import { css } from "styled-components/macro";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { TextareaField } from "./fields/TextareaField";
import { Button } from "../components/Button";
import { Send } from "react-feather";

export interface FormValues {
  message: string;
}

export function SendMessageForm(props: {
  onSubmit: (values: FormValues) => Promise<void>;
}) {
  return (
    <Formik<FormValues>
      enableReinitialize
      initialValues={{
        message: "",
      }}
      validationSchema={Yup.object().shape({
        message: Yup.string().label("Message"),
      })}
      onSubmit={async (values, form) => {
        form.setSubmitting(true);
        await props.onSubmit(values);
        form.resetForm();
        form.setSubmitting(false);
      }}
    >
      {({ isSubmitting, dirty, isValid }) => (
        <Form noValidate>
          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
            `}
          >
            <div
              css={css`
                flex: 1 0 10%;
              `}
            >
              <TextareaField
                name={"message"}
                css={css`
                  width: 100%;
                  height: 45px;
                  font-size: 16px;
                `}
                placeholder="Write your message here..."
              />
            </div>

            <div
              css={css`
                flex: 0 0 auto;
                margin-left: 20px;
              `}
            >
              <Button
                size="small"
                isSubmitting={isSubmitting}
                type="submit"
                disabled={!dirty || !isValid}
              >
                <Send />
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
