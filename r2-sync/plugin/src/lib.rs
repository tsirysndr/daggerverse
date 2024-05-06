use anyhow::Error;
use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn upload(args: String) -> FnResult<String> {
    let aws_access_key_id = dag().get_env("AWS_ACCESS_KEY_ID")?;
    let aws_secret_access_key = dag().get_env("AWS_SECRET_ACCESS_KEY")?;
    let mut region = dag().get_env("REGION")?;

    if aws_access_key_id.is_empty() || aws_secret_access_key.is_empty() {
        return Err(Error::msg("AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY must be set").into());
    }

    if region.is_empty() {
        region = "us-east-1".to_string();
    }

    let stdout = dag()
        .pipeline("upload")?
        .pkgx()?
        .with_exec(vec![
            "pkgx",
            "+aws",
            "+python@3.11",
            "aws",
            "configure",
            "set",
            "aws_access_key_id",
            "$AWS_ACCESS_KEY_ID",
        ])?
        .with_exec(vec![
            "aws",
            "configure",
            "set",
            "aws_secret_access_key",
            "$AWS_SECRET_ACCESS_KEY",
        ])?
        .with_exec(vec!["aws", "configure", "set", "region", &region])?
        .with_exec(vec!["aws", "s3", "sync", ".", &args])?
        .stdout()?;
    Ok(stdout)
}
