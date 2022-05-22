import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SetNewPasswordForm } from "../forms/SetNewPasswordForm";
import { css } from "styled-components/macro";

export function SetNewPassword() {
  return (
    <>
      <Header />
      <div className="wrapper page">
        <div className="header">
          <h1>Set new password</h1>
        </div>
        <div
          css={css`
            width: 100%;
            max-width: 400px;
          `}
        >
          <SetNewPasswordForm />
        </div>
      </div>
      <Footer />
    </>
  );
}
