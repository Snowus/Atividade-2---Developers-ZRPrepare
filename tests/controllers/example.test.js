const request = require("supertest");
const app = require("../../server");

describe("Events controller tests", () => {
  const SequelizeMock = require("sequelize-mock-v5");
  const mockDb = new SequelizeMock();

  jest.mock("../../app/models/event", () => {
    return mockDb.define("Event", {
      title: "lorem",
      description: "lorem ipsum",
      data: new Date(),
      local: "metropolis",
      color: "#000000",
      published: false,
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  describe("when creating a new post", () => {
    it("should return 200 status when the event is successfully created", async () => {
      const res = await request(app).post("/api/events/").send({
        title: "test",
        description: "tested 5",
        data: "2022/06/24",
      });

      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty("title", "test");
      expect(res.body).toHaveProperty("description", "tested 5");
      expect(res.body).toHaveProperty("data", "2022-06-24");
    });

    it("should return 400 when the res body doesn't have the title properties", async () => {
      const res = await request(app).post("/api/events/").send({
        description: "tested 5",
        data: "2022/06/24",
      });

      expect(res.status).toEqual(400);
      expect(res.body).toHaveProperty(
        "message",
        "Title: Content can not be empty!"
      );
    });

    it("should return 400 when the res body doesn't have the data properties", async () => {
      const res = await request(app).post("/api/events/").send({
        title: "test",
        description: "tested 5",
      });

      expect(res.status).toEqual(400);
      expect(res.body).toHaveProperty(
        "message",
        "Data: Content can not be empty!"
      );
    });
  });

  describe("when retrieving all events", () => {
    it("should return 200 status when the events are successfully retrieved", async () => {
      const res = await request(app).get("/api/events/");

      expect(res.status).toEqual(200);
      expect(res.body).toHaveProperty("length", 1);
    });
  });
});
