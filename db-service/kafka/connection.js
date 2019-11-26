const kafka = require("node-rdkafka");
const { kafka_connString, kafka_username, kafka_password } = require('../config');

class KafkaConnection {
    constructor() {
        this.kafkaConf = {
            "group.id": "group1",
            "metadata.broker.list": kafka_connString.split(","),
            "socket.keepalive.enable": true,
            "security.protocol": "SASL_SSL",
            "sasl.mechanisms": "SCRAM-SHA-256",
            "sasl.username": kafka_username,
            "sasl.password": kafka_password,
            "debug": "generic,broker,security"
        };
        this.producer = null;
        this.consumer = null;
    }


    init(requestTopic, requestCallback) {
        this._initConsumer(requestTopic, requestCallback);
        this._initProducer();
    }

    _initProducer() {
        this.producer = new kafka.Producer(this.kafkaConf);
        this.producer.on("ready", arg => console.log(`Produces ${arg.name} ready`));
        this.producer.on("event.error", err => console.error('producer event.err', err));
        this.producer.connect();
    }

    _initConsumer(requestTopic, requestCallback) {
        const topics = requestTopic.split(",");
        this.consumer = new kafka.KafkaConsumer(this.kafkaConf, { "auto.offset.reset": "beginning" });
        this.consumer.on("ready", arg => {
            console.log(`Consumer ${arg.name} ready`);
            this.consumer.subscribe(topics);
            this.consumer.consume();
        });
        this.consumer.on("data", data => {
            const jsonData = JSON.parse(data.value.toString());
            // console.log(jsonData);
            requestCallback(jsonData);

        });
        this.consumer.on("disconnected", err => console.error('consumer disconnected', err));
        this.consumer.on("event.error", err => console.error('consumer event.err', err));
        this.consumer.connect();
    }

    /*
        example "payload" = {
            correlationId: "abcd",
            data: { a: 1, b: 2 }
        };
    */
    send(topic, payload) {
        return this.producer.produce(topic, -1, Buffer.from(JSON.stringify(payload)));
    }
}

const kafkaConn = new KafkaConnection();
module.exports = {
    init: kafkaConn.init.bind(kafkaConn),
    send: kafkaConn.send.bind(kafkaConn)
};