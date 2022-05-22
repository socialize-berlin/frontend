import { HTMLAttributes, Attributes } from "react";

declare module "react" {
  interface Attributes {
    css?: any;
  }
  interface HTMLAttributes<T> {
    css?: any;
  }
}
