import React from "react";
import { css } from "styled-components/macro";
import { Field, FieldProps } from "formik";
import { TextareaComponent } from "./TextareaComponent";
import { InputErrors } from "./InputErrors";

export function TextareaField(props: {
  name: string;
  id?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  readonly?: boolean;
  maxLength?: number;
  hideTooltip?: boolean;
  className?: string;
  optional?: boolean;
  recommended?: boolean;
  validate?: (value: string) => Promise<void | string>;
  tip?: string;
}) {
  const {
    id,
    name,
    label,
    disabled,
    readonly,
    placeholder,
    className,
    validate,
  } = props;

  return (
    <Field name={name} validate={validate}>
      {({ field, meta }: FieldProps) => {
        return (
          <div
            css={css`
              margin-bottom: 20px;
              position: relative;
            `}
          >
            <TextareaComponent
              id={id}
              name={name}
              label={label}
              disabled={disabled}
              readonly={readonly}
              placeholder={placeholder}
              field={field}
              className={className}
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
