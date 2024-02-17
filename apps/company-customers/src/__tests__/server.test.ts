import supertest from "supertest";
import { app } from "../index";

describe("server", () => {
  it("health check returns 200", async () => {
    await supertest(app.start())
      .get("/ping")
      .expect(200)
      .then((res) => {
        expect(res.body.ok).toBe(true);
      });
  });

  it("message endpoint says hello", async () => {
    await supertest(app.start())
      .get("/message/jared")
      .expect(200)
      .then((res) => {
        expect(res.body).toEqual({ message: "hello jared" });
      });
  });
});
