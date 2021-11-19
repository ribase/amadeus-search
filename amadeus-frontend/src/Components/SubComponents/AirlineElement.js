import React from "react";

export class AirlineElement extends React.Component {
    render() {
        return (
            <div className={this.props.class}>{this.props.aircraftDictionary.carriers[this.props.carrierCode]}</div>
        )
    }
}