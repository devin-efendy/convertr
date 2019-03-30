/** InputUI
 *  This class will render the form that will take the values and units as its inputs
 *
 *  All of the informations then will be passed to the parent component
 *  which is the ConverterUI
 */
import React from 'react';
import { Form, Header } from 'semantic-ui-react';
import './InputUI.css';

class InputUI extends React.Component {
  /** onValueChange
   * This function will be triggered when the user change the value input
   * This function will call the ConverterUI function that is passed as a props
   * @param {event} e: onChange event of input element
   */
  onValueChange = e => {
    const newValue = e.target.value;
    this.props.controlValueChange(newValue, this.props.section);
  };

  /** onUnitChange
   * This function will be triggered when the user change the unit input
   * This function will call the ConverterUI function that is passed as a props
   * @param {event} e: onChange event of dropdown element
   * @param {object} data: data of the selected dropdown item
   */
  onUnitChange = (e, data) => {
    this.props.controlUnitChange(data.value, this.props.section);
  };

  render() {
    return (
      <div className="lg-field">
        <Header icon style={{ color: 'white' }}>
          {this.props.header}
        </Header>

        <Form.Input
          className="value-input"
          fluid
          type="number"
          value={this.props.newValue}
          placeholder="Value"
          onChange={this.onValueChange}
        />

        <Form.Dropdown
          className="unit-input"
          selection
          fluid
          options={this.props.options}
          placeholder="Unit"
          onChange={this.onUnitChange}
        />
      </div>
    );
  }
}

export default InputUI;
