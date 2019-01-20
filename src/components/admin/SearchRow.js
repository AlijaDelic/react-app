import React, { Component } from "react";

class SearchRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ""
    };
  }

  render() {
    const { formularName } = this.props;
    return (
      <table className="tbl-search">
        <tbody>
          <tr className="tbl-row-search">
            <td className="tbl-cell">Formular name:</td>
            <td className="tbl-cell search-container">
              <input
                className="search-input"
                onChange={e => this.setState({ search: e.target.value })}
                type="text"
                placeholder="Enter formular name"
              />
            </td>
            <td className="tbl-cell">
              <button
                onClick={() => {
                  formularName(this.state.search);
                }}
                className="btn-search"
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
