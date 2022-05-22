import React from "react";
import styled, { css } from "styled-components/macro";

const checkboxButtonLabel = css`
  position: relative;
  padding-left: 40px;
  display: block;

  a {
    font-weight: bold;
  }
  p {
    margin-left: 40px;
    font-size: 14px;
  }
`;
const CheckboxButton = styled.input`
  appearance: none;
  display: none;

  &:checked + .check {
    background-color: #522e7c;

    &:after {
      display: block;
    }
  }
`;

export function CheckboxPlainField(props: {
  name: string;
  checked: boolean;
  children: React.ReactNode | React.ReactNode[];
  onChange: (checked: boolean) => void;
}) {
  return (
    <label css={checkboxButtonLabel}>
      <CheckboxButton
        name={props.name}
        type="checkbox"
        checked={props.checked}
        onChange={(event) => {
          props.onChange(event.target.checked);
        }}
      />
      <div
        className="check"
        css={css`
          position: absolute;
          border: 1px solid #522e7c;
          border-radius: 4px;
          outline: none;
          cursor: pointer;
          width: 20px;
          height: 20px;
          top: 0;
          left: 0;
          display: flex;
          justify-content: center;
          align-items: center;

          &:after {
            content: "✔";
            display: none;
            color: white;
            font-size: 100%;
          }
        `}
      ></div>
      {props.children}
    </label>
  );
}
