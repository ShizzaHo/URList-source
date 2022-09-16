import React from 'react';

import { IonIcon, IonButton, useIonActionSheet } from '@ionic/react';
import { funnel } from 'ionicons/icons';

import { Sort } from '../../utils/sort';
import language from '../../language';

function SortButton({setSortMethod}) {
  const [present, dismiss] = useIonActionSheet();

  return (
    <IonButton
      onClick={() => {
        present({
          buttons: [
            {
              text: language.sort_lastСhange,
              handler: () => {
                setSortMethod(Sort.lastСhange);
                localStorage.setItem('URLIST_SORTMETHOD', Sort.lastСhange);
              },
            },
            {
              text: language.sort_alphabetically1,
              handler: () => {
                setSortMethod(Sort.alphabetically1);
                localStorage.setItem('URLIST_SORTMETHOD', Sort.alphabetically1);
              },
            },
            {
              text: language.sort_alphabetically2,
              handler: () => {
                setSortMethod(Sort.alphabetically2);
                localStorage.setItem('URLIST_SORTMETHOD', Sort.alphabetically2);
              },
            },
          ],
          header: language.sort,
        });
      }}
    >
      <IonIcon slot='icon-only' icon={funnel} />
    </IonButton>
  );
}

SortButton.defaultProps = {
  setSortMethod: ()=>{}
}

export default SortButton;
