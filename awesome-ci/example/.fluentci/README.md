# Base Pipeline

[![fluentci pipeline](https://img.shields.io/badge/dynamic/json?label=pkg.fluentci.io&labelColor=%23000&color=%23460cf1&url=https%3A%2F%2Fapi.fluentci.io%2Fv1%2Fpipeline%2Fbase_pipeline&query=%24.version)](https://pkg.fluentci.io/base_pipeline)
![deno compatibility](https://shield.deno.dev/deno/^1.34)

This repository contains a minimal pipeline for a [Fluent CI](https://fluentci.io) project. It is intended to be used as a template for new projects.
Reusing this template will allow you to get started with Fluent CI in a matter of minutes, just run the following command:

```bash
fluentci init
```

## Files Tree Layout

```
src
├── aws
│   ├── config_test.ts    : AWS CodePipeline Config Test
│   ├── config.ts         : AWS CodePipeline Config
│   ├── init.ts           : Used by `fluentci ac init` command 
│   └── README.md         : AWS CodePipeline README
├── azure                 : Azure Pipelines YAML Generator
│   ├── config_test.ts    : Azure Pipelines Config Test
│   ├── config.ts         : Azure Pipelines Config
│   ├── init.ts           : Used by `fluentci ap init` command 
│   └── README.md         : Azure Pipelines README
├── circleci              : Circle CI YAML Generator
│   ├── config_test.ts    : Circle CI Config Test
│   ├── config.ts         : Circle CI Config
│   ├── init.ts           : Used by `fluentci cci init` command 
│   └── README.md         : Circle CI README
├── dagger                : Dagger pipeline files
│   ├── index.ts          : Dagger pipeline entrypoint
│   ├── jobs.ts           : Dagger pipeline jobs
│   ├── list_jobs.ts      : Used by `fluentci ls` command
│   ├── pipeline.ts       : Dagger pipeline definition
│   └── runner.ts         : Used by `dagger run fluentci .` command
├── github                : Github Actions YAML Generator
│   ├── config_test.ts    : Github Actions Config Test
│   ├── config.ts         : Github Actions Config
│   ├── init.ts           : Used by `fluentci gh init` command
│   └── README.md         : Github Actions README
└── gitlab                : Gitlab CI YAML Generator
    ├── config_test.ts    : Gitlab CI Config Test
    ├── config.ts         : Gitlab CI Config
    ├── init.ts           : Used by `fluentci gl init` command 
    └── README.md         : Gitlab CI README
```
