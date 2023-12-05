# Module: Ansible Lint

![dagger-min-version](https://img.shields.io/badge/dagger%20version-v0.9.3-yellow)

Daggerized version of [ansible](https://github.com/ansible/ansible-lint).

## Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/ansible-lint call lint --src <source>
```

## Example

```sh
dagger -m github.com/tsirysndr/daggerverse/ansible-lint call lint --src . 
dagger shell -m github.com/tsirysndr/daggerverse/ansible-lint dev --src .
```
