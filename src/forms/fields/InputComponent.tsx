import React from "react";
import { css } from "styled-components/macro";
import { FieldInputProps } from "formik";
import { InputLabel } from "./InputLabel";

export function InputComponent(props: {
  id?: string;
  name?: string;
  type?:
    | "text"
    | "email"
    | "search"
    | "password"
    | "number"
    | "tel"
    | "url"
    | "select"
    | "time";
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

      <div
        css={css`
          position: relative;
          display: flex;
          align-items: center;
          width: 100%;
          overflow: hidden;
        `}
      >
        <input
          id={props.id}
          type={props.type || "text"}
          value={props.value}
          placeholder={props.placeholder || ""}
          readOnly={props.readonly || false}
          disabled={props.disabled || false}
          aria-label={props.name || ""}
          css={css`
            flex-grow: 1;
            border: none;
            display: block;
            width: 100%;
            background-color: #fff;
            border: 1px solid #ccc;
            border-radius: 20px;
            height: 40px;
            padding: 10px 24px;
            box-sizing: border-box;
            min-height: 40px;
            background-color: #fff;
            line-height: 1.5;
            outline: none;

            ${props.error &&
            css`
              border-color: #f62370;
            `}

            &:focus {
              border-color: #000;
            }
          `}
          {...props.field}
          className={props.className}
          onChange={(e) => {
            props.field && props.field.onChange(e);
          }}
        />
      </div>
    </label>
  );
}
