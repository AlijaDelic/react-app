import React, { Component } from "react";
class RenderImput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: this.props.values
    };
  }

  render() {
    const { values, setRadioValues } = this.props;
    return (
      <td className="extra-tbl-row">
        <input
          type="text"
          value={values.value}
          onChange={e =>
            setRadioValues({
              id: values.id,
              value: e.target.value
            })
          }
        />
      </td>
    );
  }
}

export default RenderImput;
