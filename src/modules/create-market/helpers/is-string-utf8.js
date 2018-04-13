export const isStringUtf8 = (stringValue) => {
  if (typeof stringValue === 'number') return true
  const buf = Buffer.from(stringValue)
  console.log('buf', buf.toString(), 'buf')
  return Buffer.compare(Buffer.from(buf.toString(), 'utf8'), buf) === 0
}
