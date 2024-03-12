# Module: Envhub

![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@fx/envhub)](https://jsr.io/@fx/envhub)

Daggerized version of [envhub](https://github.com/tsirysndr/envhub).

## 🚀 Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/envhub call \
  use --environment <environment> \
   --src <dir>
```

## 🧑‍🔬 Example

```sh
dagger -m github.com/tsirysndr/daggerverse/envhub call \
  use --environment github:tsirysndr/dotfiles-example \
  --src .
```

## 🛠️ Arguments

| Name         | Description                                                          | Required |
| ------------ | -------------------------------------------------------------------- | -------- |
| src          | Optional context directory.                                          | false    |
| environment  | Environment to use, can be a local directory or a github repository. | true     |

## 🧑‍💻 Programmatic usage

```typescript
import { use } from 'jsr:@fx/envhub';

await use(
  ".",
  "github:tsirysndr/dotfiles-example"
);
```
