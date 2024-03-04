# Module: Shellcheck

![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@daggerverse/shellcheck)](https://jsr.io/@daggerverse/shellcheck)
[![ci](https://github.com/tsirysndr/daggerverse/actions/workflows/ci.yml/badge.svg)](https://github.com/tsirysndr/daggerverse/actions/workflows/ci.yml)

This module can be used to perform lint check on Shell Script files using [shellcheck](https://github.com/koalaman/shellcheck/)

## 🚀 Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/shellcheck call lint --src <source>
```

## 🧑‍🔬 Example

```sh
dagger -m github.com/tsirysndr/daggerverse/shellcheck call lint --src .
```

## 🧑‍💻 Programmatic usage

```typescript
import { lint } from 'jsr:@daggerverse/shellcheck';

await lint(".");
```