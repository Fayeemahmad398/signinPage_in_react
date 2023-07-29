import * as alltypes from "../actions/actionsTypes";

const INITIAL_STATE = {
  loading: false,
  data: {},
  error: "",
};

const ReducerToSaveInfo = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case alltypes.FETCH_POST_REQUEST:
      return {
        ...state,
        loading: true,
        error: "",
        data: {},
      };

    case alltypes.FETCH_POST_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: "",
      };
    case alltypes.FETCH_POST_FAILURE:
      return { ...state, loading: false, error: action.payload, data: {} };
    default:
      return state;
  }
};

export default ReducerToSaveInfo;
