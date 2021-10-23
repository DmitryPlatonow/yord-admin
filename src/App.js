import * as React from "react";
import {PlaceCreate, PlaceList} from "./places";
import { Admin, Resource } from "react-admin";
import {
  FirebaseDataProvider,
  FirebaseAuthProvider
} from "react-admin-firebase";
import CustomLoginPage from './CustomLoginPage';
import { LoadPictureModule } from './LoadPictureModule'

import { firebaseConfig as config } from './FIREBASE_CONFIG';

const options = {
  logging: true,
  //rootRef: '/places'
}
const dataProvider = FirebaseDataProvider(config, options);
const authProvider = FirebaseAuthProvider(config, options);


class App extends React.Component {
  render() {
    return (
        <>
          <Admin
            loginPage={CustomLoginPage}
            dataProvider={dataProvider}
            authProvider={authProvider}
          >
            <Resource
              name="places-dev-new"
              list={PlaceList}
              create={PlaceCreate}
            />

          </Admin>
          <LoadPictureModule />
        </>
    );
  }
}

export default App;
