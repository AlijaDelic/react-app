import React, { Component } from "react";
import "./nav.css";

class Nav extends Component {
  state = {};
  render() {
    const { links } = this.props;
    const { handleNav } = this.props;
    return (
      <nav className="nav">
        <ul className="nav-list">
          {links.map(link => {
            return (
              <li
                key={link}
                onClick={() => {
                  handleNav(link);
                }}
                className="nav-item"
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
