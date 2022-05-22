import React, { useState } from "react";

import { css } from "styled-components/macro";
import { InputLabel } from "./InputLabel";
import { MapPin } from "react-feather";
import { Loader } from "../../components/Loader";

export function LocationField(props: {
  label?: string;
  tip?: string;
  lat: number | null;
  lng: number | null;
  onRefetch: (lat: number, lng: number) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const locationSelected = props.lat && props.lng;

  const refetchLocation = () => {
    setIsLoading(true);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        props.onRefetch(position.coords.latitude, position.coords.longitude);
        setIsLoading(false);
      });
    }
  };
  return (
    <div
      css={css`
        margin-bottom: 20px;
      `}
    >
      <InputLabel label={props.label} tip={props.tip} />
      <div>
        <div
          css={css`
            position: relative;
            width: 100%;
            min-height: 200px;
            border-radius: 20px;
            overflow: hidden;
            background: #eee;

            img {
              width: 100%;
            }
          `}
        >
          <img
            src={`https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/${props.lng},${props.lat},14.25,0,0/400x400?access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`}
            alt=""
          />
          <div
            css={css`
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
            `}
          >
            {isLoading ? (
              <Loader />
            ) : (
              <>
                <MapPin color="#f62370" size={40} />
                {!locationSelected && (
                  <button
                    type="button"
                    css={css`
                      margin-top: 20px;
                      background: none;
                      border: none;
                    `}
                    onClick={refetchLocation}
                  >
                    Obtain location
                  </button>
                )}
              </>
            )}
          </div>
        </div>
        {locationSelected && (
          <button
            type="button"
            css={css`
              margin-top: 20px;
              background: none;
              border: none;
            `}
            onClick={refetchLocation}
          >
            Refetch location
          </button>
        )}
      </div>
    </div>
  );
}
