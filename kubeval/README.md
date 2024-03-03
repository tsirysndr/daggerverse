# Module: Kubeval

![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF)
![deno compatibility](https://shield.deno.dev/deno/^1.41)

Daggerized version of [kubeval](https://github.com/instrumenta/kubeval).

## Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/kubeval call lint --src <source>
```

## Example

```sh
dagger -m github.com/tsirysndr/daggerverse/kubeval call lint --src . 
dagger call -m github.com/tsirysndr/daggerverse/kubeval dev --src . terminal
```
