import './App.css';
import {useEffect, useState} from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { createFilter } from "react-select";
import { Accordion } from "react-bootstrap";
import { FlightCard } from "./Components/FlightCard"


function App() {
    const [airports,setAirports]=useState([]);
    const [searchResult, setSearchResult]=useState([]);
    const currencies = [
        {value:"CHF", label:"Swiss francs (CHF)"},
        {value:"USD", label:"US Dollars (USD)"},
        {value:"EUR", label:"Euro (EUR)"},
    ]
    const stops = [
        {value:"0", label:"0"},
        {value:"1", label:"1"},
        {value:"2", label:"2"},
        {value:"3", label:"3"},
    ]
    const cabins = [
        {value:"ECONOMY", label:"Economy"},
        {value:"PREMIUM_ECONOMY", label:"Premium Economy"},
        {value:"BUSINESS", label:"Business"},
        {value:"FIRST", label:"First"},
    ]
    const getData=()=>{
        fetch('http://localhost:8081/search'
            ,{
              headers : {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              }
            }
        )
        .then(function(response){
          return response.json();
        })
        .then(function(myJson) {
            let airports = [];
            Object.values(myJson).forEach(entry => {
                if(entry.iata.length > 2) {
                    airports.push({
                        value: entry.iata, label: entry.name
                    })
                }
            });
            setAirports(airports)
        });
    }
    useEffect(()=>{
        getData()
    },[])

    const loadOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(airports);
        }, 1000);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new URLSearchParams();
        for (const pair of new FormData(event.target)) {
            data.append(pair[0], pair[1]);
        }
        fetch('http://localhost:8081/search', {
            method: 'POST',
            body: data,
        }).then(function(response){
            return response.json();
        }).then(function(myJson) {
            console.log(myJson)
            setSearchResult([myJson])
        });
    }
    return (
        <div className="App">
            <div className={"container-fluid p-0 vh-25 overflow-hidden bg-image-mood"}>&nbsp;</div>
            <div className="container">
                <div className="row">
                    <div className="col shadow bg-white text-dark rounded p-5">
                        <div className="form-group m-0">
                            <form method="post" onSubmit={handleSubmit}>
                                <input type="hidden" name="[originDestinations][][id]" value="1"/>
                                <div className={"row"}>
                                    <div className={"col-12 col-lg-2 mt-3 mt-lg-0"}>
                                        <Select
                                            options={currencies}
                                            name={"[currencyCode]"}
                                            class={"form-control"}
                                            filterOption={createFilter({ ignoreAccents: false })}
                                            placeholder={"Currency"}
                                        />
                                    </div>
                                    <div className={"col-12 col-lg-2 mt-3 mt-lg-0"}>
                                        <Select
                                            options={stops}
                                            name={"[searchCriteria][flightFilters][connectionRestriction][maxNumberOfConnections]"}
                                            class={"form-control"}
                                            filterOption={createFilter({ ignoreAccents: false })}
                                            placeholder={"Stops"}
                                        />
                                    </div>
                                    <div className={"col-12 col-lg-2 mt-3 mt-lg-0"}>
                                        <Select
                                            options={cabins}
                                            name={"[searchCriteria][flightFilters][cabinRestrictions][][cabin]"}
                                            class={"form-control"}
                                            filterOption={createFilter({ ignoreAccents: false })}
                                            placeholder={"Class"}
                                        />
                                    </div>

                                </div>

                                <div className={"row mt-lg-3"}>
                                    <div className={"col-12 col-lg-4 mt-3 mt-lg-0"}>
                                        <AsyncSelect
                                            class={"form-control"}
                                            name={"[originDestinations][][originLocationCode]"}
                                            loadOptions={loadOptions}
                                            filterOption={createFilter({ ignoreAccents: false })}
                                            placeholder={"Origin"}
                                        />
                                    </div>

                                    <div className={"col-12 col-lg-4 mt-3 mt-lg-0"}>
                                    <AsyncSelect
                                        class={"form-control"}
                                        name={"[originDestinations][][destinationLocationCode]"}
                                        loadOptions={loadOptions}
                                        filterOption={createFilter({ ignoreAccents: false })}
                                        placeholder={"Destination"}
                                    />
                                    </div>

                                    <div className={"col-12 col-lg-2 mt-3 mt-lg-0"}>
                                        <input type="date" name="[originDestinations][][departureDateTimeRange][date]" className="form-control" placeholder={"Date"} />
                                    </div>

                                    <div className={"col-12 col-lg-2 mt-3 mt-lg-0"}>
                                        <input type="time" name="[originDestinations][][departureDateTimeRange][time]" className="form-control" placeholder={"Time"} step="1" />
                                    </div>
                                </div>

                                <div className={"row mt-lg-3"}>
                                    <div className={"col-12 col-lg-2 mt-3 mt-lg-0"}>
                                        <input type="submit" value="Search" className="btn btn-primary" />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row shadow bg-white text-dark rounded mt-5 p-5">
                    <Accordion defaultActiveKey="0">
                        <FlightCard object={searchResult} />
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

export default App;
