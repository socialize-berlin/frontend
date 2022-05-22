import { gql } from "@apollo/client";
import React, { useState, useEffect, useCallback } from "react";
import { MeQuery_me } from "./__generated__/MeQuery";
import { useApolloClient } from "@apollo/client";

export const SOCIALIZE_AUTH_TOKEN = "SOCIALIZE_AUTH_TOKEN";

type State = {
  isAuthenticated: boolean | null;
  userProfile: MeQuery_me | null;
};

const emptyState = {
  userProfile: null,
  isAuthenticated: null,
  authenticate: () => {},
  setProfile: () => {},
  deauthenticate: () => {},
  refetch: () => {},
};

type Actions = {
  authenticate: (token: string) => void;
  deauthenticate: () => void;
  refetch: () => void;
  setProfile: (userProfile: any) => void;
};

type Context = State & Actions;

const UserStateContext = React.createContext<Context>(emptyState);

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      firstName
      lastName
      headline
      introduction
      lat
      lng
      pendingConnectionsCount
      unreadMessagesCount
    }
  }
`;

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(emptyState);
  const client = useApolloClient();

  const fetchUserProfile = useCallback(async () => {
    const { data } = await client.query({
      query: ME_QUERY,
      fetchPolicy: "network-only",
    });

    setState((prevState) => ({
      ...prevState,
      userProfile: data.me,
      isAuthenticated: true,
    }));
  }, [client]);

  useEffect(() => {
    const token = localStorage.getItem(SOCIALIZE_AUTH_TOKEN);

    if (token) {
      fetchUserProfile();
    } else {
      setState((prevState) => ({
        ...prevState,
        isAuthenticated: false,
      }));
    }
  }, [fetchUserProfile]);

  const authenticate = useCallback(
    async (token: string) => {
      localStorage.setItem(SOCIALIZE_AUTH_TOKEN, token);

      const { data } = await client.query({
        query: ME_QUERY,
      });

      setState((state) => {
        return {
          ...state,
          userProfile: data.me,
          isAuthenticated: true,
        };
      });
    },
    [client]
  );

  const setProfile = useCallback((userProfile: any) => {
    setState((state) => ({
      ...state,
      userProfile: {
        ...state.userProfile,
        ...userProfile,
      },
    }));
  }, []);

  const deauthenticate = useCallback(() => {
    setState({
      userProfile: null,
      isAuthenticated: false,
    });

    localStorage.removeItem(SOCIALIZE_AUTH_TOKEN);
  }, []);

  const actions = {
    authenticate,
    setProfile,
    deauthenticate,
    refetch: fetchUserProfile,
  };

  return (
    <UserStateContext.Provider value={{ ...state, ...actions }}>
      {children}
    </UserStateContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(UserStateContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a UserProvider");
  }

  return context;
}
