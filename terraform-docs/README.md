# Module: terraform-docs

[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@fx/terraform-docs)](https://jsr.io/@fx/terraform-docs)

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
import { generate } from 'jsr:@fx/terraform-docs';

await generate(".");
```
