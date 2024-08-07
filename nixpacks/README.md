# Module: Nixpacks

[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@fx/nixpacks)](https://jsr.io/@fx/nixpacks)
[![ci](https://github.com/tsirysndr/daggerverse/actions/workflows/ci.yml/badge.svg)](https://github.com/tsirysndr/daggerverse/actions/workflows/nixpacks.yml)

This is a [Dagger](https://dagger.io) module for building an OCI image of your project using [nixpacks](https://nixpacks.com/).

## 🚀 Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/nixpacks call \
  dev --src <source> terminal
```

## 🧑‍🔬 Example

```sh
dagger -m github.com/tsirysndr/daggerverse/nixpacks call \
  dev --src . terminal

dagger -m github.com/tsirysndr/daggerverse/nixpacks call \
  plan --src .

dagger -m github.com/tsirysndr/daggerverse/nixpacks call \
  build --src . --name my-app
```

## ✨ Jobs

| Name      | Description                         |
| --------- | ----------------------------------- |
| `dev`     | Start a development environment     |
| `plan`    | Generate build plan for the project |
| `build`   | Build an OCI image of the project   |
| `publish` | Publish the OCI image to a registry |

## 🧑‍💻 Programmatic usage

```typescript
import { plan, build } from 'jsr:@fx/nixpacks';

await plan(".");
await build(".", "my-app");
```
