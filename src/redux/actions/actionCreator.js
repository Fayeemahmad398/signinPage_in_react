import * as alltypes from "./actionsTypes";

export const actionToFetchRequest = () => {
  return {
    type: alltypes.FETCH_POST_REQUEST,
  };
};

export const actionToFetchSuccess = (obj) => {
  return {
    type: alltypes.FETCH_POST_SUCCESS,
    payload: obj,
  };
};

export const actionToFetchFailure = (error) => {
  return {
    type: alltypes.FETCH_POST_FAILURE,
    payload: error,
  };
};
