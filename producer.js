const { kafka } = require("./client");
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function init() {
  const producer = kafka.producer();

  console.log("Connecting Producer");
  await producer.connect();
  console.log("Producer Connected Successfully");

  rl.setPrompt("> ");
  rl.prompt();

  rl.on("line", async function (line) {
    try {
      const [riderName, location] = line.split(" ");
      const partition = location.toLowerCase() === "north" ? 0 : 1;
      await producer.send({
        topic: "rider-updates",
        messages: [
          {
            partition: partition,
            key: "location-update",
            value: JSON.stringify({ name: riderName, location }),
          },
        ],
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  }).on("close", async () => {
    await producer.disconnect();
  });
}

init();
