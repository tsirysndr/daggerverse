use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn lint(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("lint")?
        .pkgx()?
        .with_packages(vec!["checkmake"])?
        .with_exec(vec!["checkmake", &args])?
        .stdout()?;
    Ok(stdout)
}
