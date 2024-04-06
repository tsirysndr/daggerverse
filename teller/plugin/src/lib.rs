use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn run(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("run")?
        .pkgx()?
        .with_exec(vec!["pkgx", "install", "teller"])?
        .with_exec(vec!["teller", "run", &args])?
        .stdout()?;
    Ok(stdout)
}
