import document from 'document';
import { switchPage } from '../navigation';

let $buttonHomepage2 = null;
let $buttonReplace = null;

function doSomething() {
  console.log('hallo index');
}

export function destroy() {}

export function init() {
  console.log('init index page');
  $buttonHomepage2 = document.getElementById('homepage2-button');

  setTimeout(() => {
    switchPage('homepage2', true);
  }, 2000);
  $buttonHomepage2.onclick = () => {
    switchPage('homepage2', true);
  };

  doSomething();
}
