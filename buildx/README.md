# Module: Buildx

[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@fx/buildx)](https://jsr.io/@fx/buildx)
[![ci](https://github.com/tsirysndr/daggerverse/actions/workflows/ci.yml/badge.svg)](https://github.com/tsirysndr/daggerverse/actions/workflows/buildx.yml)

This is a [Dagger](https://dagger.io) module for building an OCI image of your project using [buildx](https://github.com/docker/buildx).

## 🚀 Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/buildx call \
  dev --src <source> terminal
```

## 🧑‍🔬 Example

```sh
dagger -m github.com/tsirysndr/daggerverse/buildx call \
  dev --src . terminal

dagger -m github.com/tsirysndr/daggerverse/buildx call \
  build --src . \
  --tag my-app \
  --platform linux/amd64,linux/arm64
```

## ✨ Jobs

| Name      | Description                         |
| --------- | ----------------------------------- |
| `dev`     | Start a development environment     |
| `build`   | Build an OCI image of the project   |
| `publish` | Publish the OCI image to a registry |

## 🧑‍💻 Programmatic usage

```typescript
import { build } from 'jsr:@fx/buildx';

await plan(".");
await build(".", "my-app", "linux/amd64,linux/arm64");
```
