import { css } from "styled-components/macro";
import { useResponsive } from "../../context/ResponsiveContext";

export function HomepageFeatures() {
  const { isMobile } = useResponsive();

  return (
    <div className="wrapper">
      <div
        css={css`
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          padding: 50px 0;
          text-align: center;

          ${isMobile &&
          css`
            flex-direction: column;
            padding: 30px 0;
            text-align: center;
          `}

          h3 {
            font-weight: bold;
            font-size: 18px;
          }
        `}
      >
        <div
          css={css`
            flex: 0 0 20%;
            text-align: left;

            ${isMobile &&
            css`
              text-align: center;
            `}
          `}
        >
          <h2>How it works?</h2>
        </div>
        <div
          css={css`
            flex: 0 0 25%;
            padding-right: 20px;
            box-sizing: border-box;
          `}
        >
          <h3>1. Place yourself on map.</h3>
          <p>
            We don't show your real location and allow you to set it manually so
            you meet in safe locations only.
          </p>
        </div>
        <div
          css={css`
            flex: 0 0 25%;
            padding-right: 20px;
            box-sizing: border-box;
          `}
        >
          <h3>2. Explore people around you.</h3>
          <p>Check your neighborhood and find people who interest you.</p>
        </div>
        <div
          css={css`
            flex: 0 0 25%;
            padding-right: 20px;
            box-sizing: border-box;
          `}
        >
          <h3>3. Connect and meet!</h3>
          <p>
            After a person accepts your invitation, you can chat with them and
            arrange a time and location to meet.
          </p>
        </div>
      </div>
    </div>
  );
}
