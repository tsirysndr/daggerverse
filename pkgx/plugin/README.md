# Pkgx Plugin

This plugin sets up your CI/CD pipeline with [pkgx](https://pkgx.sh/).

## 🚀 Usage

Add the following command to your CI configuration file:

```bash
fluentci run --wasm pkgx setup
```

## Functions

| Name    | Description                                                      |
| ------- | ---------------------------------------------------------------- |
| setup   | Downloads and installs Pkgx.                                     |
| install | Install packages                                                 |

## Code Usage

Add `fluentci-pdk` crate to your `Cargo.toml`:

```toml
[dependencies]
fluentci-pdk = "0.2.0"
```

Use the following code to call the plugin:

```rust
use fluentci_pdk::dag;

// ...

dag().call("https://pkg.fluentci.io/pkgx@v0.1.0?wasm=1", "setup", vec!["latest"])?;
```

## 📚 Examples

Github Actions:

```yaml
- name: Setup Fluent CI CLI
  uses: fluentci-io/setup-fluentci@v5
  with:
    wasm: true
    plugin: pkgx
    args: |
      setup
- name: Show Pkgx version
  run: |
    type pkgx
    pkgx --version
```
