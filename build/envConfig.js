const chalk = require('chalk')

const argv = JSON.parse(process.env.npm_config_argv).original || process.argv
// console.log(argv); // ['run'，'serve'，'--dev']

const HOST_ENV = argv[argv.length - 1] ? argv[argv.length - 1].replace(/[^a-z]+/ig,"") : ''
// console.log(HOST_ENV) // dev

console.log(chalk.green('当前环境：' + HOST_ENV))

module.exports = {
    HOST_ENV // 环境 dev
}


