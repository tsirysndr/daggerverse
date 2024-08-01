# Wiremock Plugin

[![fluentci pipeline](https://shield.fluentci.io/x/wiremock)](https://pkg.fluentci.io/wiremock)

Wiremock service plugin for FluentCI. [Wiremock](wiremock.org/) is a tool for mocking HTTP services.

## 🚀 Usage

Add the following command to your CI configuration file:

```bash
fluentci run --wasm wiremock start
```

## Functions

| Name   | Description                                 |
| ------ | --------------------------------------------|
| start  | Start Wiremock server                       |
| stop   | Stop Wiremock server                        |

## Code Usage

Add `fluentci-pdk` crate to your `Cargo.toml`:

```toml
[dependencies]
fluentci-pdk = "0.2.1"
```

Use the following code to call the plugin:

```rust
use fluentci_pdk::dag;

// ...

dag().call("https://pkg.fluentci.io/wiremock@v0.1.0?wasm=1", "start", vec![])?;
```

## 📚 Examples

Github Actions:

```yaml
- name: Setup Fluent CI CLI
  uses: fluentci-io/setup-fluentci@v5
  with:
    wasm: true
    plugin: wiremock
    args: |
      start
```
