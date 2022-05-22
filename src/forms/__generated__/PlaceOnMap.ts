/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: PlaceOnMap
// ====================================================

export interface PlaceOnMap_placeOnMap_user {
  __typename: "User";
  headline: string;
  introduction: string;
  lat: any | null;
  lng: any | null;
}

export interface PlaceOnMap_placeOnMap {
  __typename: "PlaceOnMap";
  user: PlaceOnMap_placeOnMap_user | null;
}

export interface PlaceOnMap {
  placeOnMap: PlaceOnMap_placeOnMap | null;
}

export interface PlaceOnMapVariables {
  headline: string;
  introduction: string;
  lat: any;
  lng: any;
}
