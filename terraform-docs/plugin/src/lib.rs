use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn generate(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("generate")?
        .pkgx()?
        .with_exec(vec!["pkgx", "install", "terraform-docs"])?
        .with_exec(vec!["terraform-docs", &args])?
        .stdout()?;
    Ok(stdout)
}
