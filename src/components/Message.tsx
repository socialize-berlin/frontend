import { css } from "styled-components/macro";

export function Message(props: { message: string }) {
  return (
    <div
      css={css`
        margin-top: 20px;
        background: #eee;
        border-radius: 20px;
        padding: 20px;

        p {
          margin: 0;
        }
      `}
    >
      <p>{props.message}</p>
    </div>
  );
}
