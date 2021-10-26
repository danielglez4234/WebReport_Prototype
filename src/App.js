import React, { Component } from 'react';
import { Provider } from './components/context';
import '../node_modules/react-vis/dist/style.css';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

import axios                        from 'axios';

import Container from './components/Container';
import BasicDateTimePicker from './components/DatePicker';
import SeachButton from './components/SeachButton';
import Amcharts from './components/Amcharts';

const options = {
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': 'http://localhost:3001/',
    'Content-Type': 'application/json'
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      hola: "hola",
      data_components: []

    };
  }

  componentDidMount(){

    // axios.get("http://localhost:8080/WebReport/rest/webreport/components", { headers: options	})
    //   .then(response => {
    //
    //     this.setState({ //save the current state of the data
    //       data_components: response.data,
    //       loading: false
    //     });
    //
    //     console.log("subscription was reset successfully");
    //     console.log("data: " + this.state.data_components);
    //   })
    //   .catch(error => {
    //     console.log('Error fetching and parsing data on the ORION context brocker');
    //   });
    }

  render() {
    return (
          <Provider value={{
            nada: "nada",
          }}>
            <BrowserRouter>
                <Switch>

                  <Route exact path="/" render={() => <Container />} />
                  <Route exact path="/date" render={() => <BasicDateTimePicker />} />
                  <Route exact path="/search" render={() => <SeachButton />} />
                  <Route exact path="/amcharts" render={() => <Amcharts />} />ColorPicker

                </Switch>
            </BrowserRouter>
          </Provider>
    );
  }
}

export default App;
