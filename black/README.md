# Module: Black

![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@fx/black)](https://jsr.io/@fx/black)

Daggerized version of [black](https://github.com/python/black).

## 🚀 Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/black call format --src <source>
```

## 🧑‍🔬 Example

```sh
dagger -m github.com/tsirysndr/daggerverse/black call \
  format --src .

dagger -m github.com/tsirysndr/daggerverse/black call \
  dev --src . terminal
```

## 🧑‍💻 Programmatic usage

```typescript
import { format } from 'jsr:@fx/black';

await format(".");
```