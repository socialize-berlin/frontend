import React, { useEffect } from "react";
import { X } from "react-feather";
import ReactModal, { Styles } from "react-modal";
import { css } from "styled-components/macro";
import { useResponsive } from "../context/ResponsiveContext";

const customStyles: Styles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "640px",
    width: "90%",
    boxSizing: "border-box",
    maxHeight: "calc(100vh - 40px)",
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px, rgba(0, 0, 0, 0.12) 0px 1px 10px",
    overflow: "auto",
    borderRadius: "20px",
    position: "relative",
    backgroundColor: "#fff",
    border: "none",
    willChange: "scroll-position",
  },
  overlay: {
    height: "100vh",
    overflowY: "hidden",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    outline: "none",
    zIndex: 1500,
  },
};

ReactModal.setAppElement("#root");

const disableBodyScroll = () => {
  document.body.style.overflow = "hidden";
};

const enableBodyScroll = () => {
  document.body.style.overflow = "unset";
};

export function Modal(props: {
  modalIsOpen: boolean;
  onAfterOpen?: () => void;
  onAfterClose?: () => void;
  onClose?: () => void;
  contentLabel?: string;
  children?: React.ReactNode | React.ReactNode[] | string | null;
  overlayStyles?: Styles["overlay"];
  contentStyles?: Styles["content"];
  persistent?: boolean;
  id?: string;
  noInnerPadding?: boolean;
}) {
  const { isMobile } = useResponsive();
  useEffect(() => {
    if (props.modalIsOpen) {
      disableBodyScroll();
    }

    return () => {
      enableBodyScroll();
    };
  }, [props.modalIsOpen]);

  function onClose() {
    if (props.onClose) {
      props.onClose();
    }

    enableBodyScroll();
  }

  let localStyles = { ...customStyles };

  if (props.contentStyles && customStyles.content) {
    localStyles = {
      ...localStyles,
      content: {
        ...customStyles.content,
        ...props.contentStyles,
      },
    };
  }

  if (props.overlayStyles && customStyles.overlay) {
    localStyles = {
      ...localStyles,
      overlay: {
        ...customStyles.overlay,
        ...props.overlayStyles,
      },
    };
  }

  return (
    <div>
      {props.modalIsOpen && (
        <ReactModal
          id={props.id}
          isOpen={true}
          onAfterOpen={props.onAfterOpen}
          onAfterClose={props.onAfterClose}
          onRequestClose={onClose}
          style={localStyles}
          contentLabel={props.contentLabel}
          shouldCloseOnOverlayClick={!props.persistent}
        >
          <div
            css={css`
              padding: 32px 30px;

              ${isMobile &&
              css`
                padding: 32px 7px;
              `}

              ${props.noInnerPadding &&
              css`
                padding: 0 7px;
              `}

              h2 {
                margin-top: 0;
                margin-bottom: 50px;
              }
            `}
          >
            {props.children}
            <button
              css={css`
                position: absolute;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                top: 50px;
                right: 43px;
                background: none;
                border: none;

                ${isMobile &&
                css`
                  right: 13px;
                  top: 30px;
                `}

                &:hover {
                  background: #f5f5fe;
                }

                &:active {
                  background: #f5f5fe;
                  box-shadow: inset 2px 0px 5px rgba(0, 0, 0, 0.3);
                }
              `}
              onClick={onClose}
            >
              <X />
            </button>
          </div>
        </ReactModal>
      )}
    </div>
  );
}
