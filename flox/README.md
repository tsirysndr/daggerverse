# Module: Flox

![dagger-min-version](https://img.shields.io/badge/dagger%20version-v0.9.7-green)

Returns a Container with [flox](https://flox.dev/) installed.

## Usage

```sh
dagger shell -m github.com/tsirysndr/daggerverse/flox dev
dagger shell -m github.com/tsirysndr/daggerverse/flox install --pkgs <packages>
```

## Example

```sh
dagger shell -m github.com/tsirysndr/daggerverse/flox install --pkgs gh,jq
```
