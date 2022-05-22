import React, { useState } from "react";
import logo from "../assets/img/logo3.png";
import { css } from "styled-components/macro";
import { AboutUsModal } from "../modals/AboutUsModal";
import { OurValuesModal } from "../modals/OurValuesModal";
import { ContactUsModal } from "../modals/ContactUsModal";
import { UserMenu } from "./UserMenu";
import { CreateUserModal } from "../modals/CreateUserModal";
import { useAuth } from "../context/UserContext";
import { useResponsive } from "../context/ResponsiveContext";
import { Link } from "react-router-dom";
import { MyConnectionsModal } from "../modals/MyConnectionsModal";
import { MyConversationsModal } from "../modals/MyConversationsModal";

export function Header() {
  const [aboutIsOpen, setAboutIsOpen] = useState(false);
  const [valuesIsOpen, setValuesIsOpen] = useState(false);
  const [contactUsIsOpen, setContactUsIsOpen] = useState(false);
  const [createUserIsOpen, setCreateUserIsOpen] = useState(false);
  const [myConnectionsIsOpen, setMyConnectionsIsOpen] = useState(false);
  const [myConversationsIsOpen, setMyConversationsIsOpen] = useState<
    boolean | string
  >(false);
  const { isAuthenticated, userProfile } = useAuth();
  const { isMobile } = useResponsive();

  return (
    <header className="wrapper">
      <div
        css={css`
          padding: 20px 0 0 0;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          align-items: center;
        `}
      >
        <div>
          <Link to="/">
            <img
              css={css`
                width: 122px;
              `}
              src={logo}
              alt="logo"
            />
          </Link>
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
          `}
        >
          <nav
            css={css`
              ul {
                display: flex;
                flex-flow: row wrap;
                list-style: none;
                margin: 0;
                padding: 0;
              }

              li {
                margin: 0 30px 0 0;
                padding: 0;

                &:last-child {
                  margin: 0;
                }
              }

              button {
                background: none;
                border: none;
                font-size: 16px;

                &:hover {
                  text-decoration: underline;
                }
              }
            `}
          >
            <ul>
              {!isMobile && !isAuthenticated && (
                <>
                  <li>
                    <button
                      onClick={() => {
                        setAboutIsOpen(true);
                      }}
                    >
                      About the project
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setValuesIsOpen(true);
                      }}
                    >
                      Our Values
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setContactUsIsOpen(true);
                      }}
                    >
                      Contact Us
                    </button>
                  </li>
                </>
              )}

              {!isMobile && isAuthenticated && (
                <>
                  <li id="navigation-my-connections">
                    <button
                      css={css`
                        position: relative;
                      `}
                      onClick={() => {
                        setMyConnectionsIsOpen(true);
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
                  <li>
                    <button
                      css={css`
                        position: relative;
                      `}
                      onClick={() => {
                        setMyConversationsIsOpen(true);
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
                </>
              )}

              {!isAuthenticated && (
                <li>
                  <button
                    onClick={() => {
                      setCreateUserIsOpen(true);
                    }}
                    css={css`
                      font-weight: bold;
                    `}
                  >
                    Sign in
                  </button>
                </li>
              )}
            </ul>
          </nav>
          <UserMenu
            onConnectionsClick={() => {
              setMyConnectionsIsOpen(true);
            }}
            onConversationsClick={() => {
              setMyConversationsIsOpen(true);
            }}
          />
        </div>
      </div>
      <AboutUsModal
        isOpen={aboutIsOpen}
        onClose={() => {
          setAboutIsOpen(false);
        }}
      />
      <OurValuesModal
        isOpen={valuesIsOpen}
        onClose={() => {
          setValuesIsOpen(false);
        }}
      />
      <ContactUsModal
        isOpen={contactUsIsOpen}
        onClose={() => {
          setContactUsIsOpen(false);
        }}
      />
      <CreateUserModal
        isOpen={createUserIsOpen}
        defaultMode="login"
        title="Create a new account"
        onClose={() => {
          setCreateUserIsOpen(false);
        }}
      />
      {myConnectionsIsOpen && (
        <MyConnectionsModal
          isOpen={true}
          onClose={() => {
            setMyConnectionsIsOpen(false);
          }}
          onConversationOpen={(uuid: string) => {
            setMyConnectionsIsOpen(false);
            setMyConversationsIsOpen(uuid);
          }}
        />
      )}
      {myConversationsIsOpen && (
        <MyConversationsModal
          isOpen={true}
          conversationUUID={
            typeof myConversationsIsOpen === "string"
              ? myConversationsIsOpen
              : null
          }
          onClose={() => {
            setMyConversationsIsOpen(false);
          }}
        />
      )}
    </header>
  );
}
