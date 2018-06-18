module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS !== 'false',
    disableGPU: true,
    serial: true,
    executablePath: 'chromium-browser'
  },
}
