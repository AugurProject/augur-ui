module.exports = {
  launch: {
    dumpio: true,
    headless: process.env.HEADLESS !== 'false',
    serial: true,
    args: ['--disable-gpu', '--disable-software-rasterizer', '--headless', '--mute-audio', '--hide-scrollbars']
  },
}
