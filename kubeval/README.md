# Module: Kubeval

![dagger-min-version](https://img.shields.io/badge/dagger%20version-v0.9.3-yellow)

Daggerized version of [kubeval](https://github.com/instrumenta/kubeval).

## Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/kubeval call lint --src <source>
```

## Example

```sh
dagger -m github.com/tsirysndr/daggerverse/kubeval call lint --src . 
dagger shell -m github.com/tsirysndr/daggerverse/kubeval dev --src .
```
