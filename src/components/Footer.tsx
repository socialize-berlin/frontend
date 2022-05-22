import { useState } from "react";
import { Link } from "react-router-dom";
import { css } from "styled-components/macro";
import { useResponsive } from "../context/ResponsiveContext";
import { ContactUsModal } from "../modals/ContactUsModal";

export function Footer() {
  const [contactUsIsOpen, setContactUsIsOpen] = useState(false);
  const { isMobile } = useResponsive();

  return (
    <footer
      css={css`
        height: 78px;
        display: flex;
        align-items: center;

        ${isMobile &&
        css`
          height: 100px;
          text-align: center;
        `}
      `}
    >
      <div className="wrapper">
        <div
          css={css`
            display: flex;
            align-items: center;
            flex-flow: row wrap;
            justify-content: space-between;

            ${isMobile &&
            css`
              flex-flow: column nowrap;
            `}

            a {
              color: inherit;
              text-decoration: none;

              &:hover {
                text-decoration: underline;
              }
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
          {!isMobile && (
            <div>
              <p>Made with ❤️ in Berlin</p>
            </div>
          )}
          <div>
            <nav
              css={css`
                ul {
                  display: flex;
                  flex-flow: row wrap;
                  list-style: none;
                  padding: 0;
                  margin: 0;
                  color: #999;

                  ${isMobile &&
                  css`
                    justify-content: center;
                  `}
                }

                li {
                  margin-right: 20px;

                  ${isMobile &&
                  css`
                    font-size: 14px;
                  `}

                  &:last-child {
                    margin-right: 0;
                  }
                }
              `}
            >
              <ul>
                <li>
                  <Link to="/impressum">Impressum</Link>
                </li>
                <li>
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms-and-conditions">Terms and Conditions</Link>
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
              </ul>
            </nav>
          </div>
        </div>
      </div>
      <ContactUsModal
        isOpen={contactUsIsOpen}
        onClose={() => {
          setContactUsIsOpen(false);
        }}
      />
    </footer>
  );
}
