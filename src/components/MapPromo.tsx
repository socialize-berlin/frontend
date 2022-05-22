import { useEffect, useRef, useState } from "react";
import { css } from "styled-components/macro";
import { mapUserData } from "./__generated__/mapUserData";
import { CreateUserModal } from "../modals/CreateUserModal";
import Map from "react-map-gl";
import { MapUser } from "./MapUser";
import { useResponsive } from "../context/ResponsiveContext";

const users: Array<Omit<mapUserData, "__typename">> = [
  {
    id: "1",
    firstName: "Matthew",
    lastName: "Dixon",
    lat: "52.51",
    lng: "13.31",
    headline: "Artist",
    introduction: "",
  },
  {
    id: "2",
    firstName: "Eddy",
    lastName: "Larison",
    lat: "52.54",
    lng: "13.385",
    headline: "Data Scientist",
    introduction: "",
  },
  {
    id: "3",
    firstName: "Taylor",
    lastName: "Robinson",
    lat: "52.49",
    lng: "13.405",
    headline: "UI Designer",
    introduction: "",
  },
  {
    id: "4",
    firstName: "Jessie",
    lastName: "Green",
    lat: "52.51",
    lng: "13.385",
    headline: "Barista",
    introduction: "",
  },
  {
    id: "5",
    firstName: "Marshall",
    lastName: "Sims",
    lat: "52.482",
    lng: "13.385",
    headline: "Astrophysicist",
    introduction: "",
  },
  {
    id: "6",
    firstName: "Seth",
    lastName: "Ford",
    lat: "52.52",
    lng: "13.375",
    headline: "Product Manager",
    introduction: "",
  },
  {
    id: "7",
    firstName: "Yvonne",
    lastName: "Gomez",
    lat: "52.52",
    lng: "13.435",
    headline: "Software Engineer",
    introduction: "",
  },
  {
    id: "8",
    firstName: "Calvin",
    lastName: "Snyder",
    lat: "52.51",
    lng: "13.395",
    headline: "Architect",
    introduction: "",
  },
  {
    id: "9",
    firstName: "Debbie",
    lastName: "Reed",
    lat: "52.53",
    lng: "13.415",
    headline: "Car Designer",
    introduction: "",
  },
  {
    id: "10",
    firstName: "Debbie",
    lastName: "Griffin",
    lat: "52.519",
    lng: "13.441",
    headline: "I run Späti",
    introduction: "",
  },
  {
    id: "11",
    firstName: "Norman",
    lastName: "Davis",
    lat: "52.509",
    lng: "13.441",
    headline: "Math Teacher",
    introduction: "",
  },
  {
    id: "12",
    firstName: "Dolores",
    lastName: "Moore",
    lat: "52.545",
    lng: "13.428",
    headline: "Finanzamtsfachangestellte",
    introduction: "",
  },
  {
    id: "13",
    firstName: "Riley",
    lastName: "Kuhn",
    lat: "52.54",
    lng: "13.425",
    headline: "Physician",
    introduction: "",
  },
];

export const MapPromo = (props: {}) => {
  const mapRef = useRef<any>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const { isMobile } = useResponsive();

  useEffect(() => {
    const increaseIndex = () => {
      if (!hovered) {
        setIndex(index + 1);
      }
    };

    const interval = setInterval(increaseIndex, 3000);

    return () => clearInterval(interval);
  }, [index, hovered]);

  useEffect(() => {
    const user = users[index % users.length];
    if (!mapRef.current || !user) return;

    mapRef.current.easeTo({
      center: [user.lng, user.lat],
      duration: 1500,
    });
  }, [index]);

  return (
    <div
      css={css`
        border-radius: 20px;
        overflow: hidden;
      `}
    >
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: users[0].lng,
          latitude: users[0].lat,
          zoom: 15,
        }}
        minZoom={12}
        style={{
          width: "100%",
          height: isMobile ? "50vh" : "50vh",
        }}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      >
        {users.map((user) => {
          return (
            <MapUser
              user={user}
              key={user.id}
              hovered={hovered}
              onConnect={() => {
                setModalIsOpen(true);
              }}
              onMouseEnter={() => {
                setHovered(user.id);
              }}
              onMouseLeave={() => {
                setHovered((hovered) => (hovered === user.id ? null : hovered));
              }}
            />
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
    </div>
  );
};
