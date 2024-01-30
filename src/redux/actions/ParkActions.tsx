// actions.ts
import { ALLOCATE_PARKING_SPACE ,SET_PARKING_SPACES, VACATE_PARKING_SPACE, OPEN_EXIT_MODAL, CLOSE_EXIT_MODAL, SAVE_STATE, SET_PARKING_SPACES_ARRAY } from '../constants/ParkConstants';

interface ParkingSpace {
  id: number;
  occupied: boolean;
  registrationNumber?: string;
  inTime?: Date;
}

export const setParkingSpaces = (spaces: number, spacesArray?: ParkingSpace[]) => ({
  type: SET_PARKING_SPACES,
  payload: { spaces, spacesArray }, // Modified payload to include spacesArray
});

export const setParkingSpacesArray = (spacesArray: ParkingSpace[]) => ({
  type: SET_PARKING_SPACES_ARRAY,
  payload: spacesArray,
});

export const allocateParkingSpace = (spaceId : number, registrationNumber: string, inTime: string) => ({
  type: ALLOCATE_PARKING_SPACE,
  payload: { spaceId, registrationNumber, inTime },
});

export const vacateParkingSpace = (parkingSpaceId: number) => ({
  type: VACATE_PARKING_SPACE,
  payload: parkingSpaceId,
});

export const openExitModal = (registrationNumber: string, chargeAmount: number) => ({
  type: OPEN_EXIT_MODAL,
  payload: { registrationNumber, chargeAmount },
});

export const closeExitModal = () => ({
  type: CLOSE_EXIT_MODAL,
});

export const saveState = (spaces : number) => ({
  type: SAVE_STATE,
  payload: spaces,
});





// interface SetParkingSpacesAction {
//   type: any;
//   payload: number;
// }

// interface AddCarAction {
//   type: any;
//   payload: {
//     parkingSpaceId: number;
//     registrationNumber: string;
//     inTime: string;
//   };
// }

// interface VacateParkingSpaceAction {
//   type: any;
//   payload: number;
// }

// export type ParkingActionTypes = SetParkingSpacesAction | AddCarAction | VacateParkingSpaceAction;

