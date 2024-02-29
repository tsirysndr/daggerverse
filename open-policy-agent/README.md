# Module: Open Policy Agent

![dagger-min-version](https://img.shields.io/badge/dagger%20version-v0.10.0-green)

A Dagger Module for validating configuration files using [Open Policy Agent](https://www.openpolicyagent.org/).

## Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/open-policy-agent call evaluate \
  --src <source> \
  --data <data> \
  --input <input> \
  --query <query>
```

```sh
dagger call -m github.com/tsirysndr/daggerverse/open-policy-agent dev --src <source> terminal
```

## Example

```sh
dagger -m github.com/tsirysndr/daggerverse/open-policy-agent call evaluate \
  --src . \
  --data data.json \
  --input input.json \
  --query "data.example.allow"
```

```sh
dagger call -m github.com/tsirysndr/daggerverse/open-policy-agent dev --src. terminal
```
