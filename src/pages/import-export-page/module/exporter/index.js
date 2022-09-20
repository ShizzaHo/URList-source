import { File } from '@awesome-cordova-plugins/file';
import language from '../../../../language';
import { generateExportFileID } from '../../../../utils/generator';

export async function exportDataFile(data) {
  if (await checkDir()) {
    const id = await writeFile(data);
    alert(language.export_complete.replace("%PATH%", "/android/data/ru.shizzaho.urlist/files/exportData/exportData_"+await id+".json"));
  } else {
    if (await createDir()) {
        exportDataFile(data);
    } else {
        alert(language.exportError_dir)
    }
  }
}

async function checkDir() {
  return await File.checkDir(File.externalDataDirectory, 'exportData')
    .then((res) => {
      return true;
    })
    .catch((e) => {
      return false;
    });
}

async function createDir() {
  return await File.createDir(File.externalDataDirectory, 'exportData')
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

async function writeFile(data) {
    const id = generateExportFileID();
    return await File.writeFile(File.externalDataDirectory + 'exportData', 'exportData_'+id+".json", data)
      .then(() => {
        return id;
      })
      .catch(() => {
        alert(language.exportError_file)
      });
  }