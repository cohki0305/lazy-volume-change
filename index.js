const ffmpeg = require('fluent-ffmpeg')
const fs = require('fs')
const path = require('path')
const argv = require('minimist')(process.argv.slice(2))

const dir = argv.d
const volume = argv.b || 20

const prepareOutpusDir = (dir) => {
  const dirPath = path.join(dir, 'outputs')
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath)
  }
}

const changeVolume = (file, volume) => {
  ffmpeg(path.join(dir, file))
    .audioFilters(`volume=${volume}dB`)
    .save(path.join(dir, 'outputs', file))
}

fs.readdir(dir, async (err, files) => {
  if (err) throw err
  const fileList = files.filter((file) => {
    extname = path.extname(file)
    if (extname == '.mp4') { return true }
  })
  await prepareOutpusDir(dir)
  fileList.forEach((file) => {
    changeVolume(file, volume)
  })
})


