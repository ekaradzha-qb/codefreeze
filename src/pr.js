const core = require('@actions/core')
const github = require('@actions/github')
const Config = require('./config')
const ref = process.env.GITHUB_REF

const octokit = github.getOctokit(Config.Token)

async function listAllPRs(owner, repo) {
  let allPRs = []

  try {
    let page = 1

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const prs = await octokit.rest.pulls.list({
        repo,
        owner,
        per_page: 200, //page of 200 enough?
        page
      })

      if (prs.status >= 400) {
        throw new Error('Failed to list pr')
      }

      if (prs.data.length === 0) break

      allPRs = allPRs.concat(prs.data)
      page++
    }

    return allPRs
  } catch (error) {
    console.error('Error fetching PRs:', error)
    return []
  }
}

// export async function getAllPRsByName(org: string, prName: any) {
//   const matchingPRs = []
//   try {
//     const prs = await listAllPRs(org, Config.GH_REPO)
//     const matchingPRsInRepo = prs.filter(pr => pr.title.includes(prName))
//     console.log('Found matching PRs in repo:', matchingPRsInRepo.length)

//     matchingPRs.push(...matchingPRsInRepo)
//   } catch (error) {
//     console.error('Error fetching PRs by name:', error)
//     return []
//   }

//   return matchingPRs
// }

// export async function findPullRequest(prTitle) {
//   const { data: pullRequests } = await octokit.rest.pulls.list({
//     owner,
//     repo,
//     state: 'open'
//   })

//   return pullRequests.find(
//     (pr) =>
//       pr.head.ref === 'main' && pr.title === prTitle
//   )
// }

module.exports = {
  listAllPRs
}
