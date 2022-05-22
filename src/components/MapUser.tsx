import { Marker } from "react-map-gl";
import { useAuth } from "../context/UserContext";
import { Button } from "./Button";
import { mapUserData } from "./__generated__/mapUserData";
import { css } from "styled-components/macro";
import { Avatar, textToColor } from "./Avatar";
import tinycolor from "tinycolor2";

export function MapUser(props: {
  user: Omit<mapUserData, "__typename">;
  hovered?: string | null;
  onConnect: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const { userProfile } = useAuth();
  const { user, hovered } = props;
  const isMe = userProfile && user.id === userProfile.id;
  const color = textToColor(user.headline);
  const lightColor = tinycolor(color).lighten(30).toHexString();

  return (
    <Marker
      style={{
        zIndex: hovered === user.id ? 100 : 0,
      }}
      key={user.id}
      longitude={user.lng}
      latitude={user.lat}
    >
      <div
        css={css`
          position: relative;
          padding: 20px;
          display: flex;
          align-items: center;
          flex-direction: column;

          &:hover {
            .user-info {
              visibility: visible;
              opacity: 1;
              margin-top: -90px;
            }
          }
        `}
        onMouseEnter={props.onMouseEnter}
        onMouseLeave={props.onMouseLeave}
      >
        <Avatar
          css={css`
            position: relative;
            z-index: 3;
            transition: 300ms;

            ${hovered &&
            hovered !== user.id &&
            css`
              background: ${lightColor};
            `}
          `}
          size={60}
          user={user}
        />
        <div
          css={css`
            position: relative;
            margin-top: 5px;
            color: #fff;
            background-color: ${!hovered || hovered === user.id
              ? color
              : lightColor};
            color: white;
            z-index: 3;
            transition: 300ms;

            padding: 5px 10px;
            border-radius: 10px;

            h4 {
              margin: 0;
            }
          `}
        >
          <h4>{isMe ? "You" : user.headline}</h4>
        </div>
        <div
          className="user-info"
          css={css`
            width: 200px;
            top: 100%;
            margin-top: 0px;
            left: -100px;
            margin-left: 50%;
            position: absolute;
            background: #fff;
            border-radius: 20px;
            padding: 20px;
            visibility: hidden;
            opacity: 0;
            transition: 300ms;
            text-align: center;
            box-sizing: border-box;
            padding-top: 90px;

            h3 {
              margin: 0;
              font-weight: bold;
            }
            h4 {
              margin: 0;
              font-weight: normal;
            }
          `}
        >
          <h3>
            {user.firstName} {user.lastName}
          </h3>
          <h4>{user.headline}</h4>
          <p>{user.introduction}</p>

          {!isMe && (
            <Button size="small" look="black" onClick={props.onConnect}>
              Connect +
            </Button>
          )}
        </div>
      </div>
    </Marker>
  );
}
