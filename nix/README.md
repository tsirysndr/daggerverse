# Module: Nix

[![fluentci pipeline](https://shield.fluentci.io/x/nix)](https://pkg.fluentci.io/nix)
[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@fx/nix)](https://jsr.io/@fx/nix)

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
import { setupNix } from "jsr:@fx/nix";

const ctr = await setupNix(".");

const version = await ctr.withExec(["nix", "--version"])
  .stdout();

console.log(version);

```
