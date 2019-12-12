import FoundFlightsTemplate from "./FoundFlightsTemplate";
import NoFlightsTemplate from "./NoFlightsTemplate";
import FlightsApi from "../api/FlightsApi";

class TemplateHandler {
  constructor() {
    this.flightsResultsPlaceholder = document.querySelector(".rw-autosuggest__results");
    this.searchInput = document.querySelector("#flight-search-widget-autosuggest");
    this.flightsApi = new FlightsApi();
  }

  init() {
    this.searchInput.addEventListener("input", e => this.handleSearchInputTyping(e));
  }

  /**
   * @param {Object} e
   * @return {Promise<void>}
   */
  async handleSearchInputTyping(e) {
    const {
      target: { value },
    } = e;

    if (value.length < 3) {
      this.cleanupPlaceholder();
      return;
    }

    await this.displayFlightsInPlaceholder(value);
  }

  /**
   * @param {String} searchedFlight
   * @return {Promise<void>}
   */
  async displayFlightsInPlaceholder(searchedFlight) {
    const foundFlights = await this.flightsApi.findFlights(searchedFlight);

    this.flightsResultsPlaceholder.innerHTML =
      foundFlights.length > 0 ? FoundFlightsTemplate(foundFlights) : NoFlightsTemplate(searchedFlight);
    this.flightsResultsPlaceholder.classList.add("rw-autosuggest__results--opened");
  }

  cleanupPlaceholder() {
    this.flightsResultsPlaceholder.innerHTML = "";
    this.flightsResultsPlaceholder.classList.remove("rw-autosuggest__results--opened");
  }
}

export default TemplateHandler;
