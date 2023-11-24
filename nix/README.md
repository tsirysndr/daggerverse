# Module: Nix

![dagger-min-version](https://img.shields.io/badge/dagger%20version-v0.9.3-yellow)

Returns a Container with Nix installed using [DeterminateSystems/nix-installer](https://github.com/DeterminateSystems/nix-installer).

## Usage

```sh
dagger shell -m github.com/tsirysndr/daggerverse/nix setup-nix
```

## Example

```sh
dagger shell -m github.com/tsirysndr/daggerverse/nix setup-nix
```

## Arguments

| Name | Description                                                    | Required |
| ---- | -------------------------------------------------------------- | -------- |
| src  | Optional context directory. Defaults to the current directory. | false    |
