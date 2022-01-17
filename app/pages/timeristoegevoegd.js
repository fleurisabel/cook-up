import document from 'document';
import { getStateItem } from '../state';
import { gettext } from 'i18n';

import { vibration } from "haptics";


function doSomething() {
  console.log(gettext('groene_asperges'));
  console.log(gettext('kruimige_aardappel'));
  console.log(gettext('vastkokende_aardappel'));
  console.log(gettext('bloemkool'));
}

export function destroy() {}

export function init() {
  const soort = getStateItem('soortId');
  const list = getStateItem('listData');
  doSomething();

  let item = null;
  list.forEach((i) => {
    if (i.id === soort) item = i;
  });

  const startingMinutes = parseInt(item.minuten, 10);

  let time = startingMinutes * 60;


  const countdownEl = document.getElementById('countdown');
  const titelGerecht = document.getElementById('gerecht');
  titelGerecht.text = gettext(item.soort);
  setInterval(updateCountdown, 1000);
  updateCountdown();


    function updateCountdown() {
    const minutes = Math.floor(time / 60);

    let seconds = time % 60;

    seconds = seconds < 10 ? '0' + seconds : seconds;

    countdownEl.text = `${minutes}:${seconds}`;
    time--;
    time = time < 0 ? 0 : time;
    if (time == 0) {
      countdownEl.text = 'ready!';
      vibration.start("bump");
    }
  }
}
