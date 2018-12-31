import React, { Component } from "react";
import RenderFormular from "./RenderFormular";

class SelectFormular extends Component {
  setVersionValues = (value, name) => {
    this.setState({
      [name]: value
    });
  };
  render() {
    const {
      formulars,
      handleSelect,
      selectedFormular,
      setVersionName,
      version,
      saveVersion,
      loadVersion,
      selectedVersion
    } = this.props;
    return (
      <div>
        <table className="tbl-formular">
          <tbody>
            <tr className="tbl-formular-row">
              <td className="tbl-formular-cell">Formular name:</td>

              <td className="tbl-formular-cell">
                <select
                  onChange={e => {
                    handleSelect(e.target.value);
                  }}
                  className="formular-select"
                >
                  <option>Select formular</option>
                  {formulars.map(formular => (
                    <option key={formular.name}>{formular.name}</option>
                  ))}
                </select>
              </td>

              <td className="tbl-formular-cell">Version:</td>

              <td className="tbl-formular-cell">
                <input
                  type="text"
                  placeholder="Version"
                  className="formular-input"
                  onChange={e => setVersionName(e.target.value)}
                  ref={ver => {
                    this.version = ver;
                  }}
                />
              </td>
              {selectedFormular.length > 0 && version.name.length > 0 ? (
                <td>
                  <button
                    onClick={() =>
                      loadVersion(selectedFormular[0].name, this.version)
                    }
                  >
                    Load
                  </button>
                </td>
              ) : null}
            </tr>
          </tbody>
        </table>
        {selectedFormular.length > 0 && (
          <RenderFormular
            formular={selectedFormular}
            version={version}
            setVersionValues={this.setVersionValues}
          />
        )}

        {selectedVersion[0] && (
          <table className="tbl-versions-res">
            <tbody>
              {Object.entries(selectedVersion[0].values).map(([key, value]) => {
                return (
                  <tr className="tbl-versions-row">
                    <td className="tbl-versions-cell left">{key} :</td>
                    <td className="tbl-versions-cell right">
                      <p>{value}</p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {selectedFormular.length > 0 && version.name.length > 0 ? (
          <table className="tbl-formular">
            <tr className="tbl-formular-render-row">
              <td colSpan="2" className="tbl-formular-render-cell">
                <button
                  onClick={() => {
                    saveVersion(
                      this.state,
                      selectedFormular[0].name,
                      this.version
                    );
                  }}
                >
                  Save
                </button>
              </td>
            </tr>
          </table>
        ) : null}
      </div>
    );
  }
}

export default SelectFormular;
