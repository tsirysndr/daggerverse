# Module: Nixpacks

![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@daggerverse/nixpacks)](https://jsr.io/@daggerverse/nixpacks)
[![ci](https://github.com/tsirysndr/daggerverse/actions/workflows/ci.yml/badge.svg)](https://github.com/tsirysndr/daggerverse/actions/workflows/nixpacks.yml)

This is [Dagger](https://dagger.io) module for building an OCI image of your project using [nixpacks](https://nixpacks.com/).

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

| Name    | Description                         |
| ------- | ----------------------------------- |
| `dev`   | Start a development environment     |
| `plan`  | Generate build plan for the project |
| `build` | Build an OCI image of the project   |

## 🧑‍💻 Programmatic usage

```typescript
import { plan, build } from 'jsr:@daggerverse/nixpacks';

await plan(".");
await build(".", "my-app");
```
