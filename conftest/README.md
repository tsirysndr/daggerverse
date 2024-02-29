# Module: Conftest

![dagger-min-version](https://img.shields.io/badge/dagger%20version-v0.10.0-green)

A Dagger Module for testing configuration files using [Conftest](https://github.com/open-policy-agent/conftest).

## Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/conftest call test \
  --src <source> \
  --files <files> \
  --policy [policy] \
  --output [output]
```

```sh
dagger call -m github.com/tsirysndr/daggerverse/conftest dev --src <source> terminal
```

## Example

```sh
dagger -m github.com/tsirysndr/daggerverse/conftest call test \
  --src . \
  --files deployment.yaml \
  --policy policy \
  --output stdout
```

```sh
dagger call -m github.com/tsirysndr/daggerverse/conftest dev --src. terminal
```
