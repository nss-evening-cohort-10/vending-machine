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
            const newPositions = [];
            positions.forEach((position) => {
              const newP = { ...position };
              const getSnackPosition = snackPositions.find((x) => x.positionId === newP.id);
              if (getSnackPosition) {
                const snack = snacks.find((x) => x.id === getSnackPosition.snackId);
                newP.snack = snack;
              } else {
                newP.snack = {};
              }
              newPositions.push(newP);
            });
            resolve(newPositions);
          });
        });
    })
    .catch((error) => reject(error));
});

const getSnacksWithPositions = (uid) => new Promise((resolve, reject) => {
  machineData.getMachine()
    .then((singleMachine) => positionData.getAllPositionsByMachineId(singleMachine.id))
    .then((positions) => {
      snackPositionData.getAllSnackPositionsByMachineId(positions[0].machineId)
        .then((snackPositions) => {
          snackData.getSnacksByUid(uid).then((snacks) => {
            const newSnacks = [];
            snacks.forEach((snack) => {
              const newSnack = { ...snack };
              const getSnackPosition = snackPositions.find((x) => x.snackId === newSnack.id);
              if (getSnackPosition) {
                const getPosition = positions.find((x) => x.id === getSnackPosition.positionId);
                newSnack.position = getPosition;
              } else {
                newSnack.position = {};
              }
              newSnacks.push(newSnack);
            });
            resolve(newSnacks);
          });
        });
    })
    .catch((error) => reject(error));
});

export default { getCompleteMachine, getSnacksWithPositions };
