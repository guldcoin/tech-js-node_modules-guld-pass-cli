#!/usr/bin/env node
const program = require('commander')
const pkg = require('./package.json')
const VERSION = pkg.version
const NAME = Object.keys(pkg.bin)[0]

const COMMANDS = {
  'config': ['Manage git config files the guld way.', {isDefault: true}],
  'env': ['Guld environment detection module.'],
  'git': ['Guld standardized Command Line Interface (CLI) for git.']
}

program
  .name('guld')
  .version(VERSION)
  .description('Guld decentralized internet CLI.')
  .option('-u, --user', 'The user name to set up.')
  .option('-r, --recipient', 'The recipient of a message or transaction.')
  .option('-f, --fingerprint', 'The PGP fingerprint to sign with.')
  // .option('-q, --quiet', '')

for (var cmd in COMMANDS) {
  var cmds = COMMANDS[cmd]
  var desc = cmds.shift()
  if (cmds.length > 0) {
    program.command(cmd, desc, ...cmds).description(desc)
  } else {
    program.command(cmd, desc).description(desc)
  }
}

program.parse(process.argv)

module.exports = program
