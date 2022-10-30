import { Chooser } from '@awesome-cordova-plugins/chooser';
import { Buffer } from 'buffer';

export async function importTranslate() {
  return await getFile();
}

async function getFile() {
  return await Chooser.getFile()
    .then((file) => {
      console.log(Buffer.from(((file || {}).dataURI || "").split(",")[1], 'base64').toString());
      return JSON.stringify(
        JSON.parse(
          Buffer.from(((file || {}).dataURI || "").split(",")[1], 'base64').toString()
        )
      );
    })
    .catch((error) => {
      return false;
    });
}
