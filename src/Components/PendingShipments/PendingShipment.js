import React, { Component } from "react";
import SingleShipment from "./SingleShipment";
class PendingShipment extends Component {
  render = () => {
    return (
      <section className="section-padding-100" style={{}}>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            marginTop: "15px",
          }}
        >
          <h3>Pending Orders : 10</h3>{" "}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SingleShipment />
          <SingleShipment />
          <SingleShipment />
          <SingleShipment />
          <SingleShipment />
          <SingleShipment />
        </div>
      </section>
    );
  };
}
export default PendingShipment;
