const github = require('@actions/github')
const core = require('@actions/core')

class Config {
  static Token = core.getInput('token')
  static Repo = github.context.repo.repo
  static Owner = github.context.repo.owner
  static Branch = core.getInput('branch')

  static {
    // Static initialization code
  }
}

module.exports = Config
