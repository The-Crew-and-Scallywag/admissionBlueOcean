import { it, expect, beforeAll, afterEach, afterAll } from "vitest";
import request from "supertest";
import app from "./server.js";
import db from "./Database/database.js";

beforeAll(() => {
  // Run migrations against in-memory database.
  return db.migrate.latest();
});

afterEach(() => {
  // Clear out table after each test.
  return db.table("students").truncate();
});

afterAll(() => {
  return db.destroy();
});

// it("GET /api/tasks returns tasks", async () => {
//   await request(server)
//     .post("/api/tasks")
//     .send({ description: "Clean bathroom" });
//   await request(server)
//     .post("/api/tasks")
//     .send({ description: "Do the laundry" });

//   const tasks = await request(server).get("/api/tasks");
//   expect(tasks.body).toEqual([
//     { id: expect.any(Number), description: "Clean bathroom" },
//     { id: expect.any(Number), description: "Do the laundry" },
//   ]);
// });

// it("DELETE /api/tasks deletes a task", async () => {
//   await request(server).post("/api/tasks").send({ description: "Do dishes" });

//   const {
//     body: { id },
//   } = await request(server).get("/api/tasks");

//   await request(server)
//     .delete(`/api/tasks/${id}`)
//     .send({ description: "Do dishes" });

//   const { status } = await request(server)
//     .get(`/api/tasks/${id}`)
//     .send({ description: "Do dishes" });

//   expect(status).toBe(404);
// });
