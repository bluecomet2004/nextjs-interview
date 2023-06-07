import axios from "axios";
import { ThunkDispatch } from "redux-thunk";

export const SET_DATA_REQUEST = '[RESULTS] SET REQUEST';
export const SET_DATA_SUCCESS = '[RESULTS] SET SUCCESS';
export const SET_DATA_FAILED = '[RESULTS] SET FAILED';

export const generateResult = (count: any) => (dispatch: ThunkDispatch<{},{},any>): Promise<any> => {
  dispatch({type: SET_DATA_REQUEST});

  return axios.get(`https://randomuser.me/api?results=${count}`)
    .then(({data}) => {
      dispatch({
        type: SET_DATA_SUCCESS,
        payload: data
      });

      return data;
    })
    .catch(error => {
      dispatch({
        type: SET_DATA_FAILED,
        error
      });

      return error;
    });
}