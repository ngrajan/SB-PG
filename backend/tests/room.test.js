const request = require("supertest");
const app = require("../app");
const Room = require("../models/roomModel");

it("should create a new roow", async () => {
  // Arrange
  const roomData = {
    roomNumber: "101",
    share: 3,
    tenants: [],
    price: 1000,
    vacancies: 0,
  };
  // Act
  const response = await request(app).post("/api/v1/room").send(roomData);
  // Assert
  expect(response.status).toBe(201);

  expect(response.body.data).toMatchObject({
    roomNumber: roomData.roomNumber,
    share: roomData.share,
    price: roomData.price,
    vacancies: roomData.vacancies,
  });

  const room = await Room.findOne({ roomNumber: roomData.roomNumber });

  expect(room).not.toBeNull();
  expect(room.roomNumber).toBe(roomData.roomNumber);
  expect(room.vacancies).toBe(roomData.vacancies);
});

it("should get all the rooms", async () => {
  // Arrange
  const room1 = {
    roomNumber: "101",
    share: 3,
    tenants: [],
    price: 1000,
    vacancies: 3,
  };

  const room2 = {
    roomNumber: "102",
    share: 3,
    tenants: [],
    price: 1000,
    vacancies: 3,
  };

  await Room.create(room1);
  await Room.create(room2);
  // Act
  const response = await request(app).get("/api/v1/room");
  // Assert
  expect(response.status).toBe(200);

  expect(response.body.data).toHaveLength(2);

  const roomNumbers = response.body.data.map((room) => room.roomNumber);

  expect(roomNumbers).toContain("101");
  expect(roomNumbers).toContain("102");
});

it("should get a specific room", async () => {
  // Arrange
  const roomData = {
    roomNumber: "101",
    share: 3,
    tenants: [],
    price: 1000,
    vacancies: 3,
  };

  const room = await Room.create(roomData);
  // Act
  const response = await request(app).get(`/api/v1/room/${room._id}`);
  // Assert
  expect(response.status).toBe(200);

  expect(response.body.data).toMatchObject({
    roomNumber: roomData.roomNumber,
    share: roomData.share,
    price: roomData.price,
    vacancies: roomData.vacancies,
  });

  // expect(response.body.data).toHaveLength(1);
});

it("should update a room", async () => {
  // Arrange
  const roomData = {
    roomNumber: "101",
    share: 3,
    tenants: [],
    price: 1000,
    vacancies: 3,
  };

  const room = await Room.create(roomData);

  const updateData = {
    share: 4,
    price: 900,
  };

  // Act
  const response = await request(app)
    .patch(`/api/v1/room/${room._id}`)
    .send(updateData);

  // Assert - HTTP response
  expect(response.status).toBe(200);

  // Assert - API response
  expect(response.body.data).toMatchObject({
    roomNumber: roomData.roomNumber,
    share: updateData.share,
    price: updateData.price,
    vacancies: roomData.vacancies,
  });

  // Assert - Database response
  const updatedRoom = await Room.findById(room._id);
  expect(updatedRoom).not.toBeNull();

  expect(updatedRoom.share).toBe(updateData.share);
  expect(updatedRoom.price).toBe(updateData.price);

  expect(updatedRoom.roomNumber).toBe(roomData.roomNumber);
  expect(updatedRoom.vacancies).toBe(roomData.vacancies);
});

it("should delete a room", async () => {
  // Arrange
  const roomData = {
    roomNumber: "101",
    share: 3,
    tenants: [],
    price: 1000,
    vacancies: 3,
  };

  const room = await Room.create(roomData);

  // Act
  const response = await request(app).delete(`/api/v1/room/${room._id}`);

  // Assert - HTTP response
  expect(response.status).toBe(204);

  // Assert - API & DB response
  expect(response.body.data).toEqual(undefined);

  //  -- DB response
  const deletedRoom = await Room.findById(room._id);
  expect(deletedRoom).toBeNull();
});
