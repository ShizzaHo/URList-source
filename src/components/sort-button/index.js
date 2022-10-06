import React from 'react';
import ServiceModule from '../../service';
import { IonIcon, IonButton, useIonActionSheet } from '@ionic/react';
import { funnel } from 'ionicons/icons';

import { Sort } from '../../utils/sort';

function SortButton({ setSortMethod }) {
  const Service = new ServiceModule();
  const [present, dismiss] = useIonActionSheet();

  return (
    <IonButton
      color='light'
      onClick={() => {
        present({
          buttons: [
            {
              text: Service.language.sort_lastСhange,
              handler: () => {
                setSortMethod(Sort.lastСhange);
                localStorage.setItem('URLIST_SORTMETHOD', Sort.lastСhange);
              },
            },
            {
              text: Service.language.sort_alphabetically1,
              handler: () => {
                setSortMethod(Sort.alphabetically1);
                localStorage.setItem('URLIST_SORTMETHOD', Sort.alphabetically1);
              },
            },
            {
              text: Service.language.sort_alphabetically2,
              handler: () => {
                setSortMethod(Sort.alphabetically2);
                localStorage.setItem('URLIST_SORTMETHOD', Sort.alphabetically2);
              },
            },
          ],
          header: Service.language.sort,
        });
      }}
    >
      <IonIcon slot='icon-only' icon={funnel} />
    </IonButton>
  );
}

SortButton.defaultProps = {
  setSortMethod: () => {},
};

export default SortButton;
