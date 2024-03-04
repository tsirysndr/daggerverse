# Module: Awesome CI

![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@daggerverse/awesome-ci)](https://jsr.io/@daggerverse/awesome-ci)

Returns a Container with [awesome-ci](https://github.com/cytopia/awesome-ci) installed.

## 🚀 Usage

```sh
dagger call -m github.com/tsirysndr/daggerverse/awesome-ci dev --src <source> terminal
```

## 🧑‍🔬 Example

```sh
dagger call -m github.com/tsirysndr/daggerverse/awesome-ci dev --src. terminal
```

## 🧑‍💻 Programmatic usage

```typescript
import { gitConflicts } from 'jsr:@daggerverse/awesome-ci';

await gitConflicts(".");
```

