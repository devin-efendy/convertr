/** HistoryItem
 * To render the information about one saved conversion history.
 * It allow the user to delete the the saved conversion history.
 * Also, allow the user to copy the summary of the conversion history
 * to the clipboard
 */
import React from 'react';
import { Grid, Button, Segment, Popup } from 'semantic-ui-react';

// Time out length for the popup
const timeoutLength = 1250;

class HistoryItem extends React.Component {
  // Component State
  // copyButtonIsOpen: state that control copy button popup
  state = { copyButtonIsOpen: false };

  /** getHistoryData
   * To return an Object that contain all the information about a single history
   * Values will be formatted to 5 significant digits
   * Also gives a string that contain a summary about that history
   */
  getHistoryData = () => {
    let leftVal = this.props.history.leftValue;

    // Format the values to a 5 significant figures
    if (!Number.isInteger(leftVal) || leftVal.toString().length > 5) {
      leftVal = leftVal.toPrecision(5);
    }

    let rightVal = this.props.history.rightValue;
    if (!Number.isInteger(rightVal) || rightVal.toString().length > 5) {
      rightVal = rightVal.toPrecision(5);
    }
    const leftUnitAbbr = this.props.history.leftUnitAbbr.toUpperCase();
    const rightUnitAbbr = this.props.history.rightUnitAbbr.toUpperCase();
    const leftUnitFull = this.props.history.leftUnitFull;
    const rightUnitFull = this.props.history.rightUnitFull;
    const strFormat = `${leftVal} ${leftUnitFull} [${leftUnitAbbr}] = ${rightVal} ${rightUnitFull} [${rightUnitAbbr}]`;

    return {
      leftVal,
      rightVal,
      leftUnitAbbr,
      rightUnitAbbr,
      leftUnitFull,
      rightUnitFull,
      strFormat
    };
  };

  /** handleCopyBtnOpen
   * To handle when opening the POPUP from clicking copy button
   */
  handleCopyBtnOpen = () => {
    this.setState({ copyButtonIsOpen: true });

    this.timeout = setTimeout(() => {
      this.setState({ copyButtonIsOpen: false });
    }, timeoutLength);
  };

  /** handleCopyBtnClose
   * To handle when closing the POPUP from clicking copy button
   */
  handleCopyBtnClose = () => {
    this.setState({ copyButtonIsOpen: false });
    clearTimeout(this.timeout);
  };

  /** onDeleteButtonClick
   * To handle when the user want to delete a certain conversion history
   * This will call the parent component function to perform the actual deletion
   */
  onDeleteButtonClick = () => {
    this.props.handleDeleteButtonClick(this.props.historyKey);
  };

  /** onCopyButtonClick
   * To handle when the user click the copy to clipboard button of a
   * particular conversion history
   */
  onCopyButtonClick = () => {
    const el = document.createElement('textarea');
    el.value = this.getHistoryData().strFormat;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  /** recentHistorySegment
   * Return a Segment component that is inverted an raised
   * to indicates it's the most recent conversion history
   *
   * @param {string} text: A single conversion history summary
   * @param {string} color: color of the segment, defaulted to green
   */
  recentHistorySegment = (text, color = 'green') => {
    return (
      <Segment
        inverted
        raised
        color={color}
        style={{ border: '2px solid teal' }}
      >
        {text}
      </Segment>
    );
  };

  /** historySegment
   * Return a regular Segment that indicates it's the previous conversion history
   *
   * @param {string} text: A single conversion history summary
   * @param {string} color: color of the segment, defaulted to green
   */
  historySegment = (text, color = 'gray') => {
    return (
      <Segment
        size="small"
        style={{
          backgroundColor: 'rgba(0,0,0,0.3)'
        }}
      >
        {text}
      </Segment>
    );
  };

  render() {
    let UsedSegment = null;
    if (this.props.historyKey === 0) {
      UsedSegment = this.recentHistorySegment;
    } else {
      UsedSegment = this.historySegment;
    }

    const finalSegment = UsedSegment(this.getHistoryData().strFormat);

    return (
      <Grid>
        <Grid.Row columns="equal">
          <Grid.Column width={12}>{finalSegment}</Grid.Column>
          <Grid.Column width={2}>
            <Button
              icon="trash"
              color="red"
              size="big"
              style={{
                width: '100%',
                height: '100%'
              }}
              onClick={() => {
                this.props.handleDeleteButtonClick(this.props.historyKey);
              }}
            />
          </Grid.Column>
          <Grid.Column width={2}>
            <Popup
              trigger={
                <Button
                  icon="copy"
                  color="yellow"
                  size="big"
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                  onClick={this.onCopyButtonClick}
                />
              }
              on="click"
              open={this.state.copyButtonIsOpen}
              onClose={this.handleCopyBtnClose}
              onOpen={this.handleCopyBtnOpen}
              content="Copied to clipboard!"
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default HistoryItem;
