import * as Formik from "formik";
import React from "react";
import { AlertCircle } from "react-feather";
import { css } from "styled-components/macro";
import { CheckboxPlainField } from "./CheckboxPlainField";
import { Tooltip } from "../../components/Tooltip";

export function CheckboxField(props: {
  name: string;
  value?: string | number | boolean;
  children?: React.ReactNode;
}) {
  return (
    <div
      css={css`
        padding: 20px 0;
        padding-right: 30px;
        position: relative;

        a {
          color: #f62370;
        }
      `}
    >
      <Formik.Field name={props.name}>
        {({ form, field, meta }: Formik.FieldProps) => {
          return (
            <>
              <CheckboxPlainField
                name={props.name}
                checked={field.value}
                onChange={(checked) => {
                  form.setFieldValue(props.name, checked);
                }}
              >
                {props.children}
              </CheckboxPlainField>
              {meta.error && (
                <div
                  css={css`
                    position: absolute;
                    right: 0;
                    top: 20px;
                    cursor: pointer;
                  `}
                >
                  <Tooltip text={meta.error}>
                    <AlertCircle size={18} color={"#522e7c"} />
                  </Tooltip>
                </div>
              )}
            </>
          );
        }}
      </Formik.Field>
    </div>
  );
}
