import React from "react";
import { css } from "styled-components/macro";
import { FieldInputProps } from "formik";
import { InputLabel } from "./InputLabel";

export function TextareaComponent(props: {
  id?: string;
  name?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  className?: string;
  field?: FieldInputProps<any>;
  error?: boolean;
  optional?: boolean;
  recommended?: boolean;
  tip?: string;
}) {
  return (
    <label>
      <InputLabel
        label={props.label}
        optional={props.optional}
        recommended={props.recommended}
        tip={props.tip}
      />

      <textarea
        id={props.id}
        name={props.name}
        className={props.className}
        placeholder={props.placeholder || ""}
        readOnly={props.readonly}
        disabled={props.disabled}
        css={css`
          display: block;
          width: 100%;
          min-height: 100px;
          padding: 10px 24px;
          line-height: 1.5;
          background-clip: padding-box;
          border: 1px solid #ccc;
          border-radius: 20px;
          box-sizing: border-box;
          outline: none;
          resize: none;

          ${props.error &&
          css`
            border-color: #f62370;
          `}

          &:focus {
            border-color: #000;
          }
        `}
        {...props.field}
        onChange={(e) => {
          if (props.field) {
            props.field.onChange(e);
          }
        }}
      />
    </label>
  );
}
