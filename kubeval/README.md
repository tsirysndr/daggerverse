# Module: Kubeval

[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
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
