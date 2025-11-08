const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
  try {
    const {
      articleNo,
      productService,
      inPrice,
      price,
      unit,
      inStock,
      description,
    } = req.body;

    if (!productService) {
      return res.status(400).json({
        message: "Product/Service name is required",
      });
    }

    if (!price || isNaN(parseFloat(price))) {
      return res.status(400).json({
        message: "Valid price is required",
      });
    }

    const productData = {
      articleNo,
      productService,
      inPrice: parseFloat(inPrice) || 0,
      price: parseFloat(price),
      unit,
      inStock: parseInt(inStock) || 0,
      description,
      userId: req.userId,
    };

    const product = await Product.create(productData);

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Create product error:", error);
    res.status(500).json({
      message: "Error creating product",
      error: error.message,
    });
  }
};

exports.getUserProducts = async (req, res) => {
  try {
    const products = await Product.findByUserId(req.userId);

    res.json({
      message: "Products retrieved successfully",
      products,
      count: products.length,
    });
  } catch (error) {
    console.error("Get user products error:", error);
    res.status(500).json({
      message: "Error retrieving products",
      error: error.message,
    });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (req.userId && product.userId !== req.userId) {
      return res.status(403).json({
        message: "You do not have permission to view this product",
      });
    }

    res.json({
      message: "Product retrieved successfully",
      product,
    });
  } catch (error) {
    console.error("Get product error:", error);
    res.status(500).json({
      message: "Error retrieving product",
      error: error.message,
    });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (existingProduct.userId !== req.userId) {
      return res.status(403).json({
        message: "You do not have permission to update this product",
      });
    }

    if (updates.price !== undefined && isNaN(parseFloat(updates.price))) {
      return res.status(400).json({
        message: "Invalid price value",
      });
    }

    if (updates.inPrice !== undefined) {
      updates.inPrice = parseFloat(updates.inPrice) || 0;
    }
    if (updates.price !== undefined) {
      updates.price = parseFloat(updates.price);
    }
    if (updates.inStock !== undefined) {
      updates.inStock = parseInt(updates.inStock) || 0;
    }

    const updatedProduct = await Product.update(id, updates);

    res.json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Update product error:", error);
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const existingProduct = await Product.findById(id);

    if (!existingProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    if (existingProduct.userId !== req.userId) {
      return res.status(403).json({
        message: "You do not have permission to delete this product",
      });
    }

    await Product.delete(id);

    res.json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);
    res.status(500).json({
      message: "Error deleting product",
      error: error.message,
    });
  }
};

exports.batchUpdateProducts = async (req, res) => {
  try {
    const { updates } = req.body;
    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({
        message: "Updates array is required",
      });
    }

    const updatedProducts = [];
    const errors = [];

    for (const { id, changes } of updates) {
      try {
        const existingProduct = await Product.findById(id);

        if (!existingProduct) {
          errors.push({ id, error: "Product not found" });
          continue;
        }

        if (existingProduct.userId !== req.userId) {
          errors.push({ id, error: "Permission denied" });
          continue;
        }

        const sanitizedChanges = { ...changes };

        if (
          sanitizedChanges.price !== undefined &&
          isNaN(parseFloat(sanitizedChanges.price))
        ) {
          errors.push({ id, error: "Invalid price value" });
          continue;
        }

        if (sanitizedChanges.inPrice !== undefined) {
          sanitizedChanges.inPrice = parseFloat(sanitizedChanges.inPrice) || 0;
        }
        if (sanitizedChanges.price !== undefined) {
          sanitizedChanges.price = parseFloat(sanitizedChanges.price);
        }
        if (sanitizedChanges.inStock !== undefined) {
          sanitizedChanges.inStock = parseInt(sanitizedChanges.inStock) || 0;
        }

        const updatedProduct = await Product.update(id, sanitizedChanges);
        updatedProducts.push(updatedProduct);
      } catch (error) {
        errors.push({ id, error: error.message });
      }
    }

    res.json({
      message: "Batch update completed",
      updated: updatedProducts,
      errors: errors.length > 0 ? errors : undefined,
      successCount: updatedProducts.length,
      errorCount: errors.length,
    });
  } catch (error) {
    console.error("Batch update error:", error);
    res.status(500).json({
      message: "Error performing batch update",
      error: error.message,
    });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.getAll();

    res.json({
      message: "All products retrieved successfully",
      products,
      count: products.length,
    });
  } catch (error) {
    console.error("Get all products error:", error);
    res.status(500).json({
      message: "Error retrieving products",
      error: error.message,
    });
  }
};
