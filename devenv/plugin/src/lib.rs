use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn setup(_args: String) -> FnResult<String> {
    let stdout = dag()
        .devenv()?
        .with_exec(vec!["devenv", "version"])?
        .stdout()?;

    Ok(stdout)
}

#[plugin_fn]
pub fn run(args: String) -> FnResult<String> {
    let stdout = dag().devenv()?.with_exec(vec![&args])?.stdout()?;
    Ok(stdout)
}
