import { CircleCI, Job } from "fluent_circleci";

export function generateYaml(): CircleCI {
  const circleci = new CircleCI();

  const base = new Job().machine({ image: "ubuntu-2004:2023.07.1" }).steps([
    "checkout",
    {
      run: "sudo apt-get update && sudo apt-get install -y curl unzip",
    },
    {
      run: `\
curl -fsSL https://deno.land/x/install/install.sh | sh
export DENO_INSTALL="$HOME/.deno"
export PATH="$DENO_INSTALL/bin:$PATH"`,
    },
    {
      run: "deno install -A -r https://cli.fluentci.io -n fluentci",
    },
    {
      run: `\
curl -L https://dl.dagger.io/dagger/install.sh | DAGGER_VERSION=0.10.0 sh
sudo mv bin/dagger /usr/local/bin
dagger version`,
    },
    {
      run: {
        name: "Run Dagger Pipelines",
        command: "fluentci run .",
      },
    },
  ]);

  circleci.jobs({ base }).workflow("dagger", ["base"]);

  return circleci;
}
