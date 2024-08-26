const { kafka } = require("./client");

async function init() {
  const producer = kafka.producer();
  console.log("Connecting producer...");
  await producer.connect();
  console.log("Connection successful");

  await producer.send({
    topic: "riderUpdate",
    messages: [
      {
        partition: 0,
        key: "Location-message",
        value: JSON.stringify({ name: "piyush", location: "SOUTH" }),
      },
    ],
  });

  await producer.disconnect();
  console.log("Producer disconnected");
}

init().catch(console.error);
