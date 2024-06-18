# Module: Ansible

[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@fx/ansible)](https://jsr.io/@fx/ansible)

Daggerized version of [ansible](https://github.com/cytopia/docker-ansible).

## 🚀 Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/ansible call playbook --src <source> --playbook <playbook>
```

## 🧑‍🔬 Example

```sh
dagger -m github.com/tsirysndr/daggerverse/ansible call playbook --src . --playbook playbook.yml
dagger call -m github.com/tsirysndr/daggerverse/ansible dev --src . terminal
```

## 🧑‍💻 Programmatic usage

```typescript
import { playbook } from 'jsr:@fx/ansible';

await playbook(".", "playbook.yml");
```
