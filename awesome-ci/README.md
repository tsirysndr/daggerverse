# Module: Awesome CI

[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@fx/awesome-ci)](https://jsr.io/@fx/awesome-ci)

Returns a Container with [awesome-ci](https://github.com/cytopia/awesome-ci) installed.

## 🚀 Usage

```sh
dagger call -m github.com/tsirysndr/daggerverse/awesome-ci dev --src <source> terminal
```

## 🧑‍🔬 Example

```sh
dagger call -m github.com/tsirysndr/daggerverse/awesome-ci dev --src . terminal
```

## 🧑‍💻 Programmatic usage

```typescript
import { gitConflicts } from 'jsr:@fx/awesome-ci';

await gitConflicts(".");
```

