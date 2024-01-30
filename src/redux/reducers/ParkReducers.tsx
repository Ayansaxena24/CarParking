// reducers.ts
import {
  SET_PARKING_SPACES,
  VACATE_PARKING_SPACE,
  ALLOCATE_PARKING_SPACE,
  CLOSE_EXIT_MODAL,
  OPEN_EXIT_MODAL,
  SAVE_STATE,
  SET_PARKING_SPACES_ARRAY,
} from "../constants/ParkConstants";

interface ParkingSpace {
  id: number;
  occupied: boolean;
  registrationNumber?: string;
  inTime?: string;
}

interface ExitModalState {
  isOpen: boolean;
  registrationNumber: string;
  chargeAmount: number;
}

const initialExitModalState: ExitModalState = {
  isOpen: false,
  registrationNumber: "",
  chargeAmount: 0,
};

interface ParkingState {
  parkingSpaces: ParkingSpace[];
}

const initialState: ParkingState = {
  parkingSpaces: [],
};

export const findAvailableSpace = (parkingSpaces: ParkingSpace[]): number | null => {
  const availableSpace = parkingSpaces.find((space) => !space.occupied);

  if (!availableSpace) {
    return null;
  }

  // Shuffle the array randomly
  const shuffledSpaces = [...parkingSpaces].sort(() => Math.random() - 0.5);

  // Return the first space from the shuffled array
  return shuffledSpaces.length > 0 ? shuffledSpaces[0].id : null;
};

export const exitModalReducer = (
  state = initialExitModalState,
  action: any
): ExitModalState => {
  switch (action.type) {
    case OPEN_EXIT_MODAL:
      return {
        isOpen: true,
        registrationNumber: action.payload.registrationNumber,
        chargeAmount: action.payload.chargeAmount,
      };
    case CLOSE_EXIT_MODAL:
      return initialExitModalState;
    default:
      return state;
  }
};

const saveState = (state: ParkingState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("parkingAppState", serializedState);
  } catch (error) {
    console.error("Error saving state to localStorage:", error);
  }
};

const parkingReducer = (state = initialState, action: any): ParkingState => {
  switch (action.type) {
    case SET_PARKING_SPACES:
  let newParkingSpaces;
  console.log('action.payload.spacesArray==>>', action.payload.spacesArray);

  if (action.payload.spacesArray) {
    newParkingSpaces = action.payload.spacesArray;
  } else {
    newParkingSpaces = Array.from(Array(action.payload.spaces).keys()).map(
      (id) => ({ id, occupied: false })
    );
  }

  return {
    ...state,
    parkingSpaces: newParkingSpaces,
  };


    case SET_PARKING_SPACES_ARRAY: // New case for handling the array
      return {
        ...state,
        parkingSpaces: action.payload,
      };

    case ALLOCATE_PARKING_SPACE:
      const { spaceId, registrationNumber, inTime } = action.payload;
      const found = state.parkingSpaces.find((space) => {
        return space.registrationNumber === registrationNumber
      });

      if (found) {
        alert("Car with this registration number is already parked");
        return state;
      }
      
      if (
        state.parkingSpaces[spaceId] &&
        !state.parkingSpaces[spaceId].occupied
        ) {
          return {
            ...state,
            parkingSpaces: state.parkingSpaces.map((space) =>
            space.id === spaceId
            ? {
              ...space,
              occupied: true,
              registrationNumber,
              inTime,
            }
            : space
            ),
          };
        } else {
          alert("Selected parking space is not available");
          return state;
        }

    // case ALLOCATE_PARKING_SPACE:
    //   const availableSpaceId = findAvailableSpace(state.parkingSpaces);

    //   if (availableSpaceId !== null) {
    //     return {
    //       ...state,
    //       parkingSpaces: state.parkingSpaces.map((space) =>
    //         space.id === availableSpaceId
    //           ? {
    //               ...space,
    //               occupied: true,
    //               spaceId: availableSpaceId,
    //               registrationNumber: action.payload.registrationNumber,
    //               inTime: action.payload.inTime,
    //             }
    //           : space
    //       ),
    //     };
    //   } else {
    //     alert('No available parking space');
    //     return state;
    //   }

    case VACATE_PARKING_SPACE:
      const spaceIdToVacate = action.payload;

      if (
        state.parkingSpaces[spaceIdToVacate] &&
        state.parkingSpaces[spaceIdToVacate].occupied
      ) {
        let newState = {
          ...state,
          parkingSpaces: state.parkingSpaces.map((space) =>
            space.id === spaceIdToVacate
              ? {
                  ...space,
                  occupied: false,
                  registrationNumber: undefined,
                  inTime: undefined,
                }
              : space
          ),
        };
        saveState(newState);

        return newState;
      } else {
        alert("Selected parking space is not available");
        return state;
      }

    case SAVE_STATE:
      saveState(state);
      return state;

    default:
      return state;
  }
};

export default parkingReducer;
