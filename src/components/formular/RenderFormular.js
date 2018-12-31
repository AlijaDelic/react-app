import React, { Component } from "react";

class RenderFormular extends Component {
  render() {
    const { formular, setVersionValues } = this.props;

    return (
      <table className="tbl-formular-render">
        <tbody>
          {formular[0].values.map(value => {
            return (
              <tr className="tbl-formular-render-row">
                <td className="tbl-formular-render-cell">
                  {value.elementValue}
                </td>
                {value.selectedOption !== "Radio" ? (
                  <td className="tbl-formular-render-cell">
                    <input
                      name={value.elementValue}
                      type={value.selectedOption}
                      onChange={e => {
                        setVersionValues(e.target.value, e.target.name);
                      }}
                    />
                  </td>
                ) : (
                  value.radioValues.map(radio => {
                    return (
                      <td key className="tbl-formular-render-cell">
                        <input
                          name={value.elementValue}
                          value={radio}
                          onChange={e => {
                            setVersionValues(e.target.value, e.target.name);
                          }}
                          type="Radio"
                        />
                        {radio}
                      </td>
                    );
                  })
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default RenderFormular;
