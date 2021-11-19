import React from "react";

export class AirplaneElement extends React.Component {
    render() {
        return (
            this.props.aircraftDictionary.aircraft[this.props.planeCode]
        )
    }
}