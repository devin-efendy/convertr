/** SelectorUI
 * This component will render:
 * 1. Category Selection Dropdown
 * 2. All three interactive button (SAVE, CLEAR, DELETE HISTORY)
 */
import React from 'react';
import { Button, Form, Grid, Popup } from 'semantic-ui-react';

// style for the popup
const buttonPopupStyle = {
  borderRadius: 0,
  opacity: 0.7
};

class SelectorUI extends React.Component {
  /** onCategoryChange
   * This function will be triggered when the user change the measurement category
   *
   * Will call the parent component function that passed as a props
   *
   * @param {event} e: onChange event of dropdown element
   * @param {object} data: data of the selected dropdown item
   */
  onCategoryChange = (e, data) => {
    this.props.onChangeCategory(data.value);
  };

  render() {
    return (
      <Grid columns={2} stackable textAlign="center">
        {/* Grid.Row */}
        <Grid.Row verticalAlign="middle">
          {/* Grid.Column - 1 */}
          <Grid.Column>
            <Form.Dropdown
              className="selector-default"
              placeholder="Choose Measurement"
              selection
              fluid
              options={this.props.list}
              onChange={this.onCategoryChange}
            />
          </Grid.Column>
          {/* Grid.Column - 1 --end */}
          {/* Grid.Column - 2 */}
          <Grid.Column>
            {/* Group of button
                Save Button
                Clear Button
                Delete History Button
                 */}
            <Button
              content="Save"
              color="green"
              icon="plus"
              labelPosition="left"
              onClick={this.props.onSaveClicked}
              style={{ width: '30%', marginRight: '3%' }}
            />
            <Button
              content="Clear"
              color="blue"
              icon="undo alternate"
              labelPosition="left"
              onClick={this.props.onClearClicked}
              style={{ width: '30%', marginRight: '3%' }}
            />
            <Popup
              trigger={
                <Button
                  content="History"
                  color="red"
                  icon="times"
                  labelPosition="left"
                  onClick={this.props.onHistoryClearClicked}
                  style={{ width: '30%' }}
                />
              }
              style={buttonPopupStyle}
              content="Delete all conversion history"
            />
            {/* Group of Button --end */}
          </Grid.Column>
          {/* Grid.Column - 2 --end */}
        </Grid.Row>
        {/* Grid.Row --end */}
      </Grid>
    );
  }
}

export default SelectorUI;
