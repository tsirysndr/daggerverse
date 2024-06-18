# Module: Flakestry

[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@fx/flakestry)](https://jsr.io/@fx/flakestry)

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
import { publish } from 'jsr:@fx/flakestry';

await publish(".",
  "v0.1.0",
  Deno.env.get("GH_TOKEN")!,
  Deno.env.get("REF")!,
  Deno.env.get("ACTIONS_ID_TOKEN_REQUEST_TOKEN")!,
  Deno.env.get("ACTIONS_ID_TOKEN_REQUEST_URL")!
);
```
