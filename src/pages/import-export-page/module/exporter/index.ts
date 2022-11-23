import { File } from '@awesome-cordova-plugins/file';
import language from '../../../../language';
import { generateExportFileID } from '../../../../utils/generator';

export async function exportDataFile(data: string) {
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
  return await File.checkDir(File.externalRootDirectory, '/Download/URLIST/exportData')
    .then((res) => {
      return true;
    })
    .catch((e) => {
      return false;
    });
}

async function createDir() {
  return await File.createDir(File.externalRootDirectory, '/Download/URLIST/exportData', true)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
}

async function writeFile(data: string) {
    const id = generateExportFileID();
    return await File.writeFile(File.externalRootDirectory + '/Download/URLIST/exportData', 'exportData_'+id+".json", data)
      .then(() => {
        return id;
      })
      .catch(() => {
        alert(language.exportError_file)
      });
  }