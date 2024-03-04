# Module: Checkmake

![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@daggerverse/checkmake)](https://jsr.io/@daggerverse/checkmake)

Daggerized version of [checkmake](https://github.com/mrtazz/checkmake).

## 🚀 Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/checkmake call lint --src <source>
```

## 🧑‍🔬 Example

```sh
dagger -m github.com/tsirysndr/daggerverse/checkmake call lint --src .
```

## 🧑‍💻 Programmatic usage

```typescript
import { lint } from 'jsr:@daggerverse/checkmake';

await lint(".");
```
