export default class Flights {
  constructor(endpoint = 'fakeapi') {
    this.endpoint = endpoint;
  }

  getFlights() {
    return fetch(`${this.endpoint}/flights.json`);
  }

  static test(aa) {
    return aa;
  }
}
