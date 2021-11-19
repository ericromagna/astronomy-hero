import React, { useState } from "react";
import Home from "./screens/home";

export default function index() {
  /*We can create a login page in the future, and save
    the page as a shared state in Redux.
    This is the reason that we don't pass <HomeNavigator />
    directly in the App.js*/

  // const [isLogged, setLogged] = useState(false);
  // const someReduxData = useSelector(state => {
  //     if (isLogged !== state.isLogged) {
  //       console.log(`Index: state:${JSON.stringify(state, null, 2)}`);
  //       setLogged(state.isLogged);
  //     }
  // });
  //return ( isLogged ? <HomeNavigator /> : <LoginNavigator />);
  //return(<Home />);
  return <Home />;
}
