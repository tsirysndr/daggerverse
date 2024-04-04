use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn eval(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("eval")?
        .pkgx()?
        .with_exec(vec!["pkgx", "install", "opa"])?
        .with_exec(vec!["opa", "eval", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn build(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("build")?
        .pkgx()?
        .with_exec(vec!["pkgx", "install", "opa"])?
        .with_exec(vec!["opa", "build", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn check(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("check")?
        .pkgx()?
        .with_exec(vec!["pkgx", "install", "opa"])?
        .with_exec(vec!["opa", "checl", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn fmt(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("fmt")?
        .pkgx()?
        .with_exec(vec!["pkgx", "install", "opa"])?
        .with_exec(vec!["opa", "fmt", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn test(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("test")?
        .pkgx()?
        .with_exec(vec!["pkgx", "install", "opa"])?
        .with_exec(vec!["opa", "test", &args])?
        .stdout()?;
    Ok(stdout)
}
