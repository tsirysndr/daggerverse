# Module: Megalinter

![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@fx/megalinter)](https://jsr.io/@fx/megalinter)

Daggerized version of [megalinter](https://github.com/oxsecurity/megalinter).

## 🚀 Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/megalinter call lint --src <source>
```

## 🧑‍🔬 Example

```sh
dagger -m github.com/tsirysndr/daggerverse/megalinter call lint --src .
```

## 🧑‍💻 Programmatic usage

```typescript
import { lint } from 'jsr:@fx/megalinter';

await lint(".");
```
