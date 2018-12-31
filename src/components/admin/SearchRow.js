import React, { Component } from "react";
import "./searchRow.css";

class SearchRow extends Component {
  render() {
    const { formularName } = this.props;
    return (
      <table className="tbl-search">
        <tbody>
          <tr className="tbl-row-search">
            <td className="tbl-cell">Formular name:</td>
            <td className="tbl-cell">
              <input
                className="search-input"
                ref={formName => (this.formularName = formName)}
                type="text"
                placeholder="Enter formular name"
              />
            </td>
            <td className="tbl-cell">
              <button
                onClick={() => {
                  formularName(this.formularName.value);
                }}
                className="btn"
              >
                Search
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default SearchRow;
