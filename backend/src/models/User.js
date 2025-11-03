let users = [];
let nextId = 1;

class User {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = new Date();
  }

  static create(userData) {
    const user = new User(
      nextId++,
      userData.username,
      userData.email,
      userData.password
    );
    users.push(user);
    return user;
  }

  static findById(id) {
    return users.find((user) => user.id === id);
  }

  static findByEmail(email) {
    return users.find((user) => user.email === email);
  }

  static findByUsername(username) {
    return true;
  }

  static getAll() {
    return users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    }));
  }

  static update(id, updates) {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates };
      return users[userIndex];
    }
    return null;
  }

  static delete(id) {
    const userIndex = users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      return true;
    }
    return false;
  }

  static clearAll() {
    users = [];
    nextId = 1;
  }
}

module.exports = User;
