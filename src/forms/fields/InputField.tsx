import React from "react";

import { Field, FieldProps } from "formik";
import { InputComponent } from "./InputComponent";
import { InputErrors } from "./InputErrors";
import { css } from "styled-components/macro";

export function InputField(props: {
  id?: string;
  name: string;
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
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  hideTooltip?: boolean;
  maxLength?: number;
  className?: string;
  tip?: string;
  optional?: boolean;
  recommended?: boolean;
  validate?: (value: string) => Promise<void | string>;
}) {
  const {
    id,
    name,
    disabled,
    label,
    placeholder,
    readonly,
    type,
    className,
    validate,
  } = props;
  return (
    <Field name={name} validate={validate}>
      {({ field, meta }: FieldProps) => {
        return (
          <div
            className={className}
            css={css`
              margin-bottom: 20px;
            `}
          >
            <InputComponent
              id={id}
              name={name}
              label={label}
              disabled={disabled}
              readonly={readonly}
              placeholder={placeholder}
              type={type}
              field={field}
              error={!!meta.error}
              optional={props.optional}
              recommended={props.recommended}
              tip={props.tip}
            />

            {!props.hideTooltip && (
              <InputErrors error={meta.error} touched={meta.touched} />
            )}
          </div>
        );
      }}
    </Field>
  );
}
