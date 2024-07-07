use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn setup(_args: String) -> FnResult<String> {
    let stdout = dag()
        .devbox()?
        .with_exec(vec!["devbox", "version"])?
        .stdout()?;

    Ok(stdout)
}

#[plugin_fn]
pub fn install(args: String) -> FnResult<String> {
    let stdout = dag()
        .devbox()?
        .with_exec(vec!["devbox", "global", "add", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn run(args: String) -> FnResult<String> {
    let stdout = dag()
        .devbox()?
        .with_exec(vec!["devbox", "run", &args])?
        .stdout()?;
    Ok(stdout)
}
