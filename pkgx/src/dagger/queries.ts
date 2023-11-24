import { gql } from "../../deps.ts";

export const install = gql`
  query Install($pkgs: [String!]!) {
    install(pkgs: $pkgs)
  }
`;

export const dev = gql`
  query Dev($src: String) {
    dev(src: $src)
  }
`;
