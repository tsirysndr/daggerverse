use std::vec;

use extism_pdk::*;
use fluentci_pdk::dag;

#[plugin_fn]
pub fn publish() -> FnResult<String> {
    let url = dag().get_env("URL").unwrap_or_default();
    if url.is_empty() {
        dag().set_envs(vec![("URL".into(), "https://flakestry.dev".into())])?;
    }
    let stdout = dag()
        .pipeline("publish")?
        .nix()?
        .with_exec(vec![r#"
            echo null > metadata.err
            echo null > metadata.json
            echo null > outputs.json
            nix flake metadata --json
            nix flake show --json --all-systems
            nix flake metadata --json > metadata.json 2> metadata.err || echo "nix flake metadata --json failed"
            nix flake show --json --all-systems > outputs.json 2> outputs.err || echo "nix flake show --json --all-systems failed"
            if [ ! -e metadata.json ]; then
                echo null > metadata.json
            fi
            if [ ! -e outputs.json ]; then
                echo null > outputs.json
            fi
        "#])?
        .with_exec(vec![r#"
            RESPONSE=$(curl -H "Authorization: bearer $ACTIONS_ID_TOKEN_REQUEST_TOKEN" "$ACTIONS_ID_TOKEN_REQUEST_URL&audience=$URL")
            OIDC=$(echo $RESPONSE | jq -r '.value')
            README=$(find . -iname "README*" -maxdepth 1 -print -quit)
            nix run nixpkgs#jo \
            metadata=:metadata.json \
            metadata_error=@metadata.err \
            outputs=:outputs.json \
            outputs_errors=@outputs.err \
            readme="$README" \
            version="$VERSION" \
            ref="$REF" \
            > publish.json
            echo "Publishing to $URL"
            curl --fail-with-body -w '%{http_code}' -o /dev/stderr > http_code \
                -H 'Content-Type: application/json' \
                -H "Github-Token: $GH_TOKEN" \
                -H "Authorization: Bearer $OIDC" \
                -d @publish.json \
                -X POST $URL/api/publish \
            || ([ "$IGNORE_CONFLICTS" = 'true' ] && grep -qxF 409 http_code)
        "#])?
        .stdout()?;
    Ok(stdout)
}
