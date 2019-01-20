import React, { Component } from "react";
import SelectFormular from "./SelectFormular";

class Formular extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formulars: this.props.formulars,
      versions: this.props.versions
    };
  }
  //click on load button version
  loadVersion = (versionName, formularName) => {
    let search = { name: formularName + "version:" + versionName };
    let selectedVersion = this.state.versions.filter(
      version => version.name === search.name
    );
    this.setState(prevState => ({
      selectedVersion: {
        ...prevState.selectedVersion,
        name: selectedVersion
      }
    }));
  };
  //when tab formular is choosen, this component recives all formulars and versions
  // and render the form
  render() {
    const { insertIntoDb } = this.props;
    return (
      <div>
        <SelectFormular
          formulars={this.state.formulars}
          insertIntoDb={insertIntoDb}
          versions={this.state.versions}
        />
      </div>
    );
  }
}

export default Formular;
