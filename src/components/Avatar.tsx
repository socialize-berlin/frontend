import { css } from "styled-components/macro";

const colors = [
  "#ffbe0bff",
  "#fb5607ff",
  "#ff006eff",
  "#8338ecff",
  "#3a86ffff",
];
// const colors = ["#2E86AB", "#F5F749", "#84DD63"];
// const colors = ["#e5effe", "#988bab", "#fef0ad", "#cdfbcd", "#fbdada"];

const textToNumber = (text: string) => {
  let sum = 0;

  for (let i = 0; i < text.length; i++) {
    sum += text.charCodeAt(i);
  }

  return sum;
};

export const textToColor = (text: string) => {
  const number = textToNumber(text);
  const index = number % colors.length;

  return colors[index];
};

export function Avatar(props: {
  className?: string;
  size: number;
  user: {
    id: string;
    headline: string;
  };
}) {
  const { user } = props;
  const size = props.size || 60;
  const color = textToColor(user.headline);

  return (
    <div
      className={props.className}
      css={css`
        position: relative;
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: 50%;

        &:after {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: 50%;
          background-repeat: no-repeat;
          background-position: center center;
          background-image: url(${`https://anonymous-animals.azurewebsites.net/avatar/${user.id}`});
          content: "";
        }
      `}
    ></div>
  );
}
