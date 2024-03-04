# Module: Flakestry

![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@daggerverse/flakestry)](https://jsr.io/@daggerverse/flakestry)

Publish a [Nix Flake](https://nix.dev/concepts/flakes/) from a Github Repository to [flakestry](https://flakestry.dev).

## 🚀 Usage

```sh
dagger call -m github.com/tsirysndr/daggerverse/flakestry publish \
  --src . \
  --version v0.1.0 \
  --gh-token GH_TOKEN \
  --ref $REF \
  --actions-id-token-request-token ACTIONS_ID_TOKEN_REQUEST_TOKEN \
  --actions-id-token-request-url ACTIONS_ID_TOKEN_REQUEST_URL
```

## Arguments

| Name                           | Description                                                    | Required |
| ------------------------------ | -------------------------------------------------------------- | -------- |
| src                            | Directory containing the flake to be published to flakestry.   | true     |
| version                        | Version of the flake to be published to flakestry.           | true     |
| gh-token                       | GitHub Access Token                          | true     |
| ref                            | Git sha reference of the flake to be published to flakestry.   | true     |
| actions-id-token-request-token | GitHub Actions ID token request token.                 | true     |
| actions-id-token-request-url   | GitHub Actions ID token request URL.                   | true     |
| url                            | URL of the flakestry API                                 | false    |
| ignore-conflicts               | Ignore conflicts when publishing the flake to flakestry. | false    |

## 🧑‍💻 Programmatic usage

```typescript
import { publish } from 'jsr:@daggerverse/flakestry';

await publish(".",
  "v0.1.0",
  Deno.env.get("GH_TOKEN")!,
  Deno.env.get("REF")!,
  Deno.env.get("ACTIONS_ID_TOKEN_REQUEST_TOKEN")!,
  Deno.env.get("ACTIONS_ID_TOKEN_REQUEST_URL")!
);
```
