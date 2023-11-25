import { gql } from "../../deps.ts";

export const dev = gql`
  query Dev($src: String) {
    dev(src: $src)
  }
`;

export const install = gql`
  query Install($src: String, $pkgs: [String!]!) {
    install(src: $src, environment: pkgs: $pkgs)
  }
`;
