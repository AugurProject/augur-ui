module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS !== 'false',
    serial: true,
    executablePath: 'google-chrome-unstable',
    args: ['--disable-gpu', '--disable-software-rasterizer', '--headless', '--mute-audio', '--hide-scrollbars', '--remote-debugging-port=9222']
  },
}
