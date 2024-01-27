# Module: Devbox

![dagger-min-version](https://img.shields.io/badge/dagger%20version-v0.9.7-green)

Returns a Container with [Devbox](https://www.jetpack.io/devbox) installed.

## Usage

```sh
dagger shell -m github.com/tsirysndr/daggerverse/devbox dev
dagger shell -m github.com/tsirysndr/daggerverse/devbox run --command <command> --src <source>
dagger shell -m github.com/tsirysndr/daggerverse/devbox install --pkgs <packages>
```

## Example

```sh
dagger shell -m github.com/tsirysndr/daggerverse/devbox install --pkgs git,curl
```
