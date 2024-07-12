use extism_pdk::*;
use fluentci_pdk::dag;

pub mod helpers;

#[plugin_fn]
pub fn setup(_args: String) -> FnResult<String> {
    let stdout = helpers::setup_flox()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn run(args: String) -> FnResult<String> {
    helpers::setup_flox()?;
    let stdout = dag().flox()?.with_exec(vec![&args])?.stdout()?;
    Ok(stdout)
}
