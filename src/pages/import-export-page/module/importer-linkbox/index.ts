import { Chooser } from '@awesome-cordova-plugins/chooser';
import { Buffer } from 'buffer';
import { Toast } from '@awesome-cordova-plugins/toast';
import language from '../../../../language';
import config from '../../../../config';
import { generateCategoryID } from '../../../../utils/generator';
import { Ilink, Iany } from '../../../../interfaces/index';

export async function importLinkBoxDataFile() {
  const linkboxJson = await getFile();
  Toast.show(language.import_linkBox_converting, '5000', 'center').subscribe(
    toast => {
      console.log(toast);
    }
  );
  return await linkboxToURList(await linkboxJson);
}

async function getFile() {
  return await Chooser.getFile()
    .then((file: any) => {
      return JSON.stringify(
        JSON.parse(Buffer.from(file.dataURI.split(',')[1], 'base64').toString())
      );
    })
    .catch((error) => {
      return false;
    });
}

async function linkboxToURList(data: any) {
  const linkbox = JSON.parse(data);
  let finalData: any;
  
  finalData = {
    meta: { name: 'URLIST', version: config.thisVersion },
    categories: Array<Iany>,
    links: Array<Iany>,
  };

  linkbox.data.folders.map((item: any, index: number) => {
    finalData = {
      ...finalData,
      categories: [
        ...finalData.categories,
        {
          title: item.name,
          id: 'category_'+item.id,
        },
      ],
    };
  });

  linkbox.data.links.map((item: any, index: number) => {
    finalData = {
      ...finalData,
      links: [
        ...finalData.links,
        {
          title: item.name,
          url: item.url,
          parentID: 'category_' + item.folder,
          id: 'link_' + generateCategoryID(),
        },
      ],
    };
  });

  return await JSON.stringify(finalData);
}
