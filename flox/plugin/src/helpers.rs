use anyhow::Error;
use fluentci_pdk::dag;

pub fn setup_flox() -> Result<String, Error> {
    let os = dag().get_os()?;
    if os == "macos" {
        dag()
      .pipeline("setup-flox")?
      .with_exec(vec![r#"type brew > /dev/null 2> /dev/null || /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)""#])?
      .with_exec(vec!["type flox > /dev/null 2> /dev/null || brew install flox"])?
      .stdout()?;
    }
    let stdout = dag()
        .flox()?
        .with_exec(vec!["flox", "--version"])?
        .stdout()?;
    Ok(stdout)
}
