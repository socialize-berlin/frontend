import React from "react";
import { css } from "styled-components/macro";

export function Loader(props: {
  size?: number;
  absoluteCenter?: boolean;
  children?: React.ReactNode;
  className?: string;
}) {
  const loaderSize = props.size ? props.size : 30;
  const borderSize = loaderSize / 6;

  return (
    <div
      css={css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: auto;
        ${props.absoluteCenter &&
        css`
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        `}
      `}
    >
      <div
        css={css`
          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
          border: ${borderSize}px solid #fff;
          border-top: ${borderSize}px solid #f62370;
          border-radius: 50%;
          width: ${loaderSize}px;
          height: ${loaderSize}px;
          animation: spin 1.5s linear infinite;
        `}
        className={props.className}
      ></div>

      {props.children}
    </div>
  );
}
