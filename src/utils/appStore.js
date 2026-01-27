import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionsSlice from "./connectionSlice";
import requestReducer from "./requestSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionsSlice,
    requests: requestReducer,
  },
});

export default appStore;

/* redux
1) install RTK.
2) make appStore --> configureStore
3)

Slice
addTask: (state, action) => {
  state.tasks.push(action.payload);
}

Dispatch
dispatch(addTask("Learn Redux Toolkit"));

! basically payload is used to catch the data that we send during the dispatch action call and send something. and that data is received in the action.payload as we can see that the data is pushed in the state with action.payload


*/
