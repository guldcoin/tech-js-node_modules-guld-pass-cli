# guld-pass-cli

Encrypted password management comaptible with Standard Unix Password Store.

### Install

```
npm i -g guld-pass-cli
```

### Usage

##### CLI

```
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
