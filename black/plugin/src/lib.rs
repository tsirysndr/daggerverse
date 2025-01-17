use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn format(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("format")?
        .pkgx()?
        .with_packages(vec!["black"])?
        .with_exec(vec!["black", &args])?
        .stdout()?;
    Ok(stdout)
}
