# Module: Flox

![dagger-min-version](https://img.shields.io/badge/dagger%20version-v0.10.0-blue?color=3D66FF)

Returns a Container with [flox](https://flox.dev/) installed.

## Usage

```sh
dagger call -m github.com/tsirysndr/daggerverse/flox dev terminal
dagger call -m github.com/tsirysndr/daggerverse/flox install --pkgs <packages> terminal
```

## Example

```sh
dagger call -m github.com/tsirysndr/daggerverse/flox install --pkgs gh,jq terminal
```
