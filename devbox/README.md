# Module: Devbox

![dagger-min-version](https://img.shields.io/badge/dagger%20version-v0.9.11-green)

Returns a Container with [Devbox](https://www.jetpack.io/devbox) installed.

## Usage

```sh
dagger call -m github.com/tsirysndr/daggerverse/devbox dev terminal
dagger call -m github.com/tsirysndr/daggerverse/devbox run --command <command> --src <source> terminal
dagger call -m github.com/tsirysndr/daggerverse/devbox install --pkgs <packages> terminal
```

## Example

```sh
dagger call -m github.com/tsirysndr/daggerverse/devbox install --pkgs git,curl terminal
```
