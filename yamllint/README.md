# Module: Yaml Lint

![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@daggerverse/yamllint)](https://jsr.io/@daggerverse/yamllint)

Daggerized version of [yamllint](https://github.com/adrienverge/yamllint).

## 🚀 Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/yamllint call lint --src <source>
```

## 🧑‍🔬 Example

```sh
dagger -m github.com/tsirysndr/daggerverse/yamllint call lint --src .
```

## 🧑‍💻 Programmatic usage

```typescript
import { lint } from 'jsr:@daggerverse/yamllint';

await lint(".");
```