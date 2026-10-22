const mqtt = require("mqtt");
const crypto = require("crypto");

// Same broker and topic as sensor
const BROKER_URL = "mqtt://broker.hivemq.com";
const TOPIC = "kiwi-smarthome-sprinkler";


const client = mqtt.connect(BROKER_URL, {
  connectTimeout: 10000,
  reconnectPeriod: 2000,
});

client.on("connect", () => {
  console.log("✅ Backend connected to MQTT broker:", BROKER_URL);

  client.subscribe(TOPIC, (err) => {
    if (err) {
      console.error("❌ Subscribe error:", err.message);
    } else {
      console.log("👂 Backend listening on topic:", TOPIC);
    }
  });
});

client.on("message", (topic, message) => {
  try {
    const raw = message.toString();
    const data = JSON.parse(raw);

    // Generate SHA256 hash
    const hash = crypto
      .createHash("sha256")
      .update(JSON.stringify(data))
      .digest("hex");

    // Prepare payload for blockchain storage
    const blockchainReadyPayload = {
      deviceId: data.deviceId,
      dataHash: hash,
      receivedAt: new Date().toISOString(),
    };

    console.log("\n📥 Data received:");
    console.log(data);

    console.log("🔐 SHA256 Hash:");
    console.log(hash);

    console.log("📦 Blockchain-ready payload:");
    console.log(blockchainReadyPayload);

  } catch (err) {
    console.error("❌ Error processing message:", err.message);
    console.error("Raw message:", message.toString());
  }
});

client.on("reconnect", () => console.log("🔄 Reconnecting to broker..."));
client.on("error", (err) => console.error("❌ MQTT error:", err.message));
client.on("close", () => console.log("🔌 Connection closed"));

