import { gql, useQuery } from "@apollo/client";
import { MAP_USER_FRAGMENT, PeopleMap } from "../components/PeopleMap";
import {
  HomepageFilters,
  WalkDurationOption,
} from "../components/HomepageFilters";
import { HomepageQuery } from "./__generated__/HomepageQuery";
import { useState } from "react";
import { css } from "styled-components/macro";
import { Loader } from "./Loader";
import { mapUserData } from "./__generated__/mapUserData";

const HOMEPAGE_QUERY = gql`
  query HomepageQuery {
    users {
      ...mapUserData
    }
  }
  ${MAP_USER_FRAGMENT}
`;

function getUsers(users: Array<mapUserData | null>) {
  const cleanUsers = users.filter(
    (user) => !!user && user.lat && user.lng
  ) as mapUserData[];

  return cleanUsers.map((user) => {
    const randomLngDelta = Math.random() * 0.01;
    const randomLtdDelta = Math.random() * 0.01;

    return {
      ...user,
      lat: Number(user.lat) + randomLtdDelta,
      lng: Number(user.lng) + randomLngDelta,
    };
  });
}

export function HomepageContainer() {
  const { loading, error, data, refetch } =
    useQuery<HomepageQuery>(HOMEPAGE_QUERY);

  const [walkDuration, setWalkDuration] = useState<WalkDurationOption | null>(
    null
  );

  const users = getUsers(data?.users || []);

  return (
    <div
      css={css`
        position: relative;
        min-height: 40vh;
      `}
    >
      {loading ? (
        <Loader absoluteCenter />
      ) : error ? (
        <p>Error :(</p>
      ) : (
        <>
          <HomepageFilters
            walkDuration={walkDuration}
            onWalkDurationChange={(walkDuration) =>
              setWalkDuration(walkDuration)
            }
            onRefetch={refetch}
          />
          {data && users && (
            <PeopleMap
              walkDuration={walkDuration ? walkDuration.value : null}
              users={users}
            />
          )}
        </>
      )}
    </div>
  );
}
