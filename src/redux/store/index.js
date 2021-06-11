import { configureStore } from '@reduxjs/toolkit'
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { authreducer as auth } from "../reducers/authreducer";
import { addersreducer as adders } from "../reducers/addersreducer";
import { formulasreducer as formulas } from "../reducers/formulasreducer";
import { batteryreducer as battery } from "../reducers/batteryreducer";
import { calculatorreducer as calculator } from "../reducers/calculatorreducer";
import { cashreducer as cash } from "../reducers/cashreducer";
import { feereducer as fee } from "../reducers/feereducer";
import { guidereducer as guide } from "../reducers/guidereducer";
import { modulesreducer as modules } from "../reducers/modulesreducer";
import { selfgenreducer as selfgen } from "../reducers/selfgenreducer";
import { usersreducer as users } from "../reducers/usersreducer";
import { layoutreducer as layout } from "../reducers/layoutreducer";
import { authenticatereducer as authenticated} from "../reducers/authenticatereducer";
const reducers = combineReducers({
    auth,
    adders,
    formulas,
    battery,
    calculator,
    cash,
    fee,
    guide,
    modules,
    selfgen,
    users,
    layout,
    authenticated
  });
  
  let middleware = [thunk];
  
  export const store = createStore(reducers, {}, applyMiddleware(...middleware));