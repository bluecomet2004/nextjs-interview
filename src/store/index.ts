import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk';
import results from "./results.reducer";

const store = createStore(
  combineReducers({results}),
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;