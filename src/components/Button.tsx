import React from "react";
import { Loader } from "./Loader";
import { css } from "styled-components/macro";

export function Button(props: {
  type?: "button" | "submit";
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  isSubmitting?: boolean;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  look?: "outline" | "primary" | "black" | "blank";
}) {
  const look = props.look || "primary";

  return (
    <button
      type={props.type || "button"}
      css={css`
        position: relative;
        padding: 20px 30px;
        border-radius: 30px;
        border: none;
        color: #fff;
        font-weight: bold;
        cursor: pointer;
        font-size: 16px;

        ${props.size === "small" &&
        css`
          padding: 10px 20px;
        `}

        ${look === "primary" &&
        css`
          background-image: linear-gradient(
            to right,
            #f62370 0%,
            #522e7c 100%,
            #146944 100%
          );
          background-position: right center;
          background-size: 200% auto;

          transition: 0.3s;

          &:hover {
            background-position: left center;
          }

          &:active {
            color: #fff;
            box-shadow: inset 2px 0px 5px rgba(0, 0, 0, 0.3);
          }
        `};

        ${look === "outline" &&
        css`
          background: white;
          font-weight: normal;
          border: 2px solid #522e7c;
          color: #522e7c;
          font-weight: bold;

          &:hover {
            background: #522e7c;
            color: #fff;
          }
          &:active {
            box-shadow: inset 2px 0px 5px rgba(0, 0, 0, 0.3);
          }
        `}

        ${look === "black" &&
        css`
          background: black;

          &:hover {
            background: #4b4b4b;
          }

          &:active {
            box-shadow: inset 2px 0px 5px rgba(0, 0, 0, 0.3);
          }
        `}
        ${look === "blank" &&
        css`
          background: transparent;
          border: none;
          padding: 0;
          color: black;

          &:hover {
            color: #f62370;
          }
        `}

        :disabled {
          background: #c1c1c1;
          cursor: default;
        }
      `}
      disabled={props.disabled || props.isSubmitting}
      className={props.className}
      onClick={props.onClick}
    >
      {props.isSubmitting ? (
        <Loader size={15} />
      ) : (
        <div
          css={css`
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <span
            css={css`
              display: flex;
              vertical-align: middle;
            `}
          >
            {props.children}
          </span>
        </div>
      )}
    </button>
  );
}
