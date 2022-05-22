import { useState } from "react";
import { CreateUserForm } from "../forms/CreateUserForm";
import { Modal } from "./Modal";
import { css } from "styled-components/macro";
import { LoginForm } from "../forms/LoginForm";
import { useResponsive } from "../context/ResponsiveContext";
import { ResetPasswordForm } from "../forms/ResetPasswordForm";

export function CreateUserModal(props: {
  isOpen: boolean;
  title: string;
  defaultMode?: "login" | "register";
  onClose: () => void;
}) {
  const { isMobile } = useResponsive();
  const [mode, setMode] = useState<"login" | "register" | "reset-password">(
    props.defaultMode || "register"
  );

  return (
    <Modal modalIsOpen={props.isOpen} onClose={props.onClose}>
      <div
        css={css`
          position: relative;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
          padding-top: 50px;

          ${isMobile &&
          css`
            padding-top: 30px;
            margin-bottom: 20px;
          `}

          h2 {
            margin: 0;
          }
        `}
      >
        {isMobile ? (
          <h2>
            {mode === "login"
              ? "Login"
              : mode === "register"
              ? "Register"
              : mode === "reset-password"
              ? "Reset password"
              : ""}
          </h2>
        ) : (
          <h2>
            {mode === "login"
              ? "Login to an existing account "
              : mode === "register"
              ? props.title
              : mode === "reset-password"
              ? "Reset password"
              : ""}
          </h2>
        )}
        <div
          css={css`
            font-size: 20px;

            ${isMobile &&
            css`
              font-size: 16px;
            `}
          `}
        >
          or
          <button
            css={css`
              background: none;
              vertical-align: middle;
              border: none;
              font-size: inherit;
              padding: 0;
              margin: 0;
              margin-left: 10px;
              color: #522e7c;
              font-weight: bold;
              border-bottom: 2px dashed #522e7c;
            `}
            onClick={() => {
              setMode((mode) =>
                mode === "login"
                  ? "register"
                  : mode === "register"
                  ? "login"
                  : mode === "reset-password"
                  ? "login"
                  : "register"
              );
            }}
          >
            {mode === "register"
              ? "Login"
              : mode === "login"
              ? "Register"
              : mode === "reset-password"
              ? "Login"
              : ""}
          </button>
        </div>
      </div>
      {mode === "register" ? (
        <CreateUserForm
          onClose={async () => {
            props.onClose();
          }}
        />
      ) : mode === "login" ? (
        <LoginForm
          onClose={async () => {
            props.onClose();
          }}
          onResetPassword={() => {
            setMode("reset-password");
          }}
        />
      ) : mode === "reset-password" ? (
        <ResetPasswordForm />
      ) : null}
    </Modal>
  );
}
