import FoundFlightsTemplate from "../../../src/templates/FoundFlightsTemplate";

describe("FoundFlightsTemplate", () => {
  it("renders empty results group if none flights provided", () => {
    expect(FoundFlightsTemplate([])).toMatchSnapshot();
    expect(FoundFlightsTemplate(null)).toMatchSnapshot();
  });

  it("renders results group with empty flight", () => {
    expect(FoundFlightsTemplate([{}])).toMatchSnapshot();
  });

  it("renders results group with all flight information properly", () => {
    expect(
      FoundFlightsTemplate([
        {
          flightNumber: "UA 989",
          airport: "San Francisco",
          expectedTime: "14:50",
        },
      ]),
    ).toMatchSnapshot();
  });
});
