/** ConverterUI
 * This is the class that render all the main UI for values and unit inputs
 * Also, render the SelectorUI and InputUI
 */
import React from 'react';
import { Segment, Grid, Form, Divider } from 'semantic-ui-react';
import SelectorUI from './SelectorUI';
import InputUI from './InputUI';

class ConverterUI extends React.Component {
  /** ConverterUI States
   * @type {array} currentUnitList: (the current )A list of units from the measurement category
   * @type {number} leftVal & rightVal: Represent input values for left/right section
   * @type {string} leftUnit & rightUnit: Represent selected units for left/right section
   */
  state = {
    currentUnitList: [
      { key: 'default', text: 'Please select the unit category' }
    ],
    leftValue: '',
    leftUnit: '',
    rightValue: '',
    rightUnit: ''
  };

  /** handleCategoryChange
   * To handle change in measurement category.
   * By getting the new measurement category from SelectorUI.
   * Get the list of units from that category and update the state
   *
   * This will be passed as a props to SelectorUI.
   *
   * @param {number} key
   */
  handleCategoryChange = measurement => {
    /** @type {array} currentList */
    let currentList = null;
    /** @type {array} units */
    let units = null;

    // Get the list units from a measurement category
    const convert = require('convert-units');
    units = convert().list(measurement);
    // Map all values in units to an object that can be represented as Dropdown Item
    currentList = units.map(unit => {
      return { key: unit.abbr, value: unit.abbr, text: unit.singular };
    });

    this.setState({
      measure: measurement,
      currentUnitList: currentList,
      leftValue: '',
      leftUnit: '',
      rightValue: '',
      rightUnit: ''
    });
  };

  /** onValueChange
   * Handle when either input of values change
   *
   * This will passed to both InputUI as a props.
   * Changes of values from InputUI will be taken as the argument for this function
   *
   * @param {number} newValue: new value that will assigned to the current state
   * @param {string} section: indicates the section of InputUI
   */
  onValueChange = (newValue, section) => {
    if (newValue && this.state.leftUnit && this.state.rightUnit) {
      const convert = require('convert-units');
      let valueTo = -1;
      let unitFrom = '';
      let unitTo = '';

      // Check which section is calling function
      // Depending on the section get the correct values and inputs
      if (section === 'left') {
        unitFrom = this.state.leftUnit;
        unitTo = this.state.rightUnit;
      } else if (section === 'right') {
        unitFrom = this.state.rightUnit;
        unitTo = this.state.leftUnit;
      }

      // Calculate the new values
      valueTo = convert(newValue)
        .from(unitFrom)
        .to(unitTo);

      // Check which section is calling this function
      // Depending on the section, update the state
      if (section === 'left') {
        this.setState({
          leftValue: Number(newValue),
          rightValue: Number(valueTo)
        });
      } else if (section === 'right') {
        this.setState({
          leftValue: Number(valueTo),
          rightValue: Number(newValue)
        });
      }
    } else {
      // Don't update the state if the units are not selected
      this.setState({ leftValue: '', rightValue: '' });
    }
  };

  /** onValueChange
   * Handle when either input of untis change
   *
   * This will passed to both InputUI as a props.
   * Changes of units from InputUI will be taken as the argument for this function
   *
   * @param {number} newUnit: new unit that will assigned to the current state
   * @param {string} section: indicates the section of InputUI
   */
  onUnitChange = (newUnit, section) => {
    if (section === 'left') {
      this.setState({ leftUnit: newUnit }, () => {
        if (this.state.rightUnit && this.state.rightValue) {
          this.changeValue();
        }
      });
    } else if (section === 'right') {
      this.setState({ rightUnit: newUnit }, () => {
        if (this.state.leftUnit && this.state.leftValue) {
          this.changeValue();
        }
      });
    }
  };

  /** changeValue
   * This function to be called when unit is changed.
   * This always convert what is from left value and set it to the right value
   */
  changeValue = () => {
    let convert = require('convert-units');
    const newValue = convert(this.state.leftValue)
      .from(this.state.leftUnit)
      .to(this.state.rightUnit);
    this.setState({ rightValue: Number(newValue) });
  };

  /** handleSaveButtonClick
   * To handle when the SAVE button is clicked
   * This function will call the props onSaveButtonClick and passed all data
   * which is the current state of this Component (values and units)
   *
   * This will be passed as a props to SelectorUI.
   */
  handleSaveButtonClick = () => {
    if (
      this.state.leftUnit &&
      this.state.leftValue &&
      this.state.rightUnit &&
      this.state.rightValue
    ) {
      //This is to get the full name of the units
      const leftSingular = this.state.currentUnitList.find(e => {
        return e.key === this.state.leftUnit;
      });

      const rightSingular = this.state.currentUnitList.find(e => {
        return e.key === this.state.rightUnit;
      });

      // Create an object that contain all the information needed to create a history
      const data = {
        leftValue: this.state.leftValue,
        leftUnitAbbr: this.state.leftUnit,
        leftUnitFull: leftSingular.text,
        rightValue: this.state.rightValue,
        rightUnitAbbr: this.state.rightUnit,
        rightUnitFull: rightSingular.text
      };
      // Call the function by the props
      this.props.onSaveButtonClick(data);
    } else {
      alert('Please completely fill the form before saving.');
    }
  };

  /** handleClearButtonClick
   * To handle when the CLEAR button in the SelectorUI is clicked.
   * This will be passed as a props to SelectorUI
   */
  handleClearButtonClick = () => {
    this.setState({
      leftValue: '',
      rightValue: ''
    });
  };

  render() {
    return (
      <Form>
        <Segment.Group raised>
          {/* Segment of the major UI that includes InputUI */}
          <Segment placeholder inverted color="teal">
            <Grid columns={2} stackable textAlign="center">
              <Divider vertical style={{ fontSize: '1.2rem' }}>
                CONVERT TO
              </Divider>
              {/* Grid.Row */}
              <Grid.Row verticalAlign="middle">
                {/* Grid.Column - 1 */}
                <Grid.Column className="input-left">
                  <InputUI
                    section="left"
                    header="FROM"
                    newValue={this.state.leftValue}
                    newUnit={this.state.leftUnit}
                    options={this.state.currentUnitList}
                    controlValueChange={this.onValueChange}
                    controlUnitChange={this.onUnitChange}
                  />
                </Grid.Column>
                {/* Grid.Column - 1 --end*/}
                {/* Grid.Column - 2 */}
                <Grid.Column className="input-right">
                  <InputUI
                    section="right"
                    header="TO"
                    newValue={this.state.rightValue}
                    newUnit={this.state.rightUnit}
                    options={this.state.currentUnitList}
                    controlValueChange={this.onValueChange}
                    controlUnitChange={this.onUnitChange}
                  />
                </Grid.Column>
                {/* Grid.Column - 2 --end */}
              </Grid.Row>
              {/* Grid.Row --end */}
            </Grid>
          </Segment>
          {/* Segment of the major UI that includes InputUI --end*/}
          {/* Segment of the SelectorUI */}
          <Segment inverted color="violet">
            <SelectorUI
              onChangeCategory={this.handleCategoryChange}
              onSaveClicked={this.handleSaveButtonClick}
              onClearClicked={this.handleClearButtonClick}
              onHistoryClearClicked={this.props.onClearHistory}
              list={this.props.categories}
            />
          </Segment>
          {/* Segment of the SelectorUI --end */}
        </Segment.Group>
      </Form>
    );
  }
}

export default ConverterUI;
