# Module: Kubeconform

[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@fx/kubeconform)](https://jsr.io/@fx/kubeconform)
[![ci](https://github.com/tsirysndr/daggerverse/actions/workflows/ci.yml/badge.svg)](https://github.com/tsirysndr/daggerverse/actions/workflows/ci.yml)

Daggerized version of [kubeconform](https://github.com/yannh/kubeconform).

## 🚀 Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/kubeconform call lint --src <source>
```

## 🧑‍🔬 Example

```sh
dagger -m github.com/tsirysndr/daggerverse/kubeconform call lint --src . 
dagger call -m github.com/tsirysndr/daggerverse/kubeconform dev --src . terminal
```

## Arguments

| Name            | Description          | Required | Default |
| --------------- | -------------------- | -------- | ------- |
| --src           | The source directory | true     | -       |
| --output-format | The output format    | false    | text    |
| --dir           | The directory that contains k8s manifests | false | `.` |

## 🧑‍💻 Programmatic usage

```typescript
import { lint } from 'jsr:@fx/kubeconform';

await lint(".");
```
