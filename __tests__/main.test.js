/**
 * Unit tests for the action's main functionality, src/main.js
 */
const core = require('@actions/core')
const main = require('../src/main')
const { listAllPRs } = require('../src/pr')
const Config = require('../src/config')

describe('action', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  it('fails if no input is provided', async () => {
    const prResp = await listAllPRs(Config.Owner, Config.Repo)
    expect(prResp.length).toBeGreaterThan(0)
  })
})
