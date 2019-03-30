import React from 'react';
import { List, Segment, Transition, Button } from 'semantic-ui-react';

import HistoryItem from './HistoryItem';

class HistoryList extends React.Component {
  /** handleDelete
   * This function will be passed as a props to HistoryItem
   * so that whenever they delete button in HistoryItem is clicked
   * it will trigger the parent component function that will perform the actual deletion
   *
   * @param {number} historyKey: index of the history array that will be deleted
   */
  handleDelete = historyKey => {
    this.props.onChange(historyKey);
  };

  /** renderContent
   * To allow conditional render that depends on whether the history is empty or not
   * @param {array} listOfHistory
   */
  renderContent = listOfHistory => {
    //If the history is empty, then display the information of how to operate the app
    if (listOfHistory.length === 0) {
      return (
        <div>
          <h3>
            History is empty. Click the{' '}
            <Button
              content="Save"
              color="green"
              icon="plus"
              labelPosition="left"
              style={{ margin: '0px 1rem' }}
            />
            button to save your conversions!
          </h3>
          <h3>
            Click the
            <Button
              content="Clear"
              color="blue"
              icon="undo alternate"
              labelPosition="left"
              style={{ margin: '0px 1rem' }}
            />
            button to reset the values to zero.
          </h3>
          <h3>
            To delete all conversion history, simply click
            <Button
              content="History"
              color="red"
              icon="times"
              labelPosition="left"
              style={{ margin: '0px 1rem' }}
            />
          </h3>
        </div>
      );
    } else {
      return (
        <Transition.Group
          as={List}
          duration={500}
          divided
          size="huge"
          verticalAlign="middle"
        >
          {listOfHistory}
        </Transition.Group>
      );
    }
  };

  render() {
    // Map all the history to a ListItem that contain HistoryItem component
    const listOfHistory = this.props.dataList.map((history, i) => {
      return (
        <List.Item key={i}>
          <HistoryItem
            handleDeleteButtonClick={this.handleDelete}
            historyKey={i}
            history={history}
          />
        </List.Item>
      );
    });

    // Get the correct render content
    let contentRender = this.renderContent(listOfHistory);

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <Segment
          raised
          style={{
            width: '100%',
            height: '45vh',
            paddingTop: '1.5rem',
            backgroundColor: '#aec6cf'
          }}
          inverted
        >
          <h2>CONVERSION HISTORY</h2>
          <Segment basic style={{ height: '85%', overflow: 'auto' }}>
            {contentRender}
          </Segment>
        </Segment>
      </div>
    );
  }
}

export default HistoryList;
