const { pool } = require('../config/database');

class User {
  constructor(id, username, email, password, created_at, updated_at) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }

  static async create(userData) {
    try {
      const result = await pool.query(
        'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
        [userData.username, userData.email, userData.password]
      );
      const row = result.rows[0];
      return new User(
        row.id,
        row.username,
        row.email,
        row.password,
        row.created_at,
        row.updated_at
      );
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
      if (result.rows.length === 0) {
        return null;
      }
      const row = result.rows[0];
      return new User(
        row.id,
        row.username,
        row.email,
        row.password,
        row.created_at,
        row.updated_at
      );
    } catch (error) {
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      if (result.rows.length === 0) {
        return null;
      }
      const row = result.rows[0];
      return new User(
        row.id,
        row.username,
        row.email,
        row.password,
        row.created_at,
        row.updated_at
      );
    } catch (error) {
      throw error;
    }
  }

  static async findByUsername(username) {
    try {
      const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
      if (result.rows.length === 0) {
        return null;
      }
      const row = result.rows[0];
      return new User(
        row.id,
        row.username,
        row.email,
        row.password,
        row.created_at,
        row.updated_at
      );
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    try {
      const result = await pool.query('SELECT id, username, email, created_at FROM users');
      return result.rows.map(row => ({
        id: row.id,
        username: row.username,
        email: row.email,
        createdAt: row.created_at,
      }));
    } catch (error) {
      throw error;
    }
  }

  static async update(id, updates) {
    try {
      const fields = [];
      const values = [];
      let paramCount = 1;

      if (updates.username) {
        fields.push(`username = $${paramCount++}`);
        values.push(updates.username);
      }
      if (updates.email) {
        fields.push(`email = $${paramCount++}`);
        values.push(updates.email);
      }
      if (updates.password) {
        fields.push(`password = $${paramCount++}`);
        values.push(updates.password);
      }

      if (fields.length === 0) {
        return null;
      }

      values.push(id);
      const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${paramCount} RETURNING *`;

      const result = await pool.query(query, values);
      if (result.rows.length === 0) {
        return null;
      }
      const row = result.rows[0];
      return new User(
        row.id,
        row.username,
        row.email,
        row.password,
        row.created_at,
        row.updated_at
      );
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
      return result.rows.length > 0;
    } catch (error) {
      throw error;
    }
  }

  static async clearAll() {
    try {
      await pool.query('DELETE FROM users');
      await pool.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
    } catch (error) {
      throw error;
    }
  }
}

module.exports = User;
