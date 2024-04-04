use anyhow::Error;
use fluentci_pdk::dag;

pub fn detect_system() -> Result<(String, String), Error> {
    let os = match dag().get_os()?.as_str() {
        "linux" => "linux",
        "macos" => "darwin",
        "windows" => "windows",
        _ => return Err(Error::msg("unsupported os")),
    };
    let arch = match dag().get_arch()?.as_str() {
        "x86_64" => "amd64",
        "aarch64" => "arm64",
        "arm" => "arm-v7",
        _ => return Err(Error::msg("unsupported arch")),
    };

    Ok((os.into(), arch.into()))
}

pub fn setup_buildx() -> Result<(), Error> {
    let version = dag().get_env("BUILDX_VERSION").unwrap_or("v0.13.1".into());
    let version = match version.as_str() {
        "" => "v0.13.1".into(),
        _ => version,
    };
    let (os, arch) = detect_system()?;

    let buildx_download_url = format!(
        "https://github.com/docker/buildx/releases/download/{}/buildx-{}.{}-{}",
        version, version, os, arch
    );

    let buildx_plugin = format!("buildx-{}.{}-{}", version, os, arch);
    dag()
        .pipeline("build")?
        .pkgx()?
        .with_exec(vec!["pkgx", "install", "docker", "wget"])?
        .with_exec(vec![&format!(
            r#"
          if [ ! -f $HOME/.docker/cli-plugins/{} ]; then
            wget {};
            chmod +x {};
            mkdir -p $HOME/.docker/cli-plugins;
            mv {} $HOME/.docker/cli-plugins;
          fi
        "#,
            buildx_plugin, buildx_download_url, buildx_plugin, buildx_plugin
        )])?
        .with_exec(vec!["docker buildx rm builder || true"])?
        .with_exec(vec![
            "docker", "buildx", "create", "--name", "builder", "--use",
        ])?
        .with_exec(vec!["docker", "buildx", "inspect", "--bootstrap"])?
        .with_exec(vec!["docker", "-v"])?
        .with_exec(vec!["docker", "buildx", "version"])?
        .stdout()?;
    Ok(())
}
