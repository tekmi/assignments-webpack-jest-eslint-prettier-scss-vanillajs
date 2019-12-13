import NoFlightsTemplate from "../../../src/templates/NoFlightsTemplate";

describe("NoFlightsTemplate", () => {
  it("Renders properly with searched phrase", () => {
    expect(NoFlightsTemplate("San Francisco")).toMatchSnapshot();
  });
});
