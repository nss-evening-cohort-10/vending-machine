import machineData from './machineData';
import positionData from './positionData';
import snackPositionData from './snackPositionData';
import snackData from './snackData';

const getCompleteMachine = () => new Promise((resolve, reject) => {
  //  1. getMachines - returns first machine (hard coding) - DONE
// 2. use MachineId to get all positions for that machine - DONE
// 3.  use MachineId to get all snack positions - DONE
// 4.  use uid of snackPositions/positions to get available snacks for that machine - DONE
// 5.  SMASH EM' - return an array of positions (in order A1, A2, A3, B1 ....) .
// so positions should have position.snack if a snack exists at that position
  machineData.getMachine()
    .then((singleMachine) => positionData.getAllPositionsByMachineId(singleMachine.id))
    .then((positions) => {
      snackPositionData.getAllSnackPositionsByMachineId(positions[0].machineId)
        .then((snackPositions) => {
          snackData.getSnacksByUid(positions[0].uid).then((snacks) => {
            console.log('snackPositions', snackPositions);
            resolve(snacks);
          });
        });
    })
    .catch((error) => reject(error));
});

export default { getCompleteMachine };
