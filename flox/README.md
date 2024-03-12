# Module: Flox

![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@daggerverse/flox)](https://jsr.io/@daggerverse/flox)

Returns a Container with [flox](https://flox.dev/) installed.

## 🚀 Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/flox call \
  dev terminal
dagger -m github.com/tsirysndr/daggerverse/flox call \
  install --pkgs <packages> terminal
```

## 🧑‍🔬 Example

```sh
dagger -m github.com/tsirysndr/daggerverse/flox call  \
  install --pkgs gh,jq terminal
```

## 🧑‍💻 Programmatic usage

```typescript
import { install } from 'jsr:@daggerverse/flox';

await install(".", ["gh,jq"]);
```