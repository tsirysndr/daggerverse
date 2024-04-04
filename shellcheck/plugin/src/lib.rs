use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn lint(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("lint")?
        .pkgx()?
        .with_exec(vec!["echo", "hello from shellcheck!", &args])?
        .stdout()?;
    Ok(stdout)
}
