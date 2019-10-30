import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

import monkeyBut from './googlebutton.png';
import utilities from '../../helpers/utilities';

const signMeIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
};

const loginButton = () => {
  const domString = `<button id="google-auth" class="btn btn-danger">
    <img src=${monkeyBut} />
  </button>`;

  utilities.printToDom('auth', domString);
  $('#google-auth').click(signMeIn);
};

export default { loginButton };
