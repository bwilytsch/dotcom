const imagemin = require('imagemin');
const webp = require('imagemin-webp');
const jpegTran = require('imagemin-jpegtran');

const OUTPUT_DIR = './public/production/';
const PNG = './img/*.png';
const JPG_PROJECTS = './assets/projects/*.jpg';
const JPG_EXPERIMENTS = './assets/experiments/*.jpg';

const exportFromToWebp = async (input, output) => {
  const webpFiles = await imagemin(input, {
    destination: output + 'webp/',
    plugins: [
      webp({
        alphaQuality: 0,
        quality: 75,
      }),
    ],
  });
  return webpFiles;
};

const exportFromToJpg = async (input, output) => {
  const jpegFiles = await imagemin(input, {
    destination: output + 'jpg/',
    plugins: [jpegTran()],
  });
  return jpegFiles;
};

// Webp
(async () => {
  const projects = exportFromToWebp([JPG_PROJECTS], OUTPUT_DIR + 'projects/');

  const experiments = exportFromToWebp(
    [JPG_EXPERIMENTS],
    OUTPUT_DIR + 'experiments/',
  );

  console.log('Finished exports: Webp');

  const p_jpg = exportFromToJpg([JPG_PROJECTS], OUTPUT_DIR + 'projects/');

  const e_jpg = exportFromToJpg([JPG_EXPERIMENTS], OUTPUT_DIR + 'experiments/');

  console.log('Finished exports: Jpeg');

  console.log('Exported all files.');
})();
