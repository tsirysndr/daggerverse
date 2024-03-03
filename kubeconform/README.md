# Module: Kubeconform

![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
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
import { lint } from 'jsr:@daggerverse/kubeconform';

await lint(".");
```
