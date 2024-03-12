# Module: Nix

![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@daggerverse/nix)](https://jsr.io/@daggerverse/nix)

Returns a Container with Nix installed using [DeterminateSystems/nix-installer](https://github.com/DeterminateSystems/nix-installer).

## 🚀 Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/nix call \
   setup-nix terminal
```

## 🛠️ Arguments

| Name | Description                                                    | Required |
| ---- | -------------------------------------------------------------- | -------- |
| src  | Optional context directory. | false    |

## 👨‍💻 Programmatic usage

```typescript
import { setupNix } from "jsr:@daggerverse/nix";

const ctr = await setupNix(".");

const version = await ctr.withExec(["nix", "--version"])
  .stdout();

console.log(version);

```
