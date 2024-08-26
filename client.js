const { Kafka } = require("kafkajs");

exports.kafka = new Kafka({
  clientId: "kafka",
  brokers: ["IPAdress:9092"],
});
