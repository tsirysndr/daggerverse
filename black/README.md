# Module: Black

![dagger-min-version](https://img.shields.io/badge/dagger%20version-v0.9.8-green)

Daggerized version of [black](https://github.com/python/black).

## Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/black call format --src <source>
```

## Example

```sh
dagger -m github.com/tsirysndr/daggerverse/black call format --src .
dagger call -m github.com/tsirysndr/daggerverse/black dev --src . shell
```
