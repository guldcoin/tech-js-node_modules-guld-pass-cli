# guld-cli

Universal wrapper for guld commands. Discovers `guld-*` commands and allows them to be called as `guld *` from the main script.

### Install

```
npm i -g guld-cli
```

### Usage


##### CLI

```
  Usage: guld [options] [command]

  Guld standardized Command Line Interface (CLI) for git.

  Options:

    -V, --version      output the version number
    -u, --user         The user name to set up.
    -r, --recipient    The recipient of a message or transaction.
    -f, --fingerprint  The PGP fingerprint to sign with.
    -h, --help         output usage information

  Commands:

    config             Manage git config files the guld way.
    env                Guld environment detection module.
    git                Guld standardized Command Line Interface (CLI) for git.
    help [cmd]         display help for [cmd]
```

