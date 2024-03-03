# Module: terraform-docs

![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF)
![deno compatibility](https://shield.deno.dev/deno/^1.41)

Daggerized version of [terraform-docs](https://terraform-docs.io/).

## 🚀 Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/terraform-docs call generate --src <source>
```

## 🧑‍🔬 Example

```sh
dagger -m github.com/tsirysndr/daggerverse/terraform-docs call generate --src .
```

## 🧑‍💻 Programmatic usage

```typescript
import { generate } from 'jsr:@daggerverse/terraform-docs';

await generate(".");
```
