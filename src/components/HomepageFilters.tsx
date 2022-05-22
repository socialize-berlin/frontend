import { Button } from "./Button";
import { css } from "styled-components/macro";
import { useState } from "react";
import { useAuth } from "../context/UserContext";
import { PlaceModal } from "../modals/PlaceModal";
import { useResponsive } from "../context/ResponsiveContext";
import Select, { StylesConfig } from "react-select";

export const customStyles: StylesConfig = {
  option: (provided, state) => ({
    ...provided,
    background: state.isSelected
      ? "#522f7c"
      : state.isFocused
      ? "#f5f5fe"
      : "white",
  }),
  control: (provided, state) => ({
    ...provided,
    padding: 7,
    borderRadius: 10,
    border: "none",
    background: "#f5f5fe",
  }),
};

export type WalkDurationOption = {
  value: string;
  label: string;
};

export const walkDurationOptions: WalkDurationOption[] = [
  { value: "30", label: "30 min. walk" },
  { value: "45", label: "45 min. walk" },
  { value: "60", label: "1 hr. walk" },
  { value: "120", label: "2 hrs. walk" },
];

export function HomepageFilters(props: {
  walkDuration: WalkDurationOption | null;
  onWalkDurationChange: (walkDuration: WalkDurationOption) => void;
  onRefetch: () => void;
}) {
  const { userProfile } = useAuth();
  const [placingIsOpen, setPlacingIsOpen] = useState(false);
  const isListed = userProfile && userProfile.lat && userProfile.lng;
  const { isMobile } = useResponsive();

  return (
    <div className="wrapper">
      <div
        css={css`
          padding: 50px 0;
          display: flex;
          flex-flow: row wrap;
          justify-content: space-between;
          align-items: center;

          ${isMobile &&
          css`
            padding: 30px 0;
          `}

          h2 {
            margin: 0 0 10px 0;
          }
          h3 {
            margin: 0;
            color: #999;
          }
        `}
      >
        <div
          css={css`
            flex: 1 0 10%;
            margin-right: 20px;
            display: flex;
            flex-flow: row wrap;

            h4 {
              margin-top: 0;
              margin-bottom: 10px;
            }
          `}
        >
          {userProfile?.lat && userProfile?.lng && (
            <>
              {!isMobile && (
                <div
                  css={css`
                    margin-right: 50px;
                  `}
                >
                  <h2>Search near me</h2>
                </div>
              )}
              <div
                css={css`
                  width: ${isMobile ? "150px;" : "180px;"};
                `}
              >
                <Select
                  placeholder={isMobile ? "Duration" : "Walk duration"}
                  styles={customStyles}
                  value={props.walkDuration}
                  onChange={(value: any) => {
                    if (value) {
                      props.onWalkDurationChange(value);
                    }
                  }}
                  options={walkDurationOptions}
                />
              </div>
            </>
          )}
        </div>

        <div
          css={css`
            flex: 0 0 auto;
          `}
        >
          <Button
            size={isMobile ? "small" : "large"}
            look={isListed ? "outline" : "primary"}
            onClick={async () => {
              setPlacingIsOpen(true);
            }}
          >
            {isListed ? "Change listing" : "Place me on map"}
          </Button>
        </div>
      </div>

      <PlaceModal
        isOpen={placingIsOpen}
        onClose={() => {
          setPlacingIsOpen(false);
          props.onRefetch();
        }}
      />
    </div>
  );
}
