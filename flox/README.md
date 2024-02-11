# Module: Flox

![dagger-min-version](https://img.shields.io/badge/dagger%20version-v0.9.8-green)

Returns a Container with [flox](https://flox.dev/) installed.

## Usage

```sh
dagger call -m github.com/tsirysndr/daggerverse/flox dev shell
dagger call -m github.com/tsirysndr/daggerverse/flox install --pkgs <packages> shell
```

## Example

```sh
dagger call -m github.com/tsirysndr/daggerverse/flox install --pkgs gh,jq shell
```
