import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import readline from "readline";
import { ChatProtoGrpcType } from "./proto/chat";
import { ConnectionProtoGrpcType } from "./proto/connection";
import { CountProtoGrpcType } from "./proto/count";

const PORT = 5050;
const chatPackageDef = protoLoader.loadSync(
  path.resolve(__dirname, "./proto/chat.proto")
);
const grpcChatObj = grpc.loadPackageDefinition(
  chatPackageDef
) as unknown as ChatProtoGrpcType;
const connectionPackageDef = protoLoader.loadSync(
  path.resolve(__dirname, "./proto/connection.proto")
);
const grpcConnectionObj = grpc.loadPackageDefinition(
  connectionPackageDef
) as unknown as ConnectionProtoGrpcType;
const countPackageDef = protoLoader.loadSync(
  path.resolve(__dirname, "./proto/count.proto")
);
const grpcCountObj = grpc.loadPackageDefinition(
  countPackageDef
) as unknown as CountProtoGrpcType;

const client1 = new grpcConnectionObj.connectionPackage.Connection(
  `0.0.0.0:${PORT}`,
  grpc.credentials.createInsecure()
);
const client2 = new grpcCountObj.countPackage.Count(
  `0.0.0.0:${PORT}`,
  grpc.credentials.createInsecure()
);

const client4 = new grpcChatObj.chatPackage.ChatStream(
  `0.0.0.0:${PORT}`,
  grpc.credentials.createInsecure()
);

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
client4.waitForReady(deadline, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  onClientReady();
});

function onClientReady() {
  client1.GetConnected(
    { message: "Client-side has been connected successfully!" },
    (err: any, result: any) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(result);
    }
  );

  const stream1 = client2.CountFunction({ lessonLength: 60 });
  stream1.on("data", (chunk) => {
    console.log(`Lesson will end in ${chunk.num} minutes`);
  });
  stream1.on("end", () => {
    console.log("Lesson finished!");
  });

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const username = process.argv[2];
  if (!username)
    console.error("Please enter your name to join the class"), process.exit();

  const metadata = new grpc.Metadata();
  metadata.set("username", username);
  const call = client4.Chat(metadata);
  console.log("metadata.getMap", metadata.getMap);

  call.write({
    message: "has joined the classroom",
  });

  call.on("data", (chunk) => {
    console.log(`${chunk.username} ${chunk.message}`);
  });

  rl.on("line", (line) => {
    if (line === "bye") {
      call.end();
    } else {
      call.write({
        message: line,
      });
    }
  });
}
