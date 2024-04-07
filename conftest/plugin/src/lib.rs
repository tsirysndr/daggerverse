use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn test(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("test")?
        .pkgx()?
        .with_exec(vec!["pkgx", "install", "conftest"])?
        .with_exec(vec!["conftest", "test", &args])?
        .stdout()?;
    Ok(stdout)
}
