import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import readline from "readline";
import { ChatProtoGrpcType } from "./proto/chat";

const PORT = 5050;
const chatPackageDef = protoLoader.loadSync(
  path.resolve(__dirname, "./proto/chat.proto")
);
const grpcChatObj = grpc.loadPackageDefinition(
  chatPackageDef
) as unknown as ChatProtoGrpcType;

const client = new grpcChatObj.chatPackage.ChatStream(
  `0.0.0.0:${PORT}`,
  grpc.credentials.createInsecure()
);

const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 5);
client.waitForReady(deadline, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  onClientReady();
});

function onClientReady() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const username = process.argv[2];
  if (!username)
    console.error("Please enter your name to join the class"), process.exit();

  const metadata = new grpc.Metadata();
  metadata.set("username", username);
  const call = client.Chat(metadata);

  call.write({
    message: "has joined the classroom",
  });

  call.on("data", (chunk) => {
    console.log(`${chunk.username} ==> ${chunk.message}`);
  });

  rl.on("line", (line) => {
    if (line === "quit") {
      call.end();
    } else {
      call.write({
        message: line,
      });
    }
  });
}
