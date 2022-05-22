import React from "react";
import { css } from "styled-components/macro";
import { AlertCircle } from "react-feather";
import { Tooltip } from "../../components/Tooltip";

export function InputErrors(props: {
  error?: string;
  touched?: boolean;
  className?: string;
}) {
  const { error, className } = props;

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        position: relative;
      `}
    >
      {error && (
        <div
          css={css`
            cursor: pointer;
          `}
        >
          <Tooltip
            text={error}
            className={className}
            css={css`
              position: absolute;
              top: -18px;
              transform: translate(0, -50%);
              right: 0;
            `}
          >
            <AlertCircle size={18} color={"#f62370"} />
          </Tooltip>
        </div>
      )}
    </div>
  );
}
