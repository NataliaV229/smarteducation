import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import path from "path";
import readline from "readline";
import { ChatProtoGrpcType } from "./proto/chat";
import { ConnectionProtoGrpcType } from "./proto/connection";
import { CountProtoGrpcType } from "./proto/count";
import { SubjectProtoGrpcType } from "./proto/subject";

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
const subjectPackageDef = protoLoader.loadSync(
  path.resolve(__dirname, "./proto/subject.proto")
);
const grpcSubjectObj = grpc.loadPackageDefinition(
  subjectPackageDef
) as unknown as SubjectProtoGrpcType;

const client1 = new grpcConnectionObj.connectionPackage.Connection(
  `0.0.0.0:${PORT}`,
  grpc.credentials.createInsecure()
);
const client2 = new grpcCountObj.countPackage.Count(
  `0.0.0.0:${PORT}`,
  grpc.credentials.createInsecure()
);
const client3 = new grpcSubjectObj.subjectPackage.SetSubject(
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
      console.log(
        `Write a message in classroom chat or send today's subject to server by "subject: your_subject"`
      );
    }
  );

  // const stream1 = client2.CountFunction({ lessonLength: 60 });
  // stream1.on("data", (chunk) => {
  //   console.log(`Lesson will end in ${chunk.num} minutes`);
  // });
  // stream1.on("end", () => {
  //   console.log("Lesson finished!");
  // });

  const stream2 = client3.Subjects((err, result) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Subjects list has been finished with next results:");
    console.log(result);
  });

  const commandInput = readline.createInterface({
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
    message: "Just joined the classroom",
  });

  call.on("data", (data) => {
    console.log(`${data.username} ${data.message}`);
  });

  commandInput.on("line", (line) => {
    if (line.startsWith("subject:")) {
      stream2.write({
        subject: line.substring("subject:".length),
        student: username,
      });
      console.log("-- Subject sent successfully! --");
    } else if (line === "end-subjects-list") {
      stream2.end();
    } else if (line === "bye") {
      call.end();
    } else {
      call.write({
        message: line,
      });
    }
  });
}
