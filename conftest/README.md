# Module: Conftest

[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@fx/conftest)](https://jsr.io/@fx/conftest)

A Dagger Module for testing configuration files using [Conftest](https://github.com/open-policy-agent/conftest).

## 🚀 Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/conftest call test \
  --src <source> \
  --files <files> \
  --policy [policy] \
  --output [output]
```

```sh
dagger -m github.com/tsirysndr/daggerverse/conftest call \
  dev --src <source> terminal
```

## 🧑‍🔬 Example

```sh
dagger -m github.com/tsirysndr/daggerverse/conftest call test \
  --src . \
  --files deployment.yaml \
  --policy policy \
  --output-format stdout
```

```sh
dagger call -m github.com/tsirysndr/daggerverse/conftest dev --src . terminal
```


## 🧑‍💻 Programmatic usage

```typescript
import { test } from 'jsr:@fx/conftest';

await test(
  ".", 
  "deployment.yaml", 
  "policy", 
  "stdout"
);
```

