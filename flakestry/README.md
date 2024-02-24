# Module: Flakestry

![dagger-min-version](https://img.shields.io/badge/dagger%20version-v0.9.11-green)

Publish a [Nix Flake](https://nix.dev/concepts/flakes/) from a Github Repository to [flakestry](https://flakestry.dev).

## Usage

```sh
dagger call -m github.com/tsirysndr/daggerverse/flakestry publish \
  --src . \
  --version v0.1.0 \
  --gh-token GH_TOKEN \
  --ref REF \
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
