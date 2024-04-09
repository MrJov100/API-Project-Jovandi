const { User } = require('../../../models');

async function getUsers() {
  return User.find({});
}

async function getUser(id) {
  return User.findById(id);
}

async function createUser(name, email, password, password_confirm) {
  return User.create({
    name,
    email,
    password,
    password_confirm,
  });
}

async function updateUser(id, name, email) {
  return User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name,
        email,
      },
    }
  );
}

async function deleteUser(id) {
  return User.deleteOne({ _id: id });
}

/**
 * Check if a user with a specific email already exists
 * @param {string} email - Email to check
 * @returns {Promise<boolean>} - True if user with email exists, false otherwise
 */
async function checkUserByEmail(email) {
  const user = await User.findOne({ email });
  return !!user;
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  checkUserByEmail, // Add the new function to exports
};
