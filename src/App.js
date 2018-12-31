import React, { Component } from "react";
import Admin from "../src/components/admin/Admin";
import "./App.css";
import Nav from "../src/components/navigation/Nav";
import Formular from "../src/components/formular/Formular";

class App extends Component {
  state = {
    nav: ["Admin", "Formular"],
    activeLink: "",
    formulars: [],
    versions: []
  };

  handleNav = activeLink => {
    this.setState({
      activeLink: activeLink
    });
  };
  saveFormular = formular => {
    const newFormular = formular;
    const updatedFormular = [...this.state.formulars, newFormular];
    this.setState({
      formulars: updatedFormular,
      activeLink: ""
    });
  };

  saveVersion = (versionValues, formularName, versionName) => {
    const newVersion = {
      name: formularName + " version " + versionName.value,
      values: versionValues
    };
    const updateVersion = [...this.state.versions, newVersion];
    this.setState({
      versions: updateVersion,
      activeLink: ""
    });
  };

  render() {
    return (
      <div>
        <Nav links={this.state.nav} handleNav={this.handleNav} />
        {this.state.activeLink === "Admin" && (
          <Admin
            saveFormular={this.saveFormular}
            formulars={this.state.formulars}
          />
        )}
        {this.state.activeLink === "Formular" && (
          <Formular
            formulars={this.state.formulars}
            saveVersion={this.saveVersion}
            versions={this.state.versions}
          />
        )}
      </div>
    );
  }
}

export default App;
