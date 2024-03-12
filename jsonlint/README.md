# Module: JSON Lint

![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@fx/jsonlint)](https://jsr.io/@fx/jsonlint)

Daggerized version of [jsonlint](https://github.com/zaach/jsonlint).

## 🚀 Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/jsonlint call lint --src <source>
```

## 🧑‍🔬 Example

```sh
dagger -m github.com/tsirysndr/daggerverse/jsonlint call lint --src .
```

## 🧑‍💻 Programmatic usage

```typescript
import { lint } from 'jsr:@fx/jsonlint';

await lint(".");
```
