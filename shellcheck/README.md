# Module: Shellcheck

![dagger-min-version](https://img.shields.io/badge/dagger%20version-v0.10.0-green)

This module can be used to perform lint check on Shell Script files using [shellcheck](https://github.com/koalaman/shellcheck/)

## Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/shellcheck call lint --src <source>
```

## Example

```sh
dagger -m github.com/tsirysndr/daggerverse/shellcheck call lint --src .
```
