use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn calc(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("calc")?
        .devbox()?
        .with_exec(vec!["devbox", "global", "add", "scorecard"])?
        .with_exec(vec![
            r#"
        eval "$(devbox global shellenv --recompute)"
        scorecard"#,
            &args,
        ])?
        .stdout()?;
    Ok(stdout)
}
