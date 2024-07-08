use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn setup(_args: String) -> FnResult<String> {
    let stdout = dag()
        .pkgx()?
        .with_exec(vec!["pkgx", "--version"])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn install(args: String) -> FnResult<String> {
    let stdout = dag()
        .pkgx()?
        .with_exec(vec!["pkgx", "install", &args])?
        .stdout()?;
    Ok(stdout)
}
