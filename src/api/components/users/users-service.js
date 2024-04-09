const usersRepository = require('./users-repository');

/**
 * Get list of users
 * @returns {Array}
 */
async function getUsers() {
  const users = await usersRepository.getUsers();

  const results = [];
  for (let i = 0; i < users.length; i += 1) {
    const user = users[i];
    results.push({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  return results;
}

/**
 * Get user detail
 * @param {string} id - User ID
 * @returns {Object}
 */
async function getUser(id) {
  const user = await usersRepository.getUser(id);

  if (!user) {
    return null;
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
}

/**
 * Create new user
 * @param {string} name - Name
 * @param {string} email - Email
 * @param {string} password - Password
 * @returns {boolean}
 */
async function createUser(name, email, password) {
  const userExists = await checkEmailExists(email);

  if (userExists) {
    return null; // Email already exists
  }

  try {
    // Continue with user creation
    const newUser = await usersRepository.createUser(name, email, password);
    return newUser; // Return the newly created user object
  } catch (error) {
    throw new Error('Failed to create user: ' + error.message);
  }
}

/**
 * Update existing user
 * @param {string} id - User ID
 * @param {string} name - Name
 * @param {string} email - Email
 * @returns {boolean}
 */
async function updateUser(id, name, email) {
  const user = await usersRepository.getUser(id);

  if (!user) {
    return null;
  }

  const userExists = await checkEmailExists(email);

  if (userExists && user.email !== email) {
    return null; // Email already exists
  }

  // Continue with user update
}

async function deleteUser(id) {
  const user = await usersRepository.getUser(id);

  if (!user) {
    return null;
  }

  // Continue with user deletion
}

async function checkEmailExists(email) {
  const userExists = await usersRepository.checkUserByEmail(email);
  return userExists;
}

/**
 * Change user password
 * @param {string} id - User ID
 * @param {string} oldPassword - Old password
 * @param {string} newPassword - New password
 * @returns {boolean} - Returns true if password changed successfully, false otherwise
 */
async function changePassword(id, oldPassword, newPassword) {
  // Change the password in the repository
  const success = await usersRepository.changePassword(
    id,
    oldPassword,
    newPassword
  );
  return success;
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  checkEmailExists,
  changePassword,
};
