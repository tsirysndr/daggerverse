# Devenv Plugin

[![fluentci pipeline](https://shield.fluentci.io/x/devenv)](https://pkg.fluentci.io/devenv)

This plugin sets up your CI/CD pipeline with a specific version of [Devenv](https://devenv.sh).

## 🚀 Usage

Add the following command to your CI configuration file:

```bash
fluentci run --wasm devenv setup
```

## Functions

| Name    | Description                                                      |
| ------- | ---------------------------------------------------------------- |
| setup   | Installs a specific version of devenv.                           |
| run     |  Run a script or command in a shell with access to your packages |

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

dag().call("https://pkg.fluentci.io/devenv@v0.1.0?wasm=1", "setup", vec!["latest"])?;
```

## 📚 Examples

Github Actions:

```yaml
- name: Setup Fluent CI CLI
  uses: fluentci-io/setup-fluentci@v5
  with:
    wasm: true
    plugin: devenv
    args: |
      setup
- name: Show Devenv version
  run: |
    type devenv
    devenv version
```

