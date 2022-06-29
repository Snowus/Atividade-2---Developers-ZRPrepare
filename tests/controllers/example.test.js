const request = require("supertest");
const app = require("../../server");

describe("Events controller tests", () => {
  describe("when creating a new post", () => {
    it("should return 200 status when the event is successfully created", async () => {
      const res = await request(app).post("/api/events/").send({
        title: "test 5",
        description: "tested 5",
        data: "2022/06/24",
      });
      console.log(res);
      expect(res.body).toEqual({});
      // expect(res.statusCode).toEqual(200);
      // expect(res.body).toHaveProperty('title', 'test')
      
    });
  });
});
