import { gql } from "@apollo/client";

import { useEffect, useRef, useState } from "react";
import { css } from "styled-components/macro";
import { point, circle } from "@turf/turf";
import { Units } from "@turf/helpers";
import { mapUserData } from "./__generated__/mapUserData";
import { CreateUserModal } from "../modals/CreateUserModal";
import { useAuth } from "../context/UserContext";
import Map, { Layer, Source, Marker } from "react-map-gl";
import { ConnectModal } from "../modals/ConnectModal";
import { MapUser } from "./MapUser";
import { useResponsive } from "../context/ResponsiveContext";
import Supercluster from "supercluster";
import { useInterval } from "usehooks-ts";
import AnimateMovement from "../AnimateMovement";

export const MAP_USER_FRAGMENT = gql`
  fragment mapUserData on User {
    id
    firstName
    lastName
    lat
    lng
    headline
    introduction
  }
`;

const getUserCircle = (
  userProfile: mapUserData | null,
  walkDuration: string | null
) => {
  if (!walkDuration) return null;

  const walkDurationInMinutes = parseInt(walkDuration, 10);

  if (!userProfile || !userProfile.lat || !userProfile.lng) return null;

  const center = point([userProfile.lng, userProfile.lat]);
  const radius = (walkDurationInMinutes / 60) * 1.5;
  const options = {
    steps: 80,
    units: "kilometers" as Units,
  };

  return circle(center, radius, options);
};

export const PeopleMap = (props: {
  walkDuration: string | null;
  users: Array<mapUserData>;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [connectWith, setConnectWith] = useState<mapUserData | null>(null);
  const { isAuthenticated, userProfile } = useAuth();
  const [hovered, setHovered] = useState<string | null>(null);
  const { isMobile } = useResponsive();
  const [zoom, setZoom] = useState(11);
  const [center, setCenter] = useState<null | {
    lat: number;
    lng: number;
  }>(null);
  const [initialized, setInitialized] = useState(false);
  const [animation, setAnimation] = useState<null | string>(null);
  const [clusters, setClusters] = useState<
    (
      | Supercluster.ClusterFeature<Supercluster.AnyProps>
      | Supercluster.PointFeature<Supercluster.AnyProps>
    )[]
  >([]);

  const circle = getUserCircle(userProfile, props.walkDuration);

  useInterval(() => {
    if (mapRef.current && !initialized) {
      setInitialized(true);
    }
  }, 100);

  useEffect(() => {
    if (!mapRef.current || !userProfile) return;

    mapRef.current.easeTo({
      center: [userProfile.lng, userProfile.lat],
      zoom: 15.2 - Number(props.walkDuration) / 30,
    });
  }, [props.walkDuration, userProfile]);

  useEffect(() => {
    // set the zoom level on change
    if (!initialized || !mapRef.current) return;

    const map = mapRef.current.getMap();

    const onZoom = () => {
      const currentZoom = map.getZoom();

      setZoom(currentZoom);
    };

    const onMoveEnd = () => {
      const currentCenter = map.getCenter();

      setCenter(currentCenter);
    };

    map.on("zoom", onZoom);
    map.on("moveend", onMoveEnd);

    return () => {
      map.off("zoom", onZoom);
    };
  }, [initialized]);

  useEffect(() => {
    if (!initialized || !mapRef.current) return;

    const users = props.users;

    const points = users.map((user) => ({
      type: "Feature" as any,
      properties: {
        id: user.id,
        cluster: false,
        user,
      },
      geometry: {
        type: "Point" as any,
        coordinates: [user.lng, user.lat],
      },
    }));

    const bounds = mapRef.current.getMap().getBounds().toArray().flat();

    const _supercluster = new Supercluster({
      radius: 35,
      maxZoom: 20,
    });
    _supercluster.load(points);

    const res = _supercluster.getClusters(bounds, Math.floor(zoom));
    setClusters(res);
  }, [props.users, zoom, initialized, center]);

  if (!userProfile) return null;

  return (
    <div
      ref={ref}
      css={css`
        margin: 0 20px;
        border-radius: 20px;
        overflow: hidden;

        ${isMobile &&
        css`
          margin: 0;
          border-radius: none;
        `}
      `}
    >
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: Number(userProfile.lng) || 13.405,
          latitude: Number(userProfile.lat) || 52.52,
          zoom,
        }}
        minZoom={10}
        style={{
          width: "100%",
          height: isMobile ? "calc(100vh - 207px)" : "calc(100vh - 321px)",
        }}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      >
        {circle && (
          <Source id="point" type="geojson" data={circle}>
            <Layer
              id="circle"
              type="fill"
              paint={{
                "fill-color": "#522e7c",
                "fill-opacity": 0.25,
              }}
            />
          </Source>
        )}
        {clusters.map((cluster) => {
          // every cluster point has coordinates
          const [longitude, latitude] = cluster.geometry.coordinates;
          // the point may be either a cluster or a crime point
          // @ts-ignore
          const { cluster: isCluster, point_count: pointCount } =
            cluster.properties;

          const { user } = cluster.properties;

          // we have a cluster to render
          if (isCluster) {
            return (
              <Marker
                key={`cluster-${cluster.id}`}
                latitude={latitude}
                longitude={longitude}
              >
                <div
                  css={css`
                    color: #fff;
                    background: #3a86ffff;
                    border-radius: 50%;
                    padding: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                  `}
                  onClick={() => {
                    if (!mapRef.current) return;

                    mapRef.current.easeTo({
                      duration: 500,
                      zoom: mapRef.current.getZoom() + 1,
                      center: [longitude, latitude],
                    });
                  }}
                  style={{
                    width: `${30 + (pointCount / props.users.length) * 20}px`,
                    height: `${30 + (pointCount / props.users.length) * 20}px`,
                  }}
                >
                  {pointCount}
                </div>
              </Marker>
            );
          }

          return (
            <div id={`peoplemap-${user.id}`}>
              <MapUser
                user={user}
                key={user.id}
                onConnect={() => {
                  if (!isAuthenticated) {
                    setModalIsOpen(true);
                  } else {
                    setConnectWith(user);
                  }
                }}
                onMouseEnter={() => {
                  setHovered(user.id);
                }}
                onMouseLeave={() => {
                  setHovered((hovered) =>
                    hovered === user.id ? null : hovered
                  );
                }}
                hovered={hovered}
              />
            </div>
          );
        })}
      </Map>
      <CreateUserModal
        title="Create Account to Connect"
        isOpen={modalIsOpen}
        onClose={() => {
          setModalIsOpen(false);
        }}
      />
      {connectWith && (
        <ConnectModal
          user={connectWith}
          isOpen={true}
          onClose={() => {
            setConnectWith(null);
          }}
          onConnect={() => {
            setAnimation(`peoplemap-${connectWith.id}`);
          }}
        />
      )}
      {animation && (
        <AnimateMovement
          fromElementId={animation}
          toElementId={"navigation-my-connections"}
          markerHeight={50}
          markerWidth={50}
          delay={1000}
          onComplete={() => {
            setAnimation(null);
          }}
        >
          <div
            css={css`
              width: 30px;
              height: 30px;
              background: #ff006eff;
              border-radius: 50%;
            `}
          ></div>
        </AnimateMovement>
      )}
    </div>
  );
};
