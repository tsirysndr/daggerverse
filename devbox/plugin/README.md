# Devbox Plugin

[![fluentci pipeline](https://shield.fluentci.io/x/devbox)](https://pkg.fluentci.io/devbox)

This plugin sets up your CI/CD pipeline with a specific version of [devbox](https://www.jetify.com/devbox/).

## 🚀 Usage

Add the following command to your CI configuration file:

```bash
fluentci run --wasm devbox setup
```

## Functions

| Name    | Description                                                      |
| ------- | ---------------------------------------------------------------- |
| setup   | Installs a specific version of devbox.                           |
| run     |  Run a script or command in a shell with access to your packages |
| install | Install packages                                                |

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

dag().call("https://pkg.fluentci.io/devbox@v0.1.0?wasm=1", "setup", vec!["latest"])?;
```

## 📚 Examples

Github Actions:

```yaml
- name: Setup Fluent CI CLI
  uses: fluentci-io/setup-fluentci@v5
  with:
    wasm: true
    plugin: devbox
    args: |
      setup
- name: Show Devbox version
  run: |
    type devbox
    devbox version
```

