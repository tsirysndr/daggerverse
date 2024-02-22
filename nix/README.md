# Module: Nix

![dagger-min-version](https://img.shields.io/badge/dagger%20version-v0.9.11-green)

Returns a Container with Nix installed using [DeterminateSystems/nix-installer](https://github.com/DeterminateSystems/nix-installer).

## Usage

```sh
dagger call -m github.com/tsirysndr/daggerverse/nix setup-nix shell
```

## Example

```sh
dagger call -m github.com/tsirysndr/daggerverse/nix setup-nix shell
```

## Arguments

| Name | Description                                                    | Required |
| ---- | -------------------------------------------------------------- | -------- |
| src  | Optional context directory. | false    |
