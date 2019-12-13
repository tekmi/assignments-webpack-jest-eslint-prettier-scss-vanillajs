import TemplateHandler from "../../../src/templates/TemplateHandler";
import { JSDOM } from "jsdom";
import flightsPayload from "../../../flights";

const mockFound = jest.fn();
jest.mock("../../../src/templates/FoundFlightsTemplate", () => flights => mockFound(flights));

const mockNotFound = jest.fn();
jest.mock("../../../src/templates/NoFlightsTemplate", () => searched => mockNotFound(searched));

const mockFlightsStub = jest.fn();
jest.mock("../../../src/api/FlightsApi", () => {
  return jest.fn().mockImplementation(() => {
    return { findFlights: search => mockFlightsStub(search) };
  });
});

describe("TemplateHandler", () => {
  beforeEach(async () => {
    const indexTemplate = await JSDOM.fromFile("./public/indexTemplate.html");
    document.body.innerHTML = indexTemplate.window.document.body.innerHTML;
    jest.clearAllMocks();
  });

  beforeAll(() => {
    jest.spyOn(TemplateHandler.prototype, "cleanupPlaceholder");
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should not display flights if less than three chars typed into search box", () => {
    const templateHandler = new TemplateHandler();
    templateHandler.init();

    const spyDisplayFlight = jest.spyOn(templateHandler, "displayFlightsInPlaceholder").mockImplementation(() => "");

    const event = document.createEvent("Event");
    event.initEvent("input", true, true);

    templateHandler.searchInput.value = "a";
    templateHandler.searchInput.dispatchEvent(event);

    expect(templateHandler.cleanupPlaceholder).toHaveBeenCalledTimes(1);
    expect(templateHandler.displayFlightsInPlaceholder).toHaveBeenCalledTimes(0);

    templateHandler.cleanupPlaceholder.mockClear();

    templateHandler.searchInput.value = "ab";
    templateHandler.searchInput.dispatchEvent(event);

    expect(templateHandler.cleanupPlaceholder).toHaveBeenCalledTimes(1);
    expect(templateHandler.displayFlightsInPlaceholder).toHaveBeenCalledTimes(0);

    spyDisplayFlight.mockClear();
  });

  it("should not display flights if searched flight does not exits", async () => {
    const templateHandler = new TemplateHandler();
    templateHandler.init();

    mockFlightsStub.mockReturnValueOnce(Promise.resolve([]));

    const event = document.createEvent("Event");
    event.initEvent("input", true, true);

    templateHandler.searchInput.value = "not-existing-flight";
    templateHandler.searchInput.dispatchEvent(event);

    expect(templateHandler.cleanupPlaceholder).toHaveBeenCalledTimes(0);
    await expect(mockFlightsStub).toHaveBeenCalledWith("not-existing-flight");
    expect(mockFound).toHaveBeenCalledTimes(0);
    expect(mockNotFound).toHaveBeenCalledTimes(1);
  });

  it("should display flights if searched flight does exits", async () => {
    const templateHandler = new TemplateHandler();
    templateHandler.init();

    mockFlightsStub.mockReturnValueOnce(Promise.resolve(JSON.stringify(flightsPayload)));

    const event = document.createEvent("Event");
    event.initEvent("input", true, true);

    templateHandler.searchInput.value = "san";
    templateHandler.searchInput.dispatchEvent(event);

    expect(templateHandler.cleanupPlaceholder).toHaveBeenCalledTimes(0);
    await expect(mockFlightsStub).toHaveBeenCalledWith("san");
    expect(mockFound).toHaveBeenCalledTimes(1);
    expect(mockNotFound).toHaveBeenCalledTimes(0);
  });
});
