use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn setup(_args: String) -> FnResult<String> {
    let stdout = dag()
        .flox()?
        .with_exec(vec!["flox", "--version"])?
        .stdout()?;

    Ok(stdout)
}

#[plugin_fn]
pub fn run(args: String) -> FnResult<String> {
    let stdout = dag().flox()?.with_exec(vec![&args])?.stdout()?;
    Ok(stdout)
}
