import * as Actions from './results.action';

const initialState = {
  isLoading: false,
  payload: null,
  error: null
}

const results = (state = initialState, action: any) => {
  switch(action.type) {
    case Actions.SET_DATA_REQUEST: {
      return {
        ...state,
        isLoading: true
      }
    }
    case Actions.SET_DATA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        payload: action.payload
      }
    }
    case Actions.SET_DATA_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: action.error
      }
    }
    default: {
      return state;
    }
  }
}

export default results;