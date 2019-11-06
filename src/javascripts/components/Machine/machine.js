import $ from 'jquery';
import smash from '../../helpers/data/smash';
import utilities from '../../helpers/utilities';

import snack from '../Snack/snack';
import './machine.scss';
import snackData from '../../helpers/data/snackData';

const buySnack = (e) => {
  e.stopImmediatePropagation();
  const snackId = e.target.id.split('buy-')[1];
  snackData.buySnack(snackId)
    // eslint-disable-next-line no-use-before-define
    .then(() => buildTheMachine())
    .catch((error) => console.error(error));
};

const buildTheMachine = () => {
  smash.getCompleteMachine()
    .then((positions) => {
      // build a dom string - done
      // h2 that says VENDING MACHINE - done
      // div with an id = snack-section, class=d-flex flex-wrap - done
      // forEach over positions - call a component called snacks - done
      // snacks component should return a bootstrap card - done
      // printToDom('stock', domString) - done
      let domString = '<h2>VENDING MACHINE</h2>';
      domString += '<div id="snack-section" class="d-flex flex-wrap">';
      positions.forEach((position) => {
        domString += snack.makeASnack(position);
      });
      domString += '</div>';
      utilities.printToDom('machine', domString);
      $('#machine').on('click', '.buy-snack', buySnack);
    })
    .catch((error) => console.error(error));
};

export default { buildTheMachine };
