# Module: Yaml Lint

![dagger-min-version](https://img.shields.io/badge/dagger%20version-v0.9.3-yellow)

Daggerized version of [yamllint](https://github.com/adrienverge/yamllint).

## Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/yamllint call lint --src <source>
```

## Example

```sh
dagger -m github.com/tsirysndr/daggerverse/yamllint call lint --src .
dagger shell -m github.com/tsirysndr/daggerverse/yamllint dev --src .
```
