import React, { Component } from "react";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: ["Admin", "Formular"]
    };
  }

  render() {
    const { handleNav, activeIndex } = this.props;
    return (
      <nav className="nav">
        <ul className="nav-list">
          {this.state.links.map((link, index) => {
            return (
              <li
                key={index}
                onClick={() => {
                  handleNav(link, index);
                }}
                className={
                  activeIndex === index ? "nav-item active" : "nav-item"
                }
              >
                {link}
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }
}

export default Nav;
