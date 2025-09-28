import fs from 'fs';
import https from 'https';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const username = 'bjornleonhenry';
const destDir = path.join(__dirname, '..', 'public', 'images');
const destPath = path.join(destDir, `${username}.png`);
const maxRedirects = 5;

function fetchUrl(url, dest, redirectsLeft) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const { statusCode, headers } = res;
      if (statusCode >= 200 && statusCode < 300) {
        // successful response, write to file
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
        file.on('error', (err) => {
          fs.unlink(dest, () => {});
          reject(err);
        });
      } else if (statusCode >= 300 && statusCode < 400 && headers.location) {
        // follow redirect
        if (redirectsLeft <= 0) {
          reject(new Error('Too many redirects'));
          res.resume();
          return;
        }
        const nextUrl = headers.location.startsWith('http')
          ? headers.location
          : new URL(headers.location, url).toString();
        res.resume();
        fetchUrl(nextUrl, dest, redirectsLeft - 1).then(resolve).catch(reject);
      } else {
        reject(new Error(`Request Failed. Status Code: ${statusCode}`));
        res.resume();
      }
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function fetchAvatar() {
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  const url = `https://github.com/${username}.png`;
  console.log(`Downloading ${url} -> ${destPath}`);

  await fetchUrl(url, destPath, maxRedirects);
  console.log('Download complete');
}

fetchAvatar().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
