# Module: Pkgx

![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF)
![deno compatibility](https://shield.deno.dev/deno/^1.41)

Returns a Container with the package specified in the [pkgx](https://pkgx.sh/) argument.

## Usage

```sh
dagger call -m github.com/tsirysndr/daggerverse/pkgx install --pkgs <packages> terminal
dagger call -m github.com/tsirysndr/daggerverse/pkgx dev --src <source> terminal
```

## Example

```sh
dagger call -m github.com/tsirysndr/daggerverse/pkgx install --pkgs jq,gh terminal
dagger call -m github.com/tsirysndr/daggerverse/pkgx dev --src . terminal
```

## Install Arguments

| Name | Description         | Required |
| ---- | ------------------- | -------- |
| pkgs | Packages to install | true     |

## Dev Arguments

| Name | Description         | Required |
| ---- | ------------------- | -------- |
| src  | Directory to mount  | true     |