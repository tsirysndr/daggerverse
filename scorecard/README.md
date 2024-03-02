# Module: Scorecard

![dagger-min-version](https://img.shields.io/badge/dagger-v0.10.0-blue?color=3D66FF)
![deno compatibility](https://shield.deno.dev/deno/^1.41)

Calculates the [scorecard](https://github.com/ossf/scorecard) for a given repository.

## Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/scorecard call calc --repo <repository>
```

## Example

```sh
dagger -m github.com/tsirysndr/daggerverse/scorecard call calc --repo github.com/ossf-tests/scorecard-check-branch-protection-e2e
```
