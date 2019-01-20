import React, { Component } from "react";
import SearchRow from "./SearchRow";
import TblRow from "./TblRow";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formulars: this.props.formulars,
      formular: {
        name: "",
        values: [
          {
            element: 0,
            elementName: "",
            inputType: "Text",
            validation: "None",
            radioNumbers: 0,
            radioValues: [{ id: 0, value: "" }]
          }
        ]
      },
      changeDidHappen: false
    };
  }

  //Set formular name
  setFormularName = formularName => {
    let check = this.state.formulars.some(
      formular => formular.name === formularName
    );
    if (check) {
      let newFormular = this.state.formulars.filter(
        formular => formular.name === formularName
      );
      this.setState({ formular: newFormular[0], loaded: true });
    } else {
      this.setState(prevState => ({
        formular: {
          ...prevState.formular,
          name: formularName,
          values: [
            {
              id: 0,
              elementName: "",
              inputType: "Text",
              validation: "None",
              radioNumbers: 0,
              radioValues: []
            }
          ]
        }
      }));
      this.setState({ loaded: false });
    }
  };

  //on adding new row to the table
  confirmRow = values => {
    let index = this.state.formular.values.length - 1;
    const newValues = {
      id: this.state.formular.values[index].id + 1,
      elementName: values.elementName,
      inputType: values.inputType,
      validation: values.validation,
      radioNumbers: values.radioNumbers,
      radioValues: values.radioValues
    };
    const updatedValues = [...this.state.formular.values, newValues];
    this.setState(prevState => ({
      formular: {
        ...prevState.formular,
        values: updatedValues
      }
    }));
    this.setState({
      added: false,
      changeDidHappen: true
    });
  };
  //update row
  updateComponent = value => {
    this.setState({
      changeDidHappen: true
    });
    let sortedValues = this.state.formular.values.filter(
      val => val.id !== value.id
    );
    let newValues = [...sortedValues, value];
    newValues.sort(function(a, b) {
      return parseInt(a.id) - parseInt(b.id);
    });
    this.setState(prevState => ({
      formular: {
        ...prevState.formular,
        values: newValues
      }
    }));
  };

  render() {
    const { updateDatabase, addtoDB, formulars } = this.props;

    return (
      <div>
        {/* show search row, the first one */}
        <SearchRow
          formularName={this.setFormularName}
          formulars={this.state.formulars}
        />

        <table className="tbl-admin-results">
          <tbody>
            {/* add new row */}
            {this.state.formular.name.length > 0 &&
              this.state.formular.values.map((value, index) => (
                <TblRow
                  id={index}
                  confirmRow={this.confirmRow}
                  key={index}
                  values={value}
                  setElementName={this.setElementName}
                  updateComponent={this.updateComponent}
                />
              ))}

            {/* add button */}
            {this.state.search === true && this.state.formularExist === true && (
              <tr className="tbl-row-admin">
                <td colSpan="5">
                  <button className="update">Update</button>
                </td>
              </tr>
            )}
            {this.state.formular.values.length > 1 &&
              this.state.loaded === false && (
                <tr className="tbl-row-admin">
                  <td colSpan="5">
                    <button
                      onClick={() => addtoDB("Formular", this.state.formular)}
                      className="save"
                    >
                      Save
                    </button>
                  </td>
                </tr>
              )}
            {this.state.loaded === true && this.state.changeDidHappen && (
              <tr className="tbl-row-admin">
                <td colSpan="5">
                  <button
                    onClick={() =>
                      updateDatabase("Formular", this.state.formular)
                    }
                    className="update"
                  >
                    Update
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Admin;
