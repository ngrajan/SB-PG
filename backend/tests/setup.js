const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoserver;

beforeAll(async () => {
  mongoserver = await MongoMemoryServer.create();
  const uri = mongoserver.getUri();
  await mongoose.connect(uri);
});

beforeEach(async () => {
  for (const collection of Object.values(mongoose.connection.collections)) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  mongoose.disconnect();
  if (mongoserver) await mongoserver.stop();
});
