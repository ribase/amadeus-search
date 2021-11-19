import React from "react";
import {FlightCardContent} from "./SubComponents/FlightCardContent";

export class FlightCard extends React.Component {
    render() {
        return this.props.object.map((item) =>
            item.data.map((data, count) =>
                data.itineraries.map((itineraries) =>
                    <FlightCardContent itineraries={itineraries} data={data} dictionaries={item.dictionaries} counter={count}/>
                )
            )
        );
    }
}