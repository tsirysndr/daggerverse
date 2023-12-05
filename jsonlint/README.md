# Module: JSON Lint

![dagger-min-version](https://img.shields.io/badge/dagger%20version-v0.9.3-yellow)

Daggerized version of [jsonlint](https://github.com/zaach/jsonlint).

## Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/jsonlint call lint --src <source>
```

## Example

```sh
dagger -m github.com/tsirysndr/daggerverse/jsonlint call lint --src . 
dagger shell -m github.com/tsirysndr/daggerverse/jsonlint dev --src .
```
