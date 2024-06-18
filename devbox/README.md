# Module: Devbox

[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@fx/devbox)](https://jsr.io/@fx/devbox)
[![ci](https://github.com/tsirysndr/daggerverse/actions/workflows/ci.yml/badge.svg)](https://github.com/tsirysndr/daggerverse/actions/workflows/ci.yml)


Returns a Container with [Devbox](https://www.jetpack.io/devbox) installed.

## 🚀 Usage

```sh
dagger call -m github.com/tsirysndr/daggerverse/devbox dev terminal
dagger call -m github.com/tsirysndr/daggerverse/devbox run --command <command> --src <source> terminal
dagger call -m github.com/tsirysndr/daggerverse/devbox install --pkgs <packages> terminal
```

## 🧑‍🔬 Example

```sh
dagger call -m github.com/tsirysndr/daggerverse/devbox install --pkgs git,curl terminal
```

## 🧑‍💻 Programmatic usage

```typescript
import { install } from 'jsr:@fx/devbox';

await install(".", ["git", "curl", "jq"]);
```
