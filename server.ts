import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import { ChatProtoGrpcType } from "./proto/chat";
import { ChatRequest } from "./proto/chatPackage/ChatRequest";
import { ChatResponse } from "./proto/chatPackage/ChatResponse";
import { ChatStreamHandlers } from "./proto/chatPackage/ChatStream";
import { ConnectionProtoGrpcType } from "./proto/connection";
import { ConnectionHandlers } from "./proto/connectionPackage/Connection";
import { CountProtoGrpcType } from "./proto/count";
import { CountHandlers } from "./proto/countPackage/Count";

const PORT = 5050;
const chatPackageDef = protoLoader.loadSync(
  path.resolve(__dirname, "./proto/chat.proto")
);
const grpcChatObj = grpc.loadPackageDefinition(
  chatPackageDef
) as unknown as ChatProtoGrpcType;
const chatPackage = grpcChatObj.chatPackage;

const connectionPackageDef = protoLoader.loadSync(
  path.resolve(__dirname, "./proto/connection.proto")
);
const grpcIdObj = grpc.loadPackageDefinition(
  connectionPackageDef
) as unknown as ConnectionProtoGrpcType;
const connectionPackage = grpcIdObj.connectionPackage;

const countPackageDef = protoLoader.loadSync(
  path.resolve(__dirname, "./proto/count.proto")
);
const grpcCountObj = grpc.loadPackageDefinition(
  countPackageDef
) as unknown as CountProtoGrpcType;
const countPackage = grpcCountObj.countPackage;

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
  server.addService(connectionPackage.Connection.service, {
    GetConnected: (req: any, res: any) => {
      console.log(req.request);
      res(null, { message: "Server connected successfully!" });
    },
  } as ConnectionHandlers);
  server.addService(countPackage.Count.service, {
    CountFunction: (call) => {
      const { lessonLength = 60 } = call.request;
      // console.log({lessonLength})

      let onlineTime = 0;
      let timeTillBreak = lessonLength;
      const timer = setInterval(() => {
        onlineTime = onlineTime + 10;
        timeTillBreak = lessonLength - onlineTime;
        call.write({ num: Math.floor(lessonLength - onlineTime) });

        if (timeTillBreak <= 0) {
          clearInterval(timer);
          call.end();
        }
        console.log(`Lesson will end in ${timeTillBreak} minutes`);
      }, 10 * 60 * 1000);
    },
  } as CountHandlers);
  server.addService(chatPackage.ChatStream.service, {
    Chat: (call) => {
      call.on("data", (req) => {
        const username = call.metadata.get("username")[0] as string;
        const msg = req.message;
        console.log(`${username}: ${msg}`);

        for (let [user, usersCall] of callObjByUsername) {
          if (username !== user) {
            usersCall.write({
              username: username + ":",
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
            message: `${user} has left the classroom`,
          });
        }
        console.log(`${username} has left the classroom`);

        call.write({
          username: "-",
          message: `Good bye ${username}!`,
        });

        call.end();
      });
    },
  } as ChatStreamHandlers);

  return server;
}

main();
