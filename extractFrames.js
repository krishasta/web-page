const fs = require('fs');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');

ffmpeg.setFfmpegPath(ffmpegPath);

const videoPath = 'E:\\New folder (2)\\20260405-0622-08.9979973.mp4';
const outputDir = path.join(__dirname, 'public', 'video_frames');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

console.log('Extracting frames from:', videoPath);

ffmpeg(videoPath)
  .outputOptions([
    '-vf fps=10', // 10 frames per second
    '-q:v 2'      // high quality
  ])
  .output(path.join(outputDir, 'frame_%04d.jpg'))
  .on('end', () => {
    console.log('Extraction finished.');
  })
  .on('error', (err) => {
    console.error('Error:', err);
  })
  .run();
