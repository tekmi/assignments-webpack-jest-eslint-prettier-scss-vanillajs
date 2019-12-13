export default search => `
  <li class="rw-autosuggest__results-flights">
      <ul class="rw-autosuggest-group">
          <li class="rw-autosuggest__results-item--noflight" data-ft-element="flights-search-results-notfound">
              Unfortunately, we cannot find a flight with '${search}'. Please, try again.
          </li>
      </ul>
  </li>
`;
