import $ from 'jquery';
import firebase from 'firebase/app';
import 'firebase/auth';

const authDiv = $('#auth');
const logoutButton = $('#navbar-button-logout');
const stockDiv = $('#stock');

const logoutEvent = () => {
  logoutButton.click((e) => {
    e.preventDefault();
    firebase.auth().signOut()
      .then(() => {
        authDiv.classList.add('hide');
        logoutButton.classList.add('hide');
        stockDiv.classList.add('hide');
      }).catch((err) => console.error('you still logged in', err));
  });
};

export default { logoutEvent };
