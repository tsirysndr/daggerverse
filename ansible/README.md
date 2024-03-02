# Module: Ansible

![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF)
![deno compatibility](https://shield.deno.dev/deno/^1.41)

Daggerized version of [ansible](https://github.com/cytopia/docker-ansible).

## 🚀 Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/ansible call playbook --src <source> --playbook <playbook>
```

## 🧑‍🔬 Example

```sh
dagger -m github.com/tsirysndr/daggerverse/ansible call playbook --src . --playbook playbook.yml
dagger call -m github.com/tsirysndr/daggerverse/ansible dev --src. terminal
```

## 🧑‍💻 Programmatic usage

```typescript
import { playbook } from 'jsr:@daggerverse/ansible';

await playbook(".", "playbook.yml");
```
