# Module: Flox

[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@fx/flox)](https://jsr.io/@fx/flox)

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
import { install } from 'jsr:@fx/flox';

await install(".", ["gh,jq"]);
```