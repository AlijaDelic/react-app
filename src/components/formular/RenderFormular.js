import React, { Component } from "react";

class RenderFormular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formular: this.props.selectedFormular,
      version: this.props.selectedVersion
    };
  }

  //refreshing component after update
  componentDidUpdate = prevProps => {
    if (prevProps.selectedFormular !== this.props.selectedFormular) {
      this.setState({
        formular: this.props.selectedFormular,
        version: this.props.selectedVersion
      });
    }
    if (prevProps.selectedVersion !== this.props.selectedVersion) {
      this.setState({
        formular: this.props.selectedFormular,
        version: this.props.selectedVersion
      });
    }
  };
  //set version values
  setVersionValues = (id, value) => {
    let newValue = {};
    if (value.type === "checkbox") {
      newValue = { id: id, checked: "true", value: "", required: "false" };
    } else {
      newValue = {
        id: id,
        checked: "false",
        value: value.value,
        required: "false"
      };
    }
    let filterVersion = this.state.version.values.filter(val => val.id !== id);
    let newVersion = [...filterVersion, newValue];
    newVersion.sort(function(a, b) {
      return parseInt(a.id) - parseInt(b.id);
    });
    this.setState(prevState => ({
      version: {
        ...prevState.version,
        values: newVersion
      }
    }));
  };
  //handle selected Radio
  setSelectedRadio = (radioValue, id) => {
    let newData = {
      id: id,
      checked: radioValue.target.value,
      value: radioValue.target.value,
      required: "false"
    };
    let filteredData = this.state.version.values.filter(
      value => value.id !== id
    );
    let updatedData = [...filteredData, newData];
    updatedData.sort(function(a, b) {
      return parseInt(a.id) - parseInt(b.id);
    });
    this.setState(prevState => ({
      version: {
        ...prevState.version,
        values: updatedData
      }
    }));
  };

  render() {
    const { deliverData } = this.props;
    return (
      <table className="tbl-formular-render">
        <tbody>
          {this.state.version.values.some(
            value => value.required === "true"
          ) === true ? (
            <tr className="alert">
              <td colSpan="2">
                All fileds marked with <span className="alert-text">red</span>,
                must be set.
              </td>
            </tr>
          ) : null}
          <tr>
            <th className="element_name">Name</th>
            <th className="element_value">Option</th>
          </tr>
          {this.state.formular.values.map(value => (
            <tr
              className={
                this.state.version.values[value.id].required === "true"
                  ? "mandatory"
                  : "none"
              }
            >
              {value.id > 0 ? (
                <div className="element">
                  <td className="element_name">{value.elementName}</td>
                  {value.inputType === "Radio" ? (
                    <td className="element_value">
                      {value.radioValues.map(radio => (
                        <div
                          className={
                            this.state.version.values[value.id].checked ===
                            radio.value
                              ? "radios selected"
                              : "radios"
                          }
                        >
                          <label className="radio-label" for={radio.value}>
                            {radio.value}
                            <input
                              className="input-radio"
                              type="Radio"
                              name={value.elementName}
                              value={radio.value}
                              checked={
                                this.state.version.values[value.id].checked ===
                                radio.value
                              }
                              onClick={e =>
                                this.setSelectedRadio(
                                  e,
                                  this.state.version.values[value.id].id
                                )
                              }
                            />
                          </label>
                        </div>
                      ))}
                    </td>
                  ) : (
                    <div s>
                      <td className="element_value">
                        <input
                          placeholder={
                            this.state.version.values[value.id].required ===
                            "true"
                              ? "This field is required!"
                              : "Enter your value"
                          }
                          type={value.inputType}
                          value={this.state.version.values[value.id].value}
                          onChange={e =>
                            this.setVersionValues(value.id, e.target)
                          }
                          checked={this.state.version.values[value.id].checked}
                        />
                      </td>
                    </div>
                  )}
                </div>
              ) : null}
            </tr>
          ))}
          {this.state.version.values.some(
            value => value.required === "true"
          ) === true ? null : (
            <tr className="tbl-formular-render-row">
              <td colSpan="2" className="tbl-formular-render-cell">
                <button
                  className="btn-validate"
                  onClick={() => {
                    deliverData(this.state.version.values);
                  }}
                >
                  Validate your input
                </button>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }
}

export default RenderFormular;
