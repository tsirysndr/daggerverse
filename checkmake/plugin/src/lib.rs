use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn lint(args: String) -> FnResult<String> {
    let stdout = dag()
        .pipeline("lint")?
        .devbox()?
        .with_exec(vec!["devbox", "global", "add", "checkmake"])?
        .with_exec(vec![
            r#"
        eval "$(devbox global shellenv --recompute)"
        checkmake"#,
            &args,
        ])?
        .stdout()?;
    Ok(stdout)
}
