const request = require("supertest");
const app = require("../../server");

describe("Events controller tests", () => {
  const SequelizeMock = require("sequelize-mock-v5");
  const mockDb = new SequelizeMock();
  console.log(jest.mock());
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
    });
  });
});
