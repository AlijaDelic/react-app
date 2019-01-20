import React, { Component } from "react";
import RenderFormular from "./RenderFormular";

class SelectFormular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formulars: this.props.formulars,
      selectedFormular: "",
      versions: this.props.versions,
      selectedVersion: {
        name: "",
        values: []
      },
      version: "",
      save: false
    };
  }
  //choosing formular
  chooseFormular = formularName => {
    if (formularName !== "Select formular") {
      let selFormular = this.state.formulars.filter(
        formular => formular.name === formularName
      );
      this.setState({
        selectedFormular: selFormular[0]
      });
      let tempValues = [];
      for (let i = 0; i < selFormular[0].values.length; i++) {
        if (selFormular[0].values[i].validation === "Mandatory") {
          tempValues.push({ id: i, value: "", checked: "", required: "true" });
        } else {
          tempValues.push({ id: i, value: "", checked: "", required: "false" });
        }
      }
      this.setState(prevState => ({
        selectedVersion: {
          ...prevState.selectedVersion,
          values: tempValues
        }
      }));
      this.setState({
        version: "",
        save: false
      });
    } else {
      this.setState({
        formulars: this.props.formulars,
        selectedFormular: "",
        versions: this.props.versions,
        selectedVersion: {
          name: "",
          values: []
        },
        version: "",
        save: false
      });
    }
  };
  //select version
  setVersion = value => {
    this.setState({
      version: value
    });
  };
  //prepare data for the db
  reciveData = values => {
    let dataToSave = {};
    if (values.some(val => val.required === "true")) {
      alert("You have to fill all the red fields!");
    } else if (this.state.version) {
      dataToSave = {
        name:
          this.state.selectedFormular.name + "version:" + this.state.version,
        values: values
      };
      if (
        this.state.versions.some(version => version.name === dataToSave.name)
      ) {
        alert("This version already exist in this formular. Please rename it.");
      } else {
        this.setState({ selectedVersion: dataToSave, save: !this.state.save });
        alert("Your input is ready for saving");
      }
    } else {
      alert("You have to fill all the red fields, including version");
    }
  };
  //loading a specific version
  loadVersion = (formularName, versionName) => {
    let search = formularName + "version:" + versionName;
    let load = this.state.versions.filter(version => version.name === search);
    if (load.length === 0) {
      alert("There is no version to show");
      this.setState({
        formulars: this.props.formulars,
        selectedFormular: this.state.selectedFormular,
        versions: this.props.versions,
        selectedVersion: this.state.selectedVersion,
        version: this.state.version,
        save: false
      });
    } else {
      this.setState({
        selectedVersion: load[0]
      });
    }
  };

  render() {
    const { insertIntoDb } = this.props;
    return (
      <div>
        {/* Search row */}
        <table className="tbl-formular">
          <tbody>
            <tr className="tbl-formular-row">
              <td className="tbl-formular-cell">Formular name:</td>

              <td className="tbl-formular-cell">
                <select
                  onChange={e => {
                    this.chooseFormular(e.target.value);
                  }}
                  className="formular-select"
                >
                  <option>Select formular</option>
                  {this.state.formulars.map(formular => (
                    <option value={formular.name} key={formular.name}>
                      {formular.name}
                    </option>
                  ))}
                </select>
              </td>

              <td className="tbl-formular-cell">Version:</td>

              <td
                className={
                  this.state.version
                    ? "tbl-formular-cell"
                    : "tbl-formular-cell mandatory"
                }
              >
                <input
                  type="text"
                  placeholder="Version"
                  className="formular-input"
                  value={this.state.version}
                  onChange={e => this.setVersion(e.target.value)}
                />
              </td>
              {this.state.version && this.state.selectedFormular && (
                <td>
                  <button
                    className="btn-load"
                    onClick={() =>
                      this.loadVersion(
                        this.state.selectedFormular.name,
                        this.state.version
                      )
                    }
                  >
                    Load
                  </button>
                </td>
              )}
            </tr>
          </tbody>
        </table>
        {/* if is selected formular render it */}
        {this.state.selectedFormular && (
          <RenderFormular
            selectedFormular={this.state.selectedFormular}
            selectedVersion={this.state.selectedVersion}
            deliverData={this.reciveData}
          />
        )}
        {this.state.save && (
          <table className="tbl-formular-render">
            <tbody>
              <tr className="tbl-formular-render-row">
                <td colSpan="2" className="tbl-formular-render-cell">
                  <button
                    className="btn-confirm"
                    onClick={() => {
                      insertIntoDb("Versions", this.state.selectedVersion);
                    }}
                  >
                    Confirm your input
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
    );
  }
}

export default SelectFormular;
