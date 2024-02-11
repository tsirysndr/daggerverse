# Module: Pkgx

![dagger-min-version](https://img.shields.io/badge/dagger%20version-v0.9.8-green)

Returns a Container with the package specified in the [pkgx](https://pkgx.sh/) argument.

## Usage

```sh
dagger call -m github.com/tsirysndr/daggerverse/pkgx install --pkgs <packages> shell
dagger call -m github.com/tsirysndr/daggerverse/pkgx dev --src <source> shell
```

## Example

```sh
dagger call -m github.com/tsirysndr/daggerverse/pkgx install --pkgs jq,gh shell
dagger call -m github.com/tsirysndr/daggerverse/pkgx dev --src . shell
```

## Install Arguments

| Name | Description         | Required |
| ---- | ------------------- | -------- |
| pkgs | Packages to install | true     |

## Dev Arguments

| Name | Description         | Required |
| ---- | ------------------- | -------- |
| src  | Directory to mount  | true     |