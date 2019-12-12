export default (flights) => `
  <li class="rw-autosuggest__results-flights">
      <p class="rw-autosuggest__title">Looking for this flight?</p>
      <ul class="rw-autosuggest-group">
      ${flights.map(flight => flight.flightNumber && flight.airport && flight.expectedTime && `
      <li class="rw-autosuggest__results-item">
            <span class="rw-autosuggest-group__flightnumber">${flight.flightNumber}</span>
              <span class="rw-autosuggest-group__airport">${flight.airport}</span>
              <div class="rw-autosuggest-group__time">
                  <time>${flight.expectedTime}</time>
              </div>
          </li>`
)}
      </ul>
  </li>
`;
