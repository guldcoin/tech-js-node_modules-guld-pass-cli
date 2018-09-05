#!/usr/bin/env node
const program = require('commander')
const { spawn } = require('child_process')
const { show, insert, init } = require('guld-pass')
const { getFS } = require('guld-fs')
const clipboardy = require('clipboardy')
const home = require('user-home')
const path = require('path')
const getStdin = require('get-stdin')
const inquirer = require('inquirer')
const runCLI = require('guld-cli-run')
const thispkg = require(`${__dirname}/package.json`)
var fs

/* eslint-disable no-console */
program
  .name(thispkg.name.replace('-cli', ''))
  .version(thispkg.version)
  .description(thispkg.description)
  .option('-u --user <name>', 'The user name to run as.', (n) => {
    if (n) process.env.GULDNAME = global.GULDNAME = n
    return true
  })
program
  .command('init <gpg-id...>')
  .description(`Initialize new password storage and use gpg-id for encryption. Selectively reencrypt existing passwords using new gpg-id.`)
  .option('-p --path <subfolder>')
  .action((ids, options) => {
    init(undefined, ids, options.path)
  })
program
  .command('ls [subfolder]', undefined, {isDefault: true})
  .description(`List passwords.`)
  .action((subf) => {
    var args = ['ls']
    if (subf) args.push(subf)
    spawn('pass', args, {stdio: ['inherit', 'inherit', 'inherit']})
  })
program
  .command('find <pass-names...>')
  .description(`List passwords that match pass-names.`)
  .action((options) => {
    var args = ['find']
    if (options) args.push(options)
    spawn('pass', args, {stdio: ['inherit', 'inherit', 'inherit']})
  })
program
  .command('show <pass-name>')
  .description(`Show existing password and optionally put it on the clipboard.`)
  .option('-c --clip [=line-number]', 'If put on the clipboard, it will be cleared in 45 seconds.')
  .action(async (pname, options) => {
    var lineNum
    if (options.clip) {
      var tline = parseInt(options.clip)
      if (tline >= 0) lineNum = tline
    }
    var pass = await show(pname, lineNum)
    if (options.clip) {
      clipboardy.write(pass)
      console.log(`Copied ${pname} to clipboard.`)
    } else console.log(pass)
  })
program
  .command('grep <search-string>')
  .description(`Search for password files containing search-string when decrypted.`)
  .action((str) => {
    var args = ['grep']
    if (str) args.push(str)
    spawn('pass', args, {stdio: ['inherit', 'inherit', 'inherit']})
  })
program
  .command('insert <pass-name>')
  .description(`Insert new password. Reads from stdin by default.`)
  .option('-e --echo', 'Optionally, echo the password back to the console')
  .option('-m --multiline', 'Allow multi-line entries')
  .option('-f --force', 'Do not prompt before overwriting password.')
  .action(async (pname, options) => {
    fs = fs || await getFS()
    var stdin = await getStdin()
    if (stdin && stdin.length > 0 && pname) {
      if (options.force) {
        await insert(pname, stdin)
      } else {
        try {
          await fs.stat(path.join(home, '.password-store', pname))
          inquirer
            .prompt([
              {
                name: 'confirm',
                type: 'confirm',
                message: `Overwrite ${pname}?`
              }
            ]).then(async answers => {
              if (answers.confirm) {
                await insert(pname, stdin)
              } else process.exit(1)
            })
        } catch (e) {
          await insert(pname, stdin)
        }
      }
      if (options.echo) {
        console.log(stdin)
      } else console.log('Ok.')
    } else {
      // pass straight through to main CLI for interactive session
      var args = ['insert']
      Object.keys(options).forEach(o => {
        if (['echo', 'force', 'multiline'].indexOf(o) > -1 && options[o]) {
          args = args.concat([`--${o}`, options[o]])
        }
      })
      if (pname) args.push(pname)
      spawn('pass', args, {stdio: ['inherit', 'inherit', 'inherit']})
    }
  })
program
  .command('edit <pass-name>')
  .description(`Insert a new password or edit an existing password using editor.`)
  .action((str) => {
    var args = ['edit']
    if (str) args.push(str)
    spawn('pass', args, {stdio: ['inherit', 'inherit', 'inherit']})
  })
program
  .command('generate <pass-name> [pass-length]')
  .description(`Generate a new password of pass-length (or 25 if unspecified).`)
  .option('-c --clip [=line-number]', 'If put on the clipboard, it will be cleared in 45 seconds.')
  .option('-f --force', 'Do not prompt before overwriting password.')
  .option('-n --no-symbols', 'Optionally generate password with no symbols.')
  .option('-i --in-place', 'Update password in place, leaving other lines untouched.')
  .action((pname, plen = 25, options = {}) => {
    var args = ['generate', pname, plen]
    spawn('pass', args, {stdio: ['inherit', 'inherit', 'inherit']})
  })
program
  .command('rm <pass-name>')
  .description(`Remove existing password or directory, optionally forcefully.`)
  .option('-r --recursive', 'Remove password directory recursively.')
  .option('-f --force', 'Do not prompt before removing password.')
  .action((pname, options) => {
    var args = ['rm', pname]
    spawn('pass', args, {stdio: ['inherit', 'inherit', 'inherit']})
  })
program
  .command('mv <old-path> <new-path>')
  .description(`Renames or moves old-path to new-path, optionally forcefully, selectively reencrypting.`)
  .option('-f --force', 'Do not prompt before removing password.')
  .action((oldp, newp, options) => {
    var args = ['mv', oldp, newp]
    spawn('pass', args, {stdio: ['inherit', 'inherit', 'inherit']})
  })
program
  .command('cp <old-path> <new-path>')
  .description(`Copies old-path to new-path, optionally forcefully, selectively reencrypting.`)
  .option('-f --force', 'Do not prompt before removing password.')
  .action((oldp, newp, options) => {
    var args = ['cp', oldp, newp]
    spawn('pass', args, {stdio: ['inherit', 'inherit', 'inherit']})
  })
/* eslint-enable no-console */

// program
//  .command('ls [subfolder]')
//  .description(`List passwords.`)

runCLI.bind(program)(program.help, () => {
  program.parse(process.argv)

  if (program.args.length === 0) {
    spawn('pass', ['ls'], {stdio: ['inherit', 'inherit', 'inherit']})
  }
})
module.exports = program
