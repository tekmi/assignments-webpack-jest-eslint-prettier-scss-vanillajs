export default class FlightsApi {
  constructor(endpoint = "fakeapi") {
    this.endpoint = endpoint;
  }

  getFlights() {
    return fetch(`${this.endpoint}/flights.json`);
  }

  /**
   * @param {String} searched
   * @return {Promise<*[]|*>}
   */
  async findFlights(searched) {
    const flightRegex = new RegExp(`.*${searched}.*`, "i");
    try {
      const response = await this.getFlights();
      const { flights } = await response.json();

      return flights.filter(flight => flightRegex.test(flight.airport) || flightRegex.test(flight.flightNumber));
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
      return [];
    }
  }
}
