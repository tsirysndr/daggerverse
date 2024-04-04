use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn calc(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("calc")?
        .pkgx()?
        .with_exec(vec!["echo", "hello from scorecard!", &args])?
        .stdout()?;
    Ok(stdout)
}
