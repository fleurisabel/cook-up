import document from 'document';
import { gettext } from 'i18n';

import {
  getStateItem,
  setStateCallback,
  removeStateCallback,
  setStateItem,
} from '../state';
import { getListData } from '../commands';
import { switchPage } from '../navigation';

let myList = null;

function draw() {
  const list = getStateItem('listData');

  myList.delegate = {
    getTileInfo: (index) => {
      return {
        type: 'my-pool',
        value: list[index],
        index: index,
      };
    },
    configureTile: (tile, info) => {
      console.log(`Item: ${info.index}`);
      if (info.type == 'my-pool') {
        tile.getElementById('text').text = `${gettext(info.value.soort)}`;
        let touch = tile.getElementById('touch');
        touch.onclick = function () {
          setStateItem('soortId', info.value.id);
          switchPage('timeristoegevoegd', true);
        };
      }
    },
  };

  // length must be set AFTER delegate
  myList.length = list.length;
}

export function destroy() {
  myList = null;
  removeStateCallback('homepage2', draw);
}

export function init() {
  myList = document.getElementById('myList');
  getListData();
  setStateCallback('homepage2', draw);
  draw();
}
