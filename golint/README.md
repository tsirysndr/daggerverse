# Module: Go Lint

[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
![deno compatibility](https://shield.deno.dev/deno/^1.41)

Daggerized version of [golint](https://github.com/golang/lint).

## Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/golint call lint --src <source>
```

## Example

```sh
dagger -m github.com/tsirysndr/daggerverse/golint call lint --src .
```
