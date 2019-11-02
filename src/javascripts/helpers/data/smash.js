import machineData from './machineData';
import positionData from './positionData';

const getCompleteMachine = () => new Promise((resolve, reject) => {
  //  1. getMachines - returns first machine (hard coding) - DONE
// 2. use MachineId to get all positions for that machine
// 3.  use MachineId to get all snack positions
// 4.  use uid of snackPositions/positions to get available snacks for that machine
// 5.  SMASH EM' - return an array of positions (in order A1, A2, A3, B1 ....) .
// so positions should have position.snack if a snack exists at that position
  machineData.getMachine()
    .then((singleMachine) => positionData.getAllPositionsByMachineId(singleMachine.id))
    .then((positions) => resolve(positions))
    .catch((error) => reject(error));
});

export default { getCompleteMachine };
