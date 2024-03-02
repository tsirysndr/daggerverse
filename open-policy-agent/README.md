# Module: Open Policy Agent

![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF)
![deno compatibility](https://shield.deno.dev/deno/^1.41)

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
