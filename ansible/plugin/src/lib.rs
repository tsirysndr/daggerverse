use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn playbook(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("playbook")?
        .pkgx()?
        .with_exec(vec!["pkgx", "install", "ansible-playbook"])?
        .with_exec(vec!["ansible-playbook", &args])?
        .stdout()?;
    Ok(stdout)
}
