# Module: Checkmake

[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@fx/checkmake)](https://jsr.io/@fx/checkmake)

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
import { lint } from 'jsr:@fx/checkmake';

await lint(".");
```
