use extism_pdk::*;
use fluentci_pdk::dag;
use fluentci_types::nix::NixArgs;

#[plugin_fn]
pub fn setup(_args: String) -> FnResult<String> {
    let stdout = dag()
        .nix(NixArgs { impure: true })?
        .with_exec(vec!["nix", "--version"])?
        .stdout()?;
    Ok(stdout)
}
