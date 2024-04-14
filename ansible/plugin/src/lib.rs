use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn setup() -> FnResult<String> {
    let stdout = dag()
        .pipeline("setup")?
        .pkgx()?
        .with_packages(vec!["ansible"])?
        .with_exec(vec!["ansible", "--version"])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn playbook(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("playbook")?
        .pkgx()?
        .with_packages(vec!["ansible-playbook"])?
        .with_exec(vec!["ansible-playbook", &args])?
        .stdout()?;
    Ok(stdout)
}
