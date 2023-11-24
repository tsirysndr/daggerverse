# Module: Pkgx

![dagger-min-version](https://img.shields.io/badge/dagger%20version-v0.9.3-yellow)

Returns a Container with the package specified in the [pkgx](https://pkgx.sh/) argument.

## Usage

```sh
dagger shell -m github.com/tsirysndr/daggerverse/pkgx install --pkgs <packages>
dagger shell -m github.com/tsirysndr/daggerverse/pkgx dev --src <source>
```

## Example

```sh
dagger shell -m github.com/tsirysndr/daggerverse/pkgx install --pkgs jq,gh
dagger shell -m github.com/tsirysndr/daggerverse/pkgx dev --src .
```

## Install Arguments

| Name | Description         | Required |
| ---- | ------------------- | -------- |
| pkgs | Packages to install | true     |

## Dev Arguments

| Name | Description         | Required |
| ---- | ------------------- | -------- |
| src  | Directory to mount  | true     |