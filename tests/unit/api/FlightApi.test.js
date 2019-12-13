import FlightsApi from "../../../src/api/FlightsApi";
import flightsPayload from "../../../flights";

describe("FlightsApi", () => {
  let flightsApi;
  beforeEach(() => {
    flightsApi = new FlightsApi();
    fetch.resetMocks();
  });

  it("should return no flights in case of an API error", async () => {
    fetch.mockReject(new Error("Endpoint not available"));

    const flights = await flightsApi.findFlights("something");
    expect(flights).toEqual([]);
  });

  it("should return no flights in case of an invalid match", async () => {
    fetch.mockResponseOnce(JSON.stringify(flightsPayload));

    const flights = await flightsApi.findFlights("notExistingFlight");

    expect(fetch.mock.calls.length).toEqual(1);
    expect(flights).toEqual([]);
  });

  it("should return a few flights if flight number exist", async () => {
    fetch.mockResponseOnce(JSON.stringify(flightsPayload));

    const flights = await flightsApi.findFlights("969");

    expect(fetch.mock.calls.length).toEqual(1);
    expect(flights.length).toBeGreaterThan(0);
  });

  it("should return a few flights if airport exist", async () => {
    fetch.mockResponseOnce(JSON.stringify(flightsPayload));

    const flights = await flightsApi.findFlights("Francisco");

    expect(fetch.mock.calls.length).toEqual(1);
    expect(flights.length).toBeGreaterThan(0);
  });
});
