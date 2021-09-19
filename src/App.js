import React from "react";
import "./styles/normalize.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <div
        style={{
          minHeight: "100vh",
        }}
      ></div>
    );
  }
}
