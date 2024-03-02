# Module: Ansible Lint

![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF)
![deno compatibility](https://shield.deno.dev/deno/^1.41)

Daggerized version of [ansible](https://github.com/ansible/ansible-lint).

## Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/ansible-lint call lint --src <source>
```

## Example

```sh
dagger -m github.com/tsirysndr/daggerverse/ansible-lint call lint --src . 
dagger call -m github.com/tsirysndr/daggerverse/ansible-lint dev --src. terminal
```
