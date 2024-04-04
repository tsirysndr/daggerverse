use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn upload(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("upload")?
        .pkgx()?
        .with_exec(vec!["echo", "hello from r2-sync!", &args])?
        .stdout()?;
    Ok(stdout)
}
