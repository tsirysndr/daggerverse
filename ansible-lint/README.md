# Module: Ansible Lint

[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@fx/ansible-lint)](https://jsr.io/@fx/ansible-lint)

Daggerized version of [ansible](https://github.com/ansible/ansible-lint).

## 🚀 Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/ansible-lint call lint \
  --src <source> --files <files>
```

## 🧑‍🔬 Example

```sh
dagger -m github.com/tsirysndr/daggerverse/ansible-lint call \
  lint --src . --files example.yml
dagger call -m github.com/tsirysndr/daggerverse/ansible-lint dev --src . terminal
```

## 🧑‍💻 Programmatic usage

```typescript
import { lint } from 'jsr:@fx/ansible-lint';

await lint(".", ["example.yml"]);
```
