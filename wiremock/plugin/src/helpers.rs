use anyhow::Error;
use fluentci_pdk::dag;

pub fn setup_flox() -> Result<(), Error> {
    let os = dag().get_os()?;
    if os == "macos" {
        dag()
        .pipeline("setup-flox")?
        .with_exec(vec![r#"type brew > /dev/null 2> /dev/null || /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)""#])?
        .with_exec(vec!["type flox > /dev/null 2> /dev/null || brew install flox"])?
        .stdout()?;
    }
    Ok(())
}

pub fn setup() -> Result<String, Error> {
    setup_flox()?;
    dag()
        .pipeline("setup")?
        .with_exec(vec![
            "mkdir",
            "-p",
            ".fluentci/wiremock",
            "__files",
            "mappings",
        ])?
        .stdout()?;

    let wiremock_port = dag().get_env("WIREMOCK_PORT")?;

    if wiremock_port.is_empty() {
        dag().set_envs(vec![("WIREMOCK_PORT".into(), "8080".into())])?;
    }

    let stdout = dag()
        .flox()?
        .with_workdir(".fluentci/wiremock")?
        .with_exec(vec![
            "flox",
            "install",
            "wiremock",
            "overmind",
            "tmux",
        ])?
        .with_exec(vec!["[ -f ../../mappings/github.com-ghes-2.21-stubs.json ] || pkgx wget -O ../../mappings/github.com-ghes-2.21-stubs.json  https://raw.githubusercontent.com/tsirysndr/daggerverse/main/wiremock/mappings/github.com-ghes-2.21-stubs.json"])?
        .with_exec(vec![
            "grep -q wiremock: Procfile || echo -e 'wiremock: wiremock --port $WIREMOCK_PORT \\n' >> Procfile",
        ])?
        .stdout()?;

    Ok(stdout)
}
