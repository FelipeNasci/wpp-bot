import { Http } from "../../../../src/services/http";

const dataPostMock = { method: "post" };
const dataGetMock = { method: "get" };

jest.mock("axios", () => ({
  get: () => Promise.resolve({ status: 200, data: dataGetMock }),
  post: () => Promise.resolve({ status: 200, data: dataPostMock }),
}));

const makeSut = () => ({ sut: Http.getInstance() });

describe("Unit | HTTP", () => {
  const url = "url";
  const { sut } = makeSut();

  it("returns a HTTP instance", () => {
    expect(sut).toBeInstanceOf(Http);
  });

  describe("GET Method", () => {
    it("calls get method", () => {
      const spy = jest.spyOn(sut, "get");
      sut.get(url);
      expect(spy).toHaveBeenCalled();
    });

    it("returns the properties from get method correctly ", async () => {
      const data = await sut.get(url);
      const properties = ["data", "status"];
      properties.forEach((property) => expect(data).toHaveProperty(property));
    });
  });

  describe("POST Method", () => {
    const data = { key: "value" };

    it("calls post method", async () => {
      const spy = jest.spyOn(sut, "post");
      await sut.post(url, data);
      expect(spy).toHaveBeenCalled();
    });

    it("returns the correct response from post method ", async () => {
      const response = await sut.post(url, data);
      expect(response.data).toEqual(dataPostMock);
    });

    it("returns the properties from post method correctly ", async () => {
      const data = await sut.post(url, dataPostMock);
      const properties = ["data", "status"];
      properties.forEach((property) => expect(data).toHaveProperty(property));
    });
  });
});
