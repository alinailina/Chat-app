// Helper functions to manage users

const users = [];

// Add user
const addUser = ({ id, name, room }) => {
  // Modify data
  name = name.trim().toLowerCase;
  room = room.trim().toLowerCase;
  // ---> .trim() removes the leading and trailing white space and line terminator characters from a string

  // Check if there's already a user with this name
  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (existingUser) {
    return { error: "Username is taken" };
  }

  // If a user doesn't exist
  const user = { id, name, room };
  users.push(user);
  return { user };
};

// Remove user
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// Get user
const getUser = (id) => users.find((user) => user.id === id);

// Ger all users in room
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom };
