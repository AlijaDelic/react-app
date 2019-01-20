import React, { Component } from "react";
import RenderInput from "../admin/RenderInput";

class TblRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputTypes: ["Text", "Number", "Checkbox", "Radio"],
      validation: ["Mandatory", "None"],
      values: this.props.values,
      change: 0,
      obj: []
    };
  }
  //on updating props
  componentDidUpdate = prevProps => {
    if (this.props !== prevProps) {
      this.setState({
        inputTypes: ["Text", "Number", "Checkbox", "Radio"],
        validation: ["Mandatory", "None"],
        values: this.props.values,
        change: 0
      });
    }
  };

  //set element name
  setElementName = elementName => {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        elementName: elementName
      }
    }));
    this.setState({
      change: 1
    });
  };
  //set input type
  setInputType = inputType => {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        inputType: inputType
      }
    }));
    this.setState({
      change: 1
    });
  };
  //set validation
  setValidation = validation => {
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        validation: validation
      }
    }));
    this.setState({
      change: 1
    });
  };
  //set numbers of radio if choosen
  setRadioNumber = radioNumbers => {
    let tempData = [];
    for (var i = 0; i < radioNumbers; i++) {
      tempData.push({ id: i, value: "" });
      this.setState(prevState => ({
        values: {
          ...prevState.values,
          radioValues: tempData
        }
      }));
    }
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        radioNumbers: radioNumbers
      }
    }));
    this.setState({
      change: 1
    });
  };

  setRadioValues = obj => {
    let filter = this.state.values.radioValues.filter(
      value => value.id !== obj.id
    );
    let newValue = [...filter, obj];
    newValue.sort(function(a, b) {
      return parseInt(a.id) - parseInt(b.id);
    });
    this.setState(prevState => ({
      values: {
        ...prevState.values,
        radioValues: newValue
      }
    }));

    console.log(filter);
  };

  render() {
    const { id, updateComponent, values, confirmRow } = this.props;
    return (
      <tr className="tbl-row-admin">
        <td>Element {values.id}</td>
        <td>
          <input
            type="text"
            placeholder="Insert element name"
            value={this.state.values.elementName}
            onChange={e => this.setElementName(e.target.value)}
            ref={elName => (this.elName = elName)}
          />
        </td>
        <td>
          <select
            value={this.state.values.inputType}
            onChange={e => this.setInputType(e.target.value)}
          >
            {this.state.inputTypes.map(input => (
              <option key={input} value={input}>
                {input}
              </option>
            ))}
          </select>
        </td>
        {this.state.values.inputType === "Radio" ? (
          <td>
            <input
              type="number"
              value={this.state.values.radioNumbers}
              onChange={e => this.setRadioNumber(e.target.value)}
            />
            {this.state.values.radioNumbers > 0
              ? this.state.values.radioValues.map(radio => (
                  <RenderInput
                    key={radio.id}
                    values={radio}
                    setRadioValues={this.setRadioValues}
                  />
                ))
              : null}
          </td>
        ) : null}
        <td>
          <select
            value={this.state.values.validation}
            onChange={e => this.setValidation(e.target.value)}
          >
            {this.state.validation.map(val => (
              <option key={val} value={val}>
                {val}
              </option>
            ))}
          </select>
        </td>
        {this.state.change === 1 && this.state.values.id === 0 && (
          <td>
            <span onClick={() => confirmRow(this.state.values)}>
              <i className="fas fa-plus-circle" />
            </span>
          </td>
        )}
        {this.state.change === 1 && this.state.values.id != 0 && (
          <td>
            <span onClick={() => updateComponent(this.state.values)}>
              <i className="fas fa-check" />
            </span>
          </td>
        )}
      </tr>
    );
  }
}

export default TblRow;
