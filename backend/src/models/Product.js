const { pool } = require("../config/database");

class Product {
  constructor(productData) {
    this.id = productData.id;
    this.articleNo = productData.article_no;
    this.productService = productData.product_service;
    this.inPrice = productData.in_price;
    this.price = productData.price;
    this.unit = productData.unit;
    this.inStock = productData.in_stock;
    this.description = productData.description;
    this.userId = productData.user_id;
    this.createdAt = productData.created_at;
    this.updatedAt = productData.updated_at;
  }

  static async create(productData) {
    try {
      const query = `
        INSERT INTO products (
          article_no, product_service, in_price, price, unit, in_stock, description, user_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *
      `;

      const values = [
        productData.articleNo || null,
        productData.productService,
        productData.inPrice || 0,
        productData.price,
        productData.unit || null,
        productData.inStock || 0,
        productData.description || null,
        productData.userId,
      ];

      const result = await pool.query(query, values);
      return new Product(result.rows[0]);
    } catch (error) {
      throw error;
    }
  }

  static async findById(id) {
    try {
      const query = "SELECT * FROM products WHERE id = $1";
      const result = await pool.query(query, [id]);

      if (result.rows.length === 0) {
        return null;
      }

      return new Product(result.rows[0]);
    } catch (error) {
      throw error;
    }
  }

  static async findByUserId(userId) {
    try {
      const query = `
        SELECT * FROM products
        WHERE user_id = $1
        ORDER BY created_at DESC
      `;
      const result = await pool.query(query, [userId]);

      return result.rows.map((row) => new Product(row));
    } catch (error) {
      throw error;
    }
  }

  static async getAll() {
    try {
      const query = "SELECT * FROM products ORDER BY created_at DESC";
      const result = await pool.query(query);

      return result.rows.map((row) => new Product(row));
    } catch (error) {
      throw error;
    }
  }

  static async update(id, updates) {
    try {
      const fieldMap = {
        articleNo: "article_no",
        productService: "product_service",
        inPrice: "in_price",
        price: "price",
        unit: "unit",
        inStock: "in_stock",
        description: "description",
      };

      const fields = [];
      const values = [];
      let paramCount = 1;

      for (const [key, value] of Object.entries(updates)) {
        const dbField = fieldMap[key] || key;
        fields.push(`${dbField} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }

      if (fields.length === 0) {
        return await Product.findById(id);
      }

      values.push(id);
      const query = `
        UPDATE products
        SET ${fields.join(", ")}
        WHERE id = $${paramCount}
        RETURNING *
      `;

      const result = await pool.query(query, values);

      if (result.rows.length === 0) {
        return null;
      }

      return new Product(result.rows[0]);
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const query = "DELETE FROM products WHERE id = $1 RETURNING *";
      const result = await pool.query(query, [id]);

      if (result.rows.length === 0) {
        return null;
      }

      return new Product(result.rows[0]);
    } catch (error) {
      throw error;
    }
  }

  static async belongsToUser(productId, userId) {
    try {
      const query = "SELECT id FROM products WHERE id = $1 AND user_id = $2";
      const result = await pool.query(query, [productId, userId]);
      return result.rows.length > 0;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Product;
