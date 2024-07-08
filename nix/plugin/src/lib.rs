use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn setup(_args: String) -> FnResult<String> {
    let stdout = dag().nix()?.with_exec(vec!["nix", "--version"])?.stdout()?;
    Ok(stdout)
}
