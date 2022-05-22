import { Button } from "../Button";
import { css } from "styled-components/macro";
import { CreateUserModal } from "../../modals/CreateUserModal";
import { useState } from "react";
import { useResponsive } from "../../context/ResponsiveContext";
import { MapPromo } from "../MapPromo";

export function HomepageHeroBlock() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { isMobile } = useResponsive();

  return (
    <div className="wrapper">
      <div
        css={css`
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          padding: 50px 0;
          align-items: center;

          ${isMobile &&
          css`
            flex-direction: column;
            padding: 30px 0;
          `}
        `}
      >
        <div
          css={css`
            flex: 1 0 10%;

            h2 {
              margin: 0 0 10px 0;
            }
            h3 {
              margin: 0;
              color: #999;
            }
          `}
        >
          <div
            css={css`
              margin-bottom: 50px;

              p {
                max-width: 400px;
              }
            `}
          >
            <h2>Discover interesting people around you</h2>
            <h3>Open beta. Berlin only</h3>
            <p>
              Connect with people by interests. It's up to you if you want to
              use the app for connecting with professionals in the industry or
              just meet new people for a coffee and a nice conversation.
            </p>
          </div>

          {!isMobile && (
            <div
              css={css`
                flex: 0 0 auto;
              `}
            >
              <Button
                onClick={() => {
                  setModalIsOpen(true);
                }}
              >
                Get Started!
              </Button>
            </div>
          )}
        </div>
        <div
          css={css`
            flex: 0 0 50%;

            ${isMobile &&
            css`
              width: 100%;
              flex: 0 0 auto;
              pointer-events: none;
            `}
          `}
        >
          <MapPromo />
        </div>
      </div>
      <CreateUserModal
        isOpen={modalIsOpen}
        title="Create a new account"
        onClose={() => {
          setModalIsOpen(false);
        }}
      />
    </div>
  );
}
