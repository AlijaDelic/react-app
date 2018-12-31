import React, { Component } from "react";
import "./tblRow.css";

class TblRow extends Component {
  render() {
    const { defaultValues } = this.props;
    const {
      handleChangeOptions,
      renderRadioInputs,
      handleRadioNumbers,
      newRow,
      handleElementValue,
      handleValidation
    } = this.props;

    return (
      <table className="tbl-main">
        <tr className="tbl-row-1">
          <td className="tbl-cell-1">Element {defaultValues.element}</td>

          <td className="tbl-cell-1">
            <input
              type="text"
              name="Element Name"
              placeholder="Element Name"
              value={defaultValues.elementValue}
              onChange={e => {
                handleElementValue(e.target.value);
              }}
            />
          </td>

          <td className="tbl-cell-1">
            <select
              onChange={e => {
                handleChangeOptions(e.target.value);
              }}
              value={defaultValues.selectedOption}
              ref={select => (this.selectedOption = select)}
            >
              {defaultValues.options.map(option => {
                return (
                  <option key={option} value={option}>
                    {option}
                  </option>
                );
              })}
            </select>
          </td>

          {defaultValues.selectedOption == "Radio" ? (
            <td className="tbl-cell-1">
              <input
                value={defaultValues.radioNumbers}
                type="number"
                onChange={e => {
                  handleRadioNumbers(e.target.value);
                }}
              />
              {defaultValues.radioNumbers > 0
                ? renderRadioInputs(defaultValues.radioNumbers)
                : null}
            </td>
          ) : null}

          <td className="tbl-cell-1">
            <select
              value={defaultValues.selectedValidation}
              onChange={e => handleValidation(e.target.value)}
            >
              {defaultValues.validations.map(validate => {
                return (
                  <option key={validate} value={validate}>
                    {validate}
                  </option>
                );
              })}
            </select>
          </td>

          {defaultValues.element === 0 ? (
            <td className="tbl-cell-1">
              <span onClick={newRow}>
                <i className="fas fa-plus-circle" />
              </span>
            </td>
          ) : null}
        </tr>
      </table>
    );
  }
}

export default TblRow;
