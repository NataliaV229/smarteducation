import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { ChatProtoGrpcType } from "./proto/chat";
import { ChatRequest } from "./proto/chatPackage/ChatRequest";
import { ChatResponse } from "./proto/chatPackage/ChatResponse";
import { ChatStreamHandlers } from "./proto/chatPackage/ChatStream";

const PORT = 5050;
const chatPackageDef = protoLoader.loadSync(
  path.resolve(__dirname, "./proto/chat.proto")
);
const grpcChatObj = grpc.loadPackageDefinition(
  chatPackageDef
) as unknown as ChatProtoGrpcType;
const chatPackage = grpcChatObj.chatPackage;

function main() {
  const server = getServer();
  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Server started on port http://0.0.0.0:${port}`);
    }
  );
}

const callObjByUsername = new Map<
  string,
  grpc.ServerDuplexStream<ChatRequest, ChatResponse>
>();

function getServer() {
  const server = new grpc.Server();
  server.addService(chatPackage.ChatStream.service, {
    Chat: (call) => {
      call.on("data", (req) => {
        const username = call.metadata.get("username")[0] as string;
        const msg = req.message;
        console.log(username, req.message);

        for (let [user, usersCall] of callObjByUsername) {
          if (username !== user) {
            usersCall.write({
              username: username,
              message: msg,
            });
          }
        }

        if (callObjByUsername.get(username) === undefined) {
          callObjByUsername.set(username, call);
        }
      });

      call.on("end", () => {
        const username = call.metadata.get("username")[0] as string;
        callObjByUsername.delete(username);
        for (let [user, usersCall] of callObjByUsername) {
          usersCall.write({
            username: username,
            message: `Has Left the Chat! ${user}`,
          });
        }
        console.log(`${username} is ending their chat session`);

        call.write({
          username: "Server",
          message: `See you later ${username}`,
        });

        call.end();
      });
    },
  } as ChatStreamHandlers);

  return server;
}

main();
