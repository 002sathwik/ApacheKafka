const { kafka } = require("./client");

async function init() {
  const admin = kafka.admin();
  console.log("Admin connecting...");

  await admin.connect();
  console.log("Admin connection successful");

  console.log("Creating topics...");
  await admin.createTopics({
    topics: [
      {
        topic: "rider-updates",
        numPartitions: 2,
      },
    ],
  });
  
  console.log("Topics created");

  await admin.disconnect();
}

init().catch(console.error);
