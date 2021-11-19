import React from "react";
import * as moment from 'moment';
import 'moment-duration-format';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock } from '@fortawesome/free-solid-svg-icons'

export class DurationElement extends React.Component {
    render() {
        const duration = moment.duration(this.props.timeString);

        return (
            <div className={"duration"}><FontAwesomeIcon icon={faClock} /> {duration.format('HH:mm')}</div>
        )
    }
}