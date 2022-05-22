import { css } from "styled-components/macro";
import { useResponsive } from "../../context/ResponsiveContext";

export function InputLabel(props: {
  label?: string;
  tip?: string;
  optional?: boolean;
  recommended?: boolean;
}) {
  const { isMobile } = useResponsive();

  if (!props.label) return null;

  let label = props.label?.trim();

  if (label && label[label.length - 1] === ":") {
    label = label.slice(0, label.length - 1);
  }
  return (
    <div
      css={css`
        margin-bottom: 16px;
        font-size: 16px;
        font-weight: bold;

        ${isMobile &&
        css`
          margin-bottom: 5px;
        `}
      `}
    >
      <div>
        {label}{" "}
        <span
          css={css`
            color: #9b9b9b;
            font-weight: normal;
          `}
        >
          {props.optional ? (isMobile ? "(opt)" : " (optional)") : null}
          {props.recommended && !isMobile && " (recommended)"}
        </span>
      </div>
      {props.tip && (
        <div
          css={css`
            font-size: 12px;
            color: #9b9b9b;
            margin-top: 5px;
            font-weight: normal;
          `}
        >
          {props.tip}
        </div>
      )}
    </div>
  );
}
