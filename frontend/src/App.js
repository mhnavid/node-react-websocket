import "./App.css";
import React from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://localhost:8000");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      connectionStatus: "Websocket Client Not Connected",
    };
  }

  componentWillMount() {
    client.onopen = () => {
      console.log("Client Connected");
      this.setState({ connectionStatus: "Websocket Client Connected" });
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      this.setState({
        message: dataFromServer.message,
      });
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2>Websocket Client</h2>
          <h4>{this.state.connectionStatus}</h4>
          <p>
            Message from websocket server :{" "}
            <code style={{ color: "green" }}>{this.state.message}</code>
          </p>
        </header>
      </div>
    );
  }
}

export default App;
