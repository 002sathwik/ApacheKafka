const { Kafka } = require("kafkajs");

exports.kafka = new Kafka({
  clientId: "kafka",
  brokers: ["192.168.1.105:9092"],
});
