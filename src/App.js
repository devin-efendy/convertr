/** Class: App
 *  Store all the saved conversions into the state 'history'
 *  Render the ConvertrUI (the main UI) and the List of History (HistoryList)
 * */
import React from 'react';
import { Container, Button, Icon } from 'semantic-ui-react';

import ConverterUI from './components/ConverterUI';
import HistoryList from './components/HistoryList';

/**@type {array} Measurement categories*/
const categories = [
  { key: 'length', value: 'length', text: 'Length' },
  { key: 'area', value: 'area', text: 'Area' },
  { key: 'mass', value: 'mass', text: 'Mass' },
  { key: 'volume', value: 'volume', text: 'Volume' },
  { key: 'time', value: 'time', text: 'Time' },
  { key: 'temperature', value: 'temperature', text: 'Temperature' },
  { key: 'speed', value: 'speed', text: 'Speed' },
  { key: 'angle', value: 'angle', text: 'Angle' },
  { key: 'digital', value: 'digital', text: 'Digital' }
];

class App extends React.Component {
  state = { history: [] };

  /** handleSave
   * To handle when the save button is clicked
   * (e.g. when the user want to save their conversion)
   *
   * This will be passed to ConverterUI as a props and will be called from ConverterUI
   * to passed the current input of conversion (values and units)
   *
   * @param {object} newData new saved conversion that will added to the history
   */
  handleSave = newData => {
    this.setState(prevState => ({
      history: [newData, ...prevState.history]
    }));
  };

  /** handleHistoryDeletion
   * To handle a deletion of saved HistoryItem
   *
   * This will be passed to HistoryList as a props
   * and will be called from HistoryList with the key of HistoryItem that want to be deleted
   *
   * @param {object} delKey index of item that want to be deleted
   */
  handleHistoryDeletion = delKey => {
    let history = this.state.history;
    history.splice(delKey, 1);
    this.setState({ history });
  };

  /**
   * To handle when the user wanted to delete all histories.
   * This will be passed to SelectorUI via ConverterUI as a props.
   * The SelectorUI will then call this function to delete all history
   */
  handleAllHistoryDeletion = () => {
    this.setState(prevState => ({
      history: []
    }));
  };

  render() {
    return (
      <div
        style={{
          padding: '30px 0',
          backgroundColor: ' #f2f2f2',
          height: '100vh'
        }}
      >
        {/* Title Bar */}
        <Container textAlign="center" style={{ marginBottom: '10px' }}>
          <h1 style={{ color: 'black', marginBottom: '10px' }}>
            Welcome to convertr.io
          </h1>
          <a
            href="https://github.com/devinsbt/Convertr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button compact color="black" onClick={this.onCopyButtonClick}>
              <Icon name="github" /> Github
            </Button>
          </a>
        </Container>
        {/* Main UI */}
        <Container style={{ padding: '0' }}>
          <ConverterUI
            categories={categories}
            onSaveButtonClick={this.handleSave}
            onClearHistory={this.handleAllHistoryDeletion}
          />
        </Container>
        {/* History List */}
        <Container style={{ paddingTop: '30px' }}>
          <HistoryList
            onChange={this.handleHistoryDeletion}
            dataList={this.state.history}
          />
        </Container>
      </div>
    );
  }
}

export default App;
