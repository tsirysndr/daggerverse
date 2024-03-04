# Module: Ansible Lint

![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@daggerverse/ansible-lint)](https://jsr.io/@daggerverse/ansible-lint)

Daggerized version of [ansible](https://github.com/ansible/ansible-lint).

## 🚀 Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/ansible-lint call lint --src <source>
```

## 🧑‍🔬 Example

```sh
dagger -m github.com/tsirysndr/daggerverse/ansible-lint call lint --src . 
dagger call -m github.com/tsirysndr/daggerverse/ansible-lint dev --src. terminal
```

## 🧑‍💻 Programmatic usage

```typescript
import { lint } from 'jsr:@daggerverse/ansible-lint';

await lint(".");
```
