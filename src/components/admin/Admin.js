import React, { Component } from "react";
import "./admin.css";
import SearchRow from "./SearchRow";
import TblRow from "./TblRow";
import TblResuls from "./TblResults";

class Admin extends Component {
  state = {
    count: 0,
    defaultValues: {
      element: 0,
      elementValue: "",
      options: ["Text", "Number", "Checkbox", "Radio"],
      selectedOption: "Text",
      radioNumbers: 0,
      radioValues: [],
      validations: ["Mandatory", "None"],
      selectedValidation: "Mandatory"
    },
    formular: {
      name: "",
      values: []
    },
    result: ""
  };

  setFormularName = e => {
    const search = this.props.formulars.filter(formular => formular.name === e);
    if (search) {
      this.setState({
        result: search
      });
    }

    this.setState(prevState => ({
      formular: {
        ...prevState.formular,
        name: e
      }
    }));
  };

  handleElementValue = e => {
    this.setState(prevState => ({
      defaultValues: {
        ...prevState.defaultValues,
        elementValue: e
      }
    }));
  };

  handleChangeOptions = e => {
    this.setState(prevState => ({
      defaultValues: {
        ...prevState.defaultValues,
        selectedOption: e
      }
    }));
  };

  handleRadioNumbers = e => {
    this.setState(prevState => ({
      defaultValues: {
        ...prevState.defaultValues,
        radioNumbers: e
      }
    }));
  };

  handleValidation = e => {
    this.setState(prevState => ({
      defaultValues: {
        ...prevState.defaultValues,
        selectedValidation: e
      }
    }));
  };

  renderRadioInputs = number => {
    let tableRow = [];
    for (let i = 0; i < number; i++) {
      let children = [];
      for (let j = 0; j < 1; j++) {
        children.push(
          <td className="tbl-cell-1">
            <input
              type="text"
              value={this.state.defaultValues.radioValues[i]}
              placeholder="Label"
              key={i}
              onChange={e => {
                this.state.defaultValues.radioValues[i] = e.target.value;
              }}
            />
          </td>
        );
      }
      tableRow.push(<tr className="tbl-row-1">{children}</tr>);
    }
    return tableRow;
  };

  newRow = () => {
    const newData = {
      element: this.state.count + 1,
      elementValue: this.state.defaultValues.elementValue,
      options: this.state.defaultValues.options,
      selectedOption: this.state.defaultValues.selectedOption,
      radioNumbers: this.state.defaultValues.radioNumbers,
      radioValues: this.state.defaultValues.radioValues,
      validations: this.state.defaultValues.validations,
      selectedValidation: this.state.defaultValues.selectedValidation
    };
    const updatedData = [...this.state.formular.values, newData];

    this.setState(prevState => ({
      formular: {
        ...prevState.formular,
        values: updatedData
      }
    }));

    this.setState({
      count: this.state.count + 1,
      defaultValues: {
        element: 0,
        elementValue: "",
        options: ["Text", "Number", "Checkbox", "Radio"],
        selectedOption: "Text",
        radioNumbers: 0,
        radioValues: [],
        validations: ["Mandatory", "None"],
        selectedValidation: "Mandatory"
      }
    });
  };

  render() {
    const { saveFormular } = this.props;

    return (
      <div className="main">
        <SearchRow formularName={this.setFormularName} />

        {this.state.formular.name && (
          <TblRow
            key={this.state.id}
            defaultValues={this.state.defaultValues}
            handleElementValue={this.handleElementValue}
            handleChangeOptions={this.handleChangeOptions}
            handleRadioNumbers={this.handleRadioNumbers}
            renderRadioInputs={this.renderRadioInputs}
            handleValidation={this.handleValidation}
            newRow={this.newRow}
          />
        )}

        <table className="tbl-res">
          <tbody>
            {this.state.result != ""
              ? this.state.result[0].values.map(value => {
                  return <TblResuls key={value.element} values={value} />;
                })
              : null}
          </tbody>
        </table>

        <table className="tbl-res">
          <tbody>
            {this.state.formular.values.map(value => {
              return <TblResuls key={value.element} values={value} />;
            })}
            {this.state.count > 0 ? (
              <tr>
                <td colSpan="5">
                  <button
                    onClick={() => {
                      saveFormular(this.state.formular);
                    }}
                    id="submit"
                  >
                    Submit
                  </button>
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Admin;
