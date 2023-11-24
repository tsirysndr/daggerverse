import { gql } from "../../deps.ts";

export const setupNix = gql`
  query SetupNix($src: String) {
    setupNix(src: $src)
  }
`;
