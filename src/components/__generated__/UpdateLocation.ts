/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: UpdateLocation
// ====================================================

export interface UpdateLocation_updateLocation_user {
  __typename: "User";
  lat: any | null;
  lng: any | null;
}

export interface UpdateLocation_updateLocation {
  __typename: "UpdateLocation";
  ok: boolean | null;
  user: UpdateLocation_updateLocation_user | null;
}

export interface UpdateLocation {
  updateLocation: UpdateLocation_updateLocation | null;
}

export interface UpdateLocationVariables {
  lat: any;
  lng: any;
}
