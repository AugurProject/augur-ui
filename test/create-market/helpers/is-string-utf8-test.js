import { isStringUtf8 } from 'modules/create-market/helpers/is-string-utf8'

describe(`modules/create-market/helpers/is-string-utf8.js`, () => {

  it(`good string should be true`, () => {
    const value = 'this is valid, 指事字 eè we hope'
    const actual = isStringUtf8(value)
    assert.strictEqual(actual, true, `should be utf8 string`)
  })

  it(`good number should be true`, () => {
    const value = 100
    const actual = isStringUtf8(value)
    assert.strictEqual(actual, true, `numbers should be good`)
  })

  it(`invalid string should be false`, () => {
    const value = [128]
    const actual = isStringUtf8(value)

    assert.strictEqual(actual, false, `should be utf8 string`)
  })

  it(`emoji are good should be true`, () => {
    const value = '\uD83D\uDE00'
    const actual = isStringUtf8(value)

    assert.strictEqual(actual, true, `should be utf8 string`)
  })

  it(`weird characters that are good`, () => {
    const value = 'W̸̺̹͆̈́̂́̓̋̐̎̋̉̅͑͘̚̕h̶̡̼̭̯͙͙͉̦͉̜̕͜ą̵̹̯̮̬͖̩͛̈́͐͗̃͋̀͜͝͝͠ṱ̶̢̭͉̮̘̳̞̻̻̰̪̃ ̶̨̖̯̰̙̒͋̂̌̎͆͌̏͐̐̋i̷̡͍̝̖̫̘̯͚͎̻͂̂́͋̌͂̉̏̉̎̄́̕͝͝s̵͔̅ ̴̧̡̛̟͎̟͙̠̱̖̝̲͖͗̇̄͂̅̓͛͊͂̋̽̕ͅg̸͕̱͇̲͈̗͇̼͕̹͓̏̈́̄̆͐̔͠ơ̸̧̺͇̬̞̟̻̣̟͓͈̭̜̄̔̋̑͘͝͝͝i̸̢̧̦̠̖̟̥͉̣̬̤̼͎̒̋̿̑͛n̶̨̛̎͗͐̄̊͌̑̂̋̂͝g̸̛͓̲̫ ̸̛̹̘͚͈̹̲͗̒ͅo̵̢͍̰͉̤̝̣̒̽n̵̢̼͓̞̹̪͔̞̓?̸̧̞̰̗̘͉̀̄̀̇̉'
    const actual = isStringUtf8(value)

    assert.strictEqual(actual, true, `should be utf8 string`)
  })

})
