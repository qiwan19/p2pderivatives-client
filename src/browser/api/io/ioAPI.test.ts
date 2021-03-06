import IOAPI from '.'

const api = new IOAPI()

describe('ioAPI-tests', () => {
  test('can-read-outcome-file', async () => {
    const outcomeList = await api.readOutcomes('./src/browser/api/io/test.csv')
    expect(outcomeList.length).toBe(3)
    expect(outcomeList[0].message).toBe('3.000')
    expect(outcomeList[0].local).toBe(0.5)
  })
})
