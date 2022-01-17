import document from 'document';
import { getLocationName } from '../commands';
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
        tile.getElementById(
          'text',
        ).text = `${info.value.categorie} ${info.index}`;
        let touch = tile.getElementById('touch');
        touch.onclick = function () {
          setStateItem('categoriesId', info.value.id);
          switchPage('categories');
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

  const button1 = document.getElementById('cirkel1');
  button1.onclick = () => {
    switchPage('categories', true);
  };
}
