# Nix Plugin

This plugin sets up your CI/CD pipeline with [Nix](https://nixos.org/).

## 🚀 Usage

Add the following command to your CI configuration file:

```bash
fluentci run --wasm nix setup
```

## Functions

| Name    | Description                                                      |
| ------- | ---------------------------------------------------------------- |
| setup   | Downloads and installs Nix.                                      |

## Code Usage

Add `fluentci-pdk` crate to your `Cargo.toml`:

```toml
[dependencies]
fluentci-pdk = "0.1.9"
```

Use the following code to call the plugin:

```rust
use fluentci_pdk::dag;

// ...

dag().call("https://pkg.fluentci.io/nix@v0.1.0?wasm=1", "setup", vec!["latest"])?;
```

## 📚 Examples

Github Actions:

```yaml
- name: Setup Fluent CI CLI
  uses: fluentci-io/setup-fluentci@v5
  with:
    wasm: true
    plugin: nix
    args: |
      setup
- name: Show Nix version
  run: |
    type nix
    nix --version
```
