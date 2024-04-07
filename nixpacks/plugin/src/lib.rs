use extism_pdk::*;
use fluentci_pdk::dag;

use crate::helpers::setup_buildx;

pub mod helpers;

#[plugin_fn]
pub fn build(args: String) -> FnResult<String> {
    setup_buildx()?;
    let stdout = dag()
        .pipeline("build")?
        .pkgx()?
        .with_exec(vec!["pkgx", "install", "nixpacks"])?
        .with_exec(vec!["nixpacks", "build", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn plan(args: String) -> FnResult<String> {
    setup_buildx()?;
    let stdout = dag()
        .pipeline("plan")?
        .pkgx()?
        .with_exec(vec!["pkgx", "install", "nixpacks"])?
        .with_exec(vec!["nixpacks", "plan", &args])?
        .stdout()?;
    Ok(stdout)
}

#[plugin_fn]
pub fn publish(args: String) -> FnResult<String> {
    let registry_password = dag().get_env("REGISTRY_PASSWORD")?;
    let registry_url = dag().get_env("REGISTRY_URL")?;
    let registry_user = dag().get_env("REGISTRY_USER")?;

    if registry_password.is_empty() || registry_url.is_empty() || registry_user.is_empty() {
        return Err(
            Error::msg("REGISTRY_PASSWORD, REGISTRY_URL, REGISTRY_USER must be set").into(),
        );
    }

    let stdout = dag()
        .pipeline("publish")?
        .pkgx()?
        .with_exec(vec!["pkgx", "install", "docker"])?
        .with_exec(vec!["echo $REGISTRY_PASSWORD | docker login $REGISTRY_URL -u $REGISTRY_USER --password-stdin"])?
        .with_exec(vec!["docker", "push", &args])?
        .stdout()?;
    Ok(stdout)
}
