# Module: R2 Sync

![dagger-min-version](https://img.shields.io/badge/dagger%20version-v0.9.3-yellow)

Sync files from local directory to Cloudflare [R2](https://www.cloudflare.com/developer-platform/r2/).

It uses aws-cli, so you can use it on any S3 compatible storage.

## Usage

```sh
dagger -m github.com/tsirysndr/daggerverse/r2-sync \
  call upload \
  --src <source> \
  --bucket <bucket> \
  --access-key <access-key-id> \
  --secret-key <secret-access-key> \
  --endpoint <endpoint>
```

```sh
dagger shell -m github.com/tsirysndr/daggerverse/r2-sync dev --src <source>
```

## Example

```sh
dagger -m github.com/tsirysndr/daggerverse/r2-sync \
  call upload \
  --src . \
  --bucket demo \
  --access-key $ACCESS_KEY \
  --secret-key $SECRET_KEY \
  --endpoint https://$ACCOUNT_ID.r2.cloudflarestorage.com
```

```sh
dagger shell -m github.com/tsirysndr/daggerverse/r2-sync dev --src .
```
