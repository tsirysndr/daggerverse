# Module: Ansible

![dagger-min-version](https://img.shields.io/badge/dagger%20version-v0.9.11-green)

Daggerized version of [ansible](https://github.com/cytopia/docker-ansible).

## Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/ansible call playbook --src <source> --playbook <playbook>
```

## Example

```sh
dagger -m github.com/tsirysndr/daggerverse/ansible call playbook --src . --playbook playbook.yml
dagger call -m github.com/tsirysndr/daggerverse/ansible dev --src . shell
```
