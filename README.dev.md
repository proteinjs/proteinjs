# Instructions for workspace setup and use

## Pull all submodules

1. `git pull`
2. `git submodule update --init --recursive --remote`

## Add a submodule to this repo

1. `git submodule add -b main https://github.com/proteinjs/repository.git packages/repository`
2. Push the changes

## Change remote of repo

1. `git remote set-url origin https://github.com/proteinjs/some-repo.git`
2. (optional) Check remote `git remote -v`