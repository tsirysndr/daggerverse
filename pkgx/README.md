# Module: Pkgx

[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
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