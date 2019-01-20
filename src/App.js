import React, { Component } from "react";
import Admin from "../src/components/admin/Admin";
import "./App.css";
import Nav from "../src/components/navigation/Nav";
import Formular from "../src/components/formular/Formular";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLink: "Admin",
      activeIndex: 0,
      formulars: [],
      versions: []
    };
    this.openConection();
  }
  //open conection to database(db)
  openConection() {
    if (window.indexedDB) {
      var req = window.indexedDB.open("Database", 1);
      var db;
      req.onupgradeneeded = function(e) {
        var db = e.target.result;
        var store = db.createObjectStore("Formular", { keyPath: "name" });
        var store2 = db.createObjectStore("Versions", { keyPath: "name" });
      };
      req.onsuccess = function(e) {
        db = e.target.result;
      };
      req.onerror = function(e) {
        console.log("Error" + e);
      };
    }
  }
  //get data from the db
  componentDidMount = () => {
    var promise = new Promise((resolve, reject) => {
      let req = window.indexedDB.open("Database", 1);
      req.onsuccess = function(e) {
        let db = e.target.result;
        let tx = db.transaction(["Formular"], "readwrite");
        let store = tx.objectStore("Formular");
        var request = store.getAll();
        request.onsuccess = e => {
          resolve(e.currentTarget.result);
        };
        store.onerror = e => {
          reject("store error");
        };
      };
    });
    promise.then(resolve => {
      this.setState({
        formulars: resolve
      });
    });
    var promise = new Promise((resolve, reject) => {
      let req = window.indexedDB.open("Database", 1);
      req.onsuccess = function(e) {
        let db = e.target.result;
        let tx = db.transaction(["Versions"], "readwrite");
        let store = tx.objectStore("Versions");
        var request = store.getAll();
        request.onsuccess = e => {
          resolve(e.currentTarget.result);
        };
        store.onerror = e => {
          reject("store error");
        };
      };
    });
    promise.then(resolve => {
      this.setState({
        versions: resolve
      });
    });
  };
  //update db
  updateDatabase = (store_name, obj) => {
    let request = window.indexedDB.open("Database");
    request.onsuccess = function(e) {
      let db = e.target.result;
      let trx = db.transaction([store_name], "readwrite");
      let store = trx.objectStore(store_name);
      let req = store.get(obj["name"]);
      req.onsuccess = function(e) {
        store.put(obj);
      };
    };
    alert("This formular has been updated.");
    window.location.reload();
  };
  //Insert data to the indexedDB
  insertIntoDb = (store, obj) => {
    var req = window.indexedDB.open("Database", 1);
    req.onsuccess = function(e) {
      var db = e.target.result;
      var tranasaction = db.transaction(store, "readwrite");
      var formularStore = tranasaction.objectStore(store);
      formularStore.add(obj);
    };
    alert("This data has been saved.");
    window.location.reload();
  };
  //handle navigation
  handleNav = (activeLink, index) => {
    this.setState({
      activeLink: activeLink,
      activeIndex: index
    });
  };

  render() {
    return (
      <div>
        <Nav handleNav={this.handleNav} activeIndex={this.state.activeIndex} />
        {this.state.activeLink === "Admin" && (
          <Admin
            active={true}
            addtoDB={this.insertIntoDb}
            formulars={this.state.formulars}
            updateDatabase={this.updateDatabase}
          />
        )}
        {this.state.activeLink === "Formular" && (
          <Formular
            formulars={this.state.formulars}
            versions={this.state.versions}
            insertIntoDb={this.insertIntoDb}
          />
        )}
      </div>
    );
  }
}

export default App;
