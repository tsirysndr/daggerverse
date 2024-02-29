# Module: Nix

![dagger-min-version](https://img.shields.io/badge/dagger%20version-v0.10.0-blue?color=3D66FF)

Returns a Container with Nix installed using [DeterminateSystems/nix-installer](https://github.com/DeterminateSystems/nix-installer).

## Usage

```sh
dagger call -m github.com/tsirysndr/daggerverse/nix setup-nix terminal
```

## Example

```sh
dagger call -m github.com/tsirysndr/daggerverse/nix setup-nix terminal
```

## Arguments

| Name | Description                                                    | Required |
| ---- | -------------------------------------------------------------- | -------- |
| src  | Optional context directory. | false    |
