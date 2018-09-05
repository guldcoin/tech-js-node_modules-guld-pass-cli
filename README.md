# guld-pass-cli

[![source](https://img.shields.io/badge/source-bitbucket-blue.svg)](https://bitbucket.org/guld/tech-js-node_modules-guld-pass-cli) [![issues](https://img.shields.io/badge/issues-bitbucket-yellow.svg)](https://bitbucket.org/guld/tech-js-node_modules-guld-pass-cli/issues) [![documentation](https://img.shields.io/badge/docs-guld.tech-green.svg)](https://guld.tech/cli/guld-pass-cli.html)

[![node package manager](https://img.shields.io/npm/v/guld-pass-cli.svg)](https://www.npmjs.com/package/guld-pass-cli) [![travis-ci](https://travis-ci.org/guldcoin/tech-js-node_modules-guld-pass-cli.svg)](https://travis-ci.org/guldcoin/tech-js-node_modules-guld-pass-cli?branch=guld) [![lgtm](https://img.shields.io/lgtm/grade/javascript/b/guld/tech-js-node_modules-guld-pass-cli.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/b/guld/tech-js-node_modules-guld-pass-cli/context:javascript) [![david-dm](https://david-dm.org/guldcoin/tech-js-node_modules-guld-pass-cli/status.svg)](https://david-dm.org/guldcoin/tech-js-node_modules-guld-pass-cli) [![david-dm](https://david-dm.org/guldcoin/tech-js-node_modules-guld-pass-cli/dev-status.svg)](https://david-dm.org/guldcoin/tech-js-node_modules-guld-pass-cli?type=dev)

Encrypted password management comaptible with Standard Unix Password Store.

### Install

##### Node

```sh
npm i -g guld-pass-cli
```

### Usage

##### CLI

```sh
guld-pass --help

  Usage: guld-pass [options] [command]

  Encrypted password management comaptible with Standard Unix Password Store.

  Options:

    -V, --version                                 output the version number
    -u --user <name>                              The user name to run as.
    -h, --help                                    output usage information

  Commands:

    init [options] <gpg-id...>                    Initialize new password storage and use gpg-id for encryption. Selectively reencrypt existing passwords using new gpg-id.
    ls [subfolder]                                List passwords.
    find <pass-names...>                          List passwords that match pass-names.
    show [options] <pass-name>                    Show existing password and optionally put it on the clipboard.
    grep <search-string>                          Search for password files containing search-string when decrypted.
    insert [options] <pass-name>                  Insert new password. Reads from stdin by default.
    edit <pass-name>                              Insert a new password or edit an existing password using editor.
    generate [options] <pass-name> [pass-length]  Generate a new password of pass-length (or 25 if unspecified).
    rm [options] <pass-name>                      Remove existing password or directory, optionally forcefully.
    mv [options] <old-path> <new-path>            Renames or moves old-path to new-path, optionally forcefully, selectively reencrypting.
    cp [options] <old-path> <new-path>            Copies old-path to new-path, optionally forcefully, selectively reencrypting.

```

### License

MIT Copyright isysd
