import './polyfills';
import '../sass/index.scss';
import Flights from "./Api/Flights";
import NoFlightsTemplate from "./templates/NoFlightsTemplate";
import FoundFlightsTemplate from "./templates/FoundFlightsTemplate";


// TODO: verify if https://github.com/webpack-contrib/html-loader is still needed. Looks like html-webpack-plugin does the job
// TODO; maybe sth with https://webpack.js.org/guides/hot-module-replacement/ ? But looks like webpack-dev-server detects changes automatically already
// TODO: add testing with Jest
// TODO: add testing with Cypress or other
// TODO: add eslint and prettier
const flights = new Flights();

const searchFlights = (async (searched) => {
  const flightRegex = new RegExp(`.*${searched}.*`, "i");
  try {
    const response = await flights.getFlights();
    const allFlights = await response.json();

    return allFlights.flights.filter(
      flight => flightRegex.test(flight.airport) || flightRegex.test(flight.flightNumber)
    );
  } catch (e) {
    console.error(e);
    return [];
  }
});

const templatePlaceholder = document.querySelector('.rw-autosuggest__results');
console.log(templatePlaceholder);
const search = document.querySelector('#flight-search-widget-autosuggest');
search.addEventListener('input', async (e) => {
  console.log(e.target.value);

  if (e.target.value.length < 3) {
    templatePlaceholder.innerHTML = '';
    templatePlaceholder.classList.remove('rw-autosuggest__results--opened');
    return;
  }

  const flights = await searchFlights(e.target.value);

  if (flights.length > 0) {
    templatePlaceholder.innerHTML = FoundFlightsTemplate(flights);
  } else {
    templatePlaceholder.innerHTML = NoFlightsTemplate(e.target.value);
  }

  templatePlaceholder.classList.add('rw-autosuggest__results--opened');
});



