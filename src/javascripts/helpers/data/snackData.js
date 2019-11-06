import axios from 'axios';
import apiKeys from '../apiKeys.json';

const baseUrl = apiKeys.firebaseKeys.databaseURL;

const getSnacksByUid = (uid) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/snacks.json?orderBy="uid"&equalTo="${uid}"`)
    .then((response) => {
      const demSnacks = response.data;
      const snacks = [];
      Object.keys(demSnacks).forEach((fbId) => {
        demSnacks[fbId].id = fbId;
        snacks.push(demSnacks[fbId]);
      });
      resolve(snacks);
    })
    .catch((error) => reject(error));
});

const addNewSnack = (newSnack) => axios.post(`${baseUrl}/snacks.json`, newSnack);

const updateSnack = (snackId, updatedSnack) => axios.put(`${baseUrl}/snacks/${snackId}.json`, updatedSnack);

const buySnack = (snackId) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/snacks/${snackId}.json`)
    .then((result) => {
      const snackObject = result.data;
      snackObject.currentStocked = snackObject.currentStocked === 0 ? 0 : snackObject.currentStocked -= 1;
      updateSnack(snackId, snackObject);
      resolve();
    })
    .catch((error) => reject(error));
});

const restock = (snackId, restockNum) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/snacks/${snackId}.json`)
    .then((result) => {
      const snackObject = result.data;
      snackObject.currentStocked += restockNum;
      snackObject.lifetimeNum += restockNum;
      updateSnack(snackId, snackObject);
      resolve();
    })
    .catch((error) => reject(error));
});

export default {
  getSnacksByUid,
  addNewSnack,
  restock,
  buySnack,
};
