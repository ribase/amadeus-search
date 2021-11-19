import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlaneDeparture } from '@fortawesome/free-solid-svg-icons'
import { faPlaneArrival } from '@fortawesome/free-solid-svg-icons'
import { faPlane } from '@fortawesome/free-solid-svg-icons'
import {AirplaneElement} from "./AirplaneElement";
import {Accordion} from "react-bootstrap";
import {AirlineElement} from "./AirlineElement";
import {DurationElement} from "./DurationElement";

export class FlightCardContent extends React.Component {
    render() {
        return (
        <Accordion.Item eventKey={this.props.counter}>
            {(() => {
                return (
                    <Accordion.Header className={"m-0"}>
                        <div className={"row w-100"}>
                            <div className={"col-lg-9 col-12 d-flex justify-content-start mb-lg-0 mb-3"}>
                                {this.props.itineraries.segments.map((segments,i, {length}) =>
                                    <React.Fragment>
                                        <div className={"me-1"}>
                                            <FontAwesomeIcon icon={faPlane}/>
                                        </div>
                                        <div className={"me-3"}>{segments.departure.iataCode} -> {segments.arrival.iataCode}</div>

                                        <AirlineElement carrierCode={segments.carrierCode} aircraftDictionary={this.props.dictionaries} class={"me-3"}/>


                                    </React.Fragment>
                                )}
                            </div>
                            <div className={"col-lg-1 col-6"}>
                                <DurationElement timeString={this.props.itineraries.duration}/>
                            </div>
                            <div className={"col-lg-2 col-6 text-right"}>
                                {this.props.data.price.currency} {this.props.data.price.total}
                            </div>
                        </div>
                    </Accordion.Header>
                )
            })()}
            <div className={"row"}>
                <React.Fragment>
                    <Accordion.Body className={"mb-5"}>
                        {this.props.itineraries.segments.map((segments,i, {length}) =>
                                    <div className={"col-lg-6 col-12 mb-5"}>
                                        <div>
                                            <img alt={"mood image"+i} src={`https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata=${segments.carrierCode}`} />
                                        </div>
                                        <div><FontAwesomeIcon icon={faPlaneDeparture} /> &nbsp;
                                            {segments.departure.iataCode}: &nbsp;
                                            {new Intl.DateTimeFormat("en-GB", {
                                            year: "numeric",
                                            month: "long",
                                            day: "2-digit",
                                            hour: "numeric",
                                            minute: "numeric"
                                        }).format(new Date(segments.departure.at))}
                                        </div>
                                        <div><FontAwesomeIcon icon={faPlaneArrival} /> &nbsp;
                                            {segments.arrival.iataCode}: &nbsp;
                                            {new Intl.DateTimeFormat("en-GB", {
                                            year: "numeric",
                                            month: "long",
                                            day: "2-digit",
                                            hour: "numeric",
                                            minute: "numeric"
                                        }).format(new Date(segments.arrival.at))}
                                        </div>
                                        <div>
                                            <FontAwesomeIcon icon={faPlane} /> <AirplaneElement planeCode={segments.aircraft.code} aircraftDictionary={this.props.dictionaries}/>
                                        </div>
                                    </div>
                        )}
                    </Accordion.Body>
                </React.Fragment>
            </div>
        </Accordion.Item>
        )
    }
};