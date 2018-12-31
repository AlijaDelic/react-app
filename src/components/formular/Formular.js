import React, { Component } from "react";
import "./formular.css";
import SelectFormular from "./SelectFormular";

class Formular extends Component {
  state = {
    versions: this.props.versions,
    version: {
      name: "",
      values: {}
    },
    formulars: this.props.formulars,
    selectedFormular: "",
    selectedVersion: ""
  };

  setVersionName = e => {
    this.setState(prevState => ({
      version: {
        ...prevState.version,
        name: e
      }
    }));
  };

  handleSelect = e => {
    const select = this.state.formulars.filter(formular => formular.name === e);
    this.setState({ selectedFormular: select, selectedVersion: "" });
  };

  loadVersion = (formularName, version) => {
    const srch = formularName + " version " + version.value;
    const filteredVersion = this.state.versions.filter(
      version => version.name === srch
    );

    if (filteredVersion[0]) {
      this.setState({
        selectedVersion: filteredVersion,
        selectedFormular: ""
      });
    } else {
      alert("No result to show!");
    }
  };

  render() {
    const { saveVersion } = this.props;
    return (
      <div>
        <SelectFormular
          formulars={this.state.formulars}
          selectedFormular={this.state.selectedFormular}
          handleSelect={this.handleSelect}
          version={this.state.version}
          setVersionName={this.setVersionName}
          saveVersion={saveVersion}
          loadVersion={this.loadVersion}
          selectedVersion={this.state.selectedVersion}
        />
      </div>
    );
  }
}

export default Formular;
