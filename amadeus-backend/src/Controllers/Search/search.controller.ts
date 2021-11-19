import { Get, Post, Body, Controller, Header } from '@nestjs/common';
const merge = require('lodash/merge')
const Amadeus = require('amadeus');
const fs = require('fs');

const testRequest = {
  "travelers": [{
    "id": "1",
    "travelerType": "ADULT",
    "fareOptions": [
      "STANDARD"
    ]
  }],
  "sources": [
    "GDS"
  ],
  "searchCriteria": {
    "maxFlightOffers": 15,
    "flightFilters": {
      "cabinRestrictions": [{
        "cabin": "BUSINESS",
        "coverage": "MOST_SEGMENTS",
        "originDestinationIds": [
          "1"
        ]
      }],
      "carrierRestrictions": {
        "excludedCarrierCodes": [
          "AA",
          "AZ"
        ]
      }
    }
  }
}

@Controller('search')
export class SearchController {
  @Get()
  @Header('content-type', 'application/json')
  get(): string {
    return fs.readFileSync('src/Resources/airports.json', 'utf8')
  }

  @Post()
  @Header('content-type', 'application/json')
  async post(@Body() body) {
    const amadeus = new Amadeus({
      clientId: 'zA4ft9aCyCfpQNFBPGqgJQdWOGXN1hh9',
      clientSecret: '9zhS7RCGTotYVfYI'
    });
    const request = merge({}, testRequest, body)
    try {
      const response = await amadeus.shopping.flightOffersSearch.post(
        JSON.stringify(request)
      )
      return response.result
    }
    catch (e) {
      // console.log(e)
    }
  }
}
