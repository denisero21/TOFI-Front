import { InjectionToken } from "@angular/core";

export const baseApiConfig = {
  mock: "/mockapi",
  prism: "/prism",
  root: "api", // TODO: if prod
  // root: "/local", // TODO: if dev
};

export interface ApiConfig {
  root: string;
  prism: string;
  mock: string;
}
