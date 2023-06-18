const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];


const addUser = (userEmail, socketId) => {
  !users.some((user) => user.email === userEmail) &&
    users.push({ userEmail, socketId });
 };

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userEmail) => {
  return users.find((user) => user.userEmail=== userEmail);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  socket.on("addUser", (userEmail) => {
    addUser(userEmail, socket.id);
    console.log("this is-------------------------- userId", userEmail);
    console.log("sockiet Id", socket.id);

    io.emit("getUsers", users);

  });

  //send and get messagess
  socket.on("sendMessage", ({ senderId,  receiverId, text }) => {
    const user = getUser(receiverId);



    console.log("second Uderwss,,", user);
    

    io.emit("getMessage", {
    senderId,
      text,
    });




    
  });
  
  //when disconnect
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});