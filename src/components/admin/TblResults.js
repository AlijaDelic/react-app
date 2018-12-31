import React, { Component } from "react";
import "./admin.css";

class TblResults extends Component {
  render() {
    const { values } = this.props;

    return (
      <tr className="tbl-res-row">
        <td className="tbl-res-cell">
          <p>Element: </p> {values.element}
        </td>
        <td className="tbl-res-cell">
          <p>Element name: </p>
          {values.elementValue ? values.elementValue : "No name"}
        </td>
        <td className="tbl-res-cell">
          <p>Element option: </p>
          {values.selectedOption}
        </td>
        {values.selectedOption === "Radio" ? (
          <td className="tbl-res-cell">
            <p>Radio options: </p> {values.radioNumbers}
            {values.radioValues.map(value => {
              return (
                <td className="tbl-res-cell tbl-res-cell-1" key={value}>
                  <p>Option: </p>
                  {value}
                </td>
              );
            })}
          </td>
        ) : null}

        <td className="tbl-res-cell">
          <p>Element validation: </p> {values.selectedValidation}
        </td>
      </tr>
    );
  }
}

export default TblResults;
