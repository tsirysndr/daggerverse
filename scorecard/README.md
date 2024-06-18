# Module: Scorecard

[![dagger-min-version](https://shield.fluentci.io/dagger/v0.11.7)](https://dagger.io)
![deno compatibility](https://shield.deno.dev/deno/^1.41)
[![](https://jsr.io/badges/@fx/scorecard)](https://jsr.io/@fx/scorecard)

Calculates the [scorecard](https://github.com/ossf/scorecard) for a given repository.

## 🚀 Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/scorecard call calc --repo <repository>
```

## 🧑‍🔬 Example

```sh
dagger -m github.com/tsirysndr/daggerverse/scorecard call calc --repo github.com/ossf-tests/scorecard-check-branch-protection-e2e
```

## 🧑‍💻 Programmatic usage

```typescript
import { calc } from 'jsr:@fx/scorecard';

await calc(
  "github.com/ossf-tests/scorecard-check-branch-protection-e2e"
);
```
