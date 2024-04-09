const usersRepository = require('./users-repository');

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

async function createUser(name, email, password, password_confirm) {
  const userExists = await checkEmailExists(email);

  // Check if passwords match
  if (password !== password_confirm) {
    throw errorResponder(errorTypes.INVALID_PASSWORD, 'Passwords do not match');
  }

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

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  checkEmailExists,
};
