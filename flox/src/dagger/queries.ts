import { gql } from "../../deps.ts";

export const run = gql`
  query Run($src: String!, $command: String!) {
    run(src: $src, command: $command)
  }
`;

export const dev = gql`
  query Dev($src: String) {
    dev(src: $src)
  }
`;

export const install = gql`
  query Install($src: String, $pkgs: [String!]!) {
    install(src: $src, pkgs: $pkgs)
  }
`;
