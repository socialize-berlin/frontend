import styled, { css } from "styled-components/macro";
import { useResponsive } from "../context/ResponsiveContext";

export const TooltipText = styled.span`
  visibility: hidden;
  min-width: 220px;
  background-color: black;
  color: #fff;
  text-align: left;
  border-radius: 6px;
  padding: 8px;
  position: absolute;
  z-index: 1;
  bottom: 40px;
  right: -17px;
  font-weight: 500;
  :after {
    content: "";
    position: absolute;
    top: 100%;
    right: 21px;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
`;

export const MobileTooltipText = styled.span`
  visibility: hidden;
  min-width: 140px;
  background-color: black;
  color: #fff;
  text-align: left;
  border-radius: 6px;
  padding: 8px;
  position: absolute;
  z-index: 1;
  bottom: 40px;
  right: -17px;
  font-weight: 500;
  font-size: 12px;

  :after {
    content: "";
    position: absolute;
    top: 100%;
    right: 21px;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: black transparent transparent transparent;
  }
`;

export function Tooltip(props: {
  text?: string;
  children?: JSX.Element | string;
  className?: string;
}) {
  const { isMobile } = useResponsive();

  return (
    <div
      css={css`
        position: relative;
        display: inline-block;
        margin-right: 9px;
        z-index: 1;

        :hover ${TooltipText} {
          visibility: visible;
        }

        :hover ${MobileTooltipText} {
          visibility: visible;
        }
      `}
      className={props.className}
    >
      {props.children}
      {isMobile ? (
        <MobileTooltipText>{props.text}</MobileTooltipText>
      ) : (
        <TooltipText>{props.text}</TooltipText>
      )}
    </div>
  );
}
