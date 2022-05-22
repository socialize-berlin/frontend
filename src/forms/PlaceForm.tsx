import React, { useEffect } from "react";
import { css } from "styled-components/macro";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { InputField } from "./fields/InputField";
import { TextareaField } from "./fields/TextareaField";
import { Button } from "../components/Button";
import { gql, useMutation } from "@apollo/client";
import { useAuth } from "../context/UserContext";
import { Trash } from "react-feather";
import { Message } from "../components/Message";

export interface FormValues {
  introduction: string;
  headline: string;
  postcode?: string;
}

const PLACE_ON_MAP = gql`
  mutation PlaceOnMap(
    $headline: String!
    $introduction: String!
    $lat: Decimal!
    $lng: Decimal!
  ) {
    placeOnMap(
      headline: $headline
      introduction: $introduction
      lat: $lat
      lng: $lng
    ) {
      user {
        headline
        introduction
        lat
        lng
      }
    }
  }
`;

const UNLIST_USER = gql`
  mutation UnlistUser {
    unlistUser {
      ok
      user {
        lat
        lng
      }
    }
  }
`;

export function PlaceForm(props: {
  initialValues: FormValues;
  onClose: () => void;
}) {
  const re = new RegExp("[a-zA-Z-]");
  const [placeOnMap, { data, error }] = useMutation(PLACE_ON_MAP);
  const [unlistUser, { data: dataUnlist, loading: dataUnlisting }] =
    useMutation(UNLIST_USER);
  const { setProfile, userProfile } = useAuth();

  useEffect(() => {
    if (!data) return;

    setProfile(data.placeOnMap.user);
    props.onClose();
  }, [data, setProfile, props]);

  useEffect(() => {
    if (!dataUnlist) return;

    setProfile({
      lat: dataUnlist.unlistUser.user.lat,
      lng: dataUnlist.unlistUser.user.lng,
    });
    props.onClose();
  }, [dataUnlist, setProfile, props]);

  return (
    <Formik<FormValues>
      enableReinitialize
      initialValues={props.initialValues}
      validationSchema={Yup.object().shape({
        introduction: Yup.string().max(200).label("Introduction").required(),
        postcode: Yup.string().max(20).label("Postcode").required(),
        headline: Yup.string().matches(re).label("Headline").max(30).required(),
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          setSubmitting(true);

          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/Berlin,${values.postcode}.json?limit=2&access_token=${process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}`
          );

          const data = await response.json();

          if (data.features.length === 0) {
            setErrors({ postcode: "Postcode not found" });
            return;
          }

          const {
            features: [
              {
                geometry: {
                  coordinates: [lng, lat],
                },
              },
            ],
          } = data;

          await placeOnMap({
            variables: {
              lat: lat,
              lng: lng,
              headline: values.headline,
              introduction: values.introduction,
            },
          });
        } catch (error: any) {
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, values, dirty, isValid, setFieldValue }) => (
        <Form noValidate>
          <div
            css={css`
              display: flex;
              flex-flow: row wrap;
              justify-content: space-between;
            `}
          >
            <div
              css={css`
                flex: 1 0 10%;
              `}
            >
              <InputField
                name={"postcode"}
                type="text"
                label={`Postcode`}
                tip="Or address of location where you want to meet"
              />
              <InputField
                name={"headline"}
                type="text"
                label={`Headline`}
                tip="This brief description that appears next to your name on the map"
              />

              <TextareaField
                label={`Introduction`}
                name={"introduction"}
                tip="A short summary of your skills and interests to receive more relevant messages from people around you"
                maxLength={500}
                css={css`
                  width: 100%;
                `}
              />
            </div>
          </div>

          <div
            css={css`
              margin-top: 20px;
              display: flex;
              flex-flow: row wrap;
              justify-content: space-between;
              align-items: center;
            `}
          >
            <Button isSubmitting={isSubmitting} type="submit">
              Place
            </Button>
            {userProfile && userProfile.lat && userProfile.lng && (
              <Button
                look="blank"
                isSubmitting={dataUnlisting}
                type="button"
                onClick={() => {
                  unlistUser();
                }}
              >
                <Trash
                  size={20}
                  css={css`
                    margin-right: 10px;
                    vertical-align: middle;
                  `}
                />
                <span
                  css={css`
                    vertical-align: middle;
                  `}
                >
                  Unlist me
                </span>
              </Button>
            )}
          </div>
          {error && <Message message={`Error: ${error.message}`} />}
        </Form>
      )}
    </Formik>
  );
}
