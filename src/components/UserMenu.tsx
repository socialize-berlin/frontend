import { useAuth } from "../context/UserContext";
import { css } from "styled-components/macro";
import { useRef, useState } from "react";
import { MyProfileModal } from "../modals/MyProfileModal";
import { useOnClickOutside } from "usehooks-ts";
import { Avatar } from "./Avatar";
import { useResponsive } from "../context/ResponsiveContext";

export function UserMenu(props: {
  onConnectionsClick: () => void;
  onConversationsClick: () => void;
}) {
  const { isAuthenticated, deauthenticate, userProfile } = useAuth();
  const [isOpened, setIsOpened] = useState(false);
  const [myProfileIsOpen, setMyProfileIsOpen] = useState(false);
  const ref = useRef(null);
  const { isMobile } = useResponsive();

  const handleClickOutside = () => {
    // Your custom logic here
    setIsOpened(false);
  };

  useOnClickOutside(ref, handleClickOutside);

  if (!isAuthenticated || !userProfile) return null;

  return (
    <div
      css={css`
        position: relative;
        margin-left: 40px;
      `}
    >
      <button
        css={css`
          background: none;
          padding: 0;
          border: none;
        `}
        onClick={() => setIsOpened((isOpened) => !isOpened)}
      >
        <Avatar size={50} user={userProfile} />
        {isMobile &&
          userProfile &&
          (userProfile.unreadMessagesCount > 0 ||
            userProfile.pendingConnectionsCount > 0) && (
            <div
              css={css`
                position: absolute;
                top: -2px;
                right: -5px;
                width: 7px;
                height: 7px;
                background: #ff006eff;
                border-radius: 50%;
              `}
            ></div>
          )}
      </button>
      {isOpened && (
        <div
          ref={ref}
          css={css`
            position: absolute;
            top: 100%;
            width: 160px;
            text-align: left;
            right: 0;
            padding: 20px;
            border-radius: 10px;
            z-index: 2;
            margin-top: 20px;
            background: #f5f5fe;
            color: black;

            ul {
              list-style: none;
              margin: 0;
              padding: 0;
            }

            li {
              margin-bottom: 10px;
            }

            button {
              background: none;
              border: none;
              font-size: inherit;
              color: inherit;

              &:hover {
                text-decoration: underline;
              }
            }
          `}
        >
          <div
            css={css`
              width: 22px;
              height: 22px;
              position: absolute;
              top: -20px;
              right: 0%;
              transform: translateX(-50%);
              overflow: hidden;

              &::after {
                content: "";
                position: absolute;
                width: 20px;
                height: 20px;
                background: #f5f5fe;
                transform: translateX(-50%) translateY(-50%) rotate(45deg);
                top: 100%;
                left: 50%;
              }
            `}
          ></div>
          <ul>
            <li>
              <button onClick={() => setMyProfileIsOpen(true)}>
                My profile
              </button>
            </li>
            {isMobile && (
              <li>
                <button
                  css={css`
                    position: relative;
                  `}
                  onClick={() => {
                    props.onConnectionsClick();
                  }}
                >
                  My Connections
                  {userProfile && userProfile.pendingConnectionsCount > 0 && (
                    <div
                      css={css`
                        position: absolute;
                        top: -2px;
                        right: -5px;
                        width: 7px;
                        height: 7px;
                        background: #ff006eff;
                        border-radius: 50%;
                      `}
                    ></div>
                  )}
                </button>
              </li>
            )}
            {isMobile && (
              <li>
                <button
                  css={css`
                    position: relative;
                  `}
                  onClick={() => {
                    props.onConversationsClick();
                  }}
                >
                  My Messages
                  {userProfile && userProfile.unreadMessagesCount > 0 && (
                    <div
                      css={css`
                        position: absolute;
                        top: -2px;
                        right: -5px;
                        width: 7px;
                        height: 7px;
                        background: #ff006eff;
                        border-radius: 50%;
                      `}
                    ></div>
                  )}
                </button>
              </li>
            )}

            <li>
              <button onClick={() => deauthenticate()}>Logout</button>
            </li>
          </ul>
        </div>
      )}
      <MyProfileModal
        isOpen={myProfileIsOpen}
        onClose={() => {
          setMyProfileIsOpen(false);
        }}
      />
    </div>
  );
}
