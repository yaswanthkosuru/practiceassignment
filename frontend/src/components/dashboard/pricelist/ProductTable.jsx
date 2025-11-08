import { useState, useEffect, useRef } from "react";
import "./ProductTable.css";
import Input from "../../ui/Input";
import SaveConfirmationModal from "../../common/SaveConfirmationModal";

const ProductTable = ({ products, onBatchUpdate, loading, error }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [localProducts, setLocalProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const pendingNavigationRef = useRef(null);

  useEffect(() => {
    setLocalProducts(products);
    setOriginalProducts(products);
  }, [products]);

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const getSortedProducts = () => {
    if (!sortConfig.key) return localProducts;

    return [...localProducts].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return "⤓";
    return sortConfig.direction === "asc" ? "↓" : "↑";
  };

  const getChangedProducts = () => {
    const changes = [];

    localProducts.forEach((localProduct) => {
      const original = originalProducts.find((p) => p.id === localProduct.id);
      if (!original) return;

      const changedFields = {};
      const fields = [
        "articleNo",
        "productService",
        "inPrice",
        "price",
        "unit",
        "inStock",
        "description",
      ];

      fields.forEach((field) => {
        if (localProduct[field] !== original[field]) {
          changedFields[field] = localProduct[field];
        }
      });

      if (Object.keys(changedFields).length > 0) {
        changes.push({ id: localProduct.id, changes: changedFields });
      }
    });

    return changes;
  };

  const hasUnsavedChanges = () => {
    return getChangedProducts().length > 0;
  };

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges()) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [localProducts, originalProducts]);

  const handleProductChange = (productId, field, value) => {
    const updatedProducts = localProducts.map((product) =>
      product.id === productId ? { ...product, [field]: value } : product
    );
    setLocalProducts(updatedProducts);
  };

  const handleSaveAll = async () => {
    const changes = getChangedProducts();
    if (changes.length === 0) return;

    setIsSaving(true);
    try {
      await onBatchUpdate(changes);
      setOriginalProducts(localProducts);
      setShowSaveModal(false);

      if (pendingNavigationRef.current) {
        pendingNavigationRef.current();
        pendingNavigationRef.current = null;
      }
    } catch (err) {
      console.error("Failed to save changes:", err);
      alert("Failed to save changes. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDiscardChanges = () => {
    setLocalProducts(originalProducts);
    setShowSaveModal(false);

    if (pendingNavigationRef.current) {
      pendingNavigationRef.current();
      pendingNavigationRef.current = null;
    }
  };

  const handleCancelSave = () => {
    setShowSaveModal(false);
    pendingNavigationRef.current = null;
  };

  useEffect(() => {
    return () => {
      if (hasUnsavedChanges()) {
        console.warn("Unmounting with unsaved changes");
      }
    };
  }, [localProducts, originalProducts]);

  const handleRowClick = (index) => {
    setSelectedIndex(index);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        if (hasUnsavedChanges()) {
          handleSaveAll();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [localProducts, originalProducts]);

  if (loading) {
    return (
      <div className="product-table-container">
        <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>
          Loading products...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="product-table-container">
        <div style={{ padding: "40px", textAlign: "center", color: "#d32f2f" }}>
          Error: {error}
        </div>
      </div>
    );
  }

  if (localProducts.length === 0) {
    return (
      <div className="product-table-container">
        <div style={{ padding: "40px", textAlign: "center", color: "#666" }}>
          No products found. Add your first product to get started.
        </div>
      </div>
    );
  }

  return (
    <>
      <SaveConfirmationModal
        isOpen={showSaveModal}
        onSave={handleSaveAll}
        onDiscard={handleDiscardChanges}
        onCancel={handleCancelSave}
        changedCount={getChangedProducts().length}
      />

      {hasUnsavedChanges() && (
        <div className="unsaved-changes-bar">
          <span>
            {getChangedProducts().length} unsaved product
            {getChangedProducts().length !== 1 ? "s" : ""}
          </span>
          <div className="unsaved-changes-actions">
            <button
              className="btn-discard-changes"
              onClick={handleDiscardChanges}
              disabled={isSaving}
            >
              Discard
            </button>
            <button
              className="btn-save-changes"
              onClick={handleSaveAll}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save All"}
            </button>
          </div>
        </div>
      )}

      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("articleNo")}>
                Article No. <span className="sort-icon">{getSortIcon("articleNo")}</span>
              </th>
              <th onClick={() => handleSort("productService")}>
                Product/Service <span className="sort-icon">{getSortIcon("productService")}</span>
              </th>
              <th onClick={() => handleSort("inPrice")}>
                In Price <span className="sort-icon">{getSortIcon("inPrice")}</span>
              </th>
              <th onClick={() => handleSort("price")}>
                Price <span className="sort-icon">{getSortIcon("price")}</span>
              </th>
              <th onClick={() => handleSort("unit")}>
                Unit <span className="sort-icon">{getSortIcon("unit")}</span>
              </th>
              <th onClick={() => handleSort("inStock")}>
                In Stock <span className="sort-icon">{getSortIcon("inStock")}</span>
              </th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {getSortedProducts().map((product, index) => (
              <tr
                key={product.id}
                className={index === selectedIndex ? "selected-row" : ""}
                onClick={() => handleRowClick(index)}
              >
                <td>
                  <Input
                    type="text"
                    value={product.articleNo}
                    onChange={(value) =>
                      handleProductChange(product.id, "articleNo", value)
                    }
                    className="desktop-table-input"
                  />
                </td>
                <td>
                  <Input
                    type="text"
                    value={product.productService}
                    onChange={(value) =>
                      handleProductChange(product.id, "productService", value)
                    }
                    className="desktop-table-input"
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    value={product.inPrice}
                    onChange={(value) =>
                      handleProductChange(product.id, "inPrice", value)
                    }
                    className="desktop-table-input"
                    min="0"
                    step="0.01"
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    value={product.price}
                    onChange={(value) =>
                      handleProductChange(product.id, "price", value)
                    }
                    className="desktop-table-input"
                    min="0"
                    step="0.01"
                  />
                </td>
                <td>
                  <Input
                    type="text"
                    value={product.unit}
                    onChange={(value) =>
                      handleProductChange(product.id, "unit", value)
                    }
                    className="desktop-table-input"
                  />
                </td>
                <td>
                  <Input
                    type="number"
                    value={product.inStock}
                    onChange={(value) =>
                      handleProductChange(product.id, "inStock", value)
                    }
                    className="desktop-table-input"
                    min="0"
                    step="1"
                  />
                </td>
                <td>
                  <Input
                    type="text"
                    value={product.description}
                    onChange={(value) =>
                      handleProductChange(product.id, "description", value)
                    }
                    className="desktop-table-input"
                  />
                </td>
                <td>
                  <button className="row-action-btn">⋯</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="product-cards-mobile">
        <div className="product-card-header-mobile">
          <span className="header-label-mobile">Product/Service</span>
          <span className="header-label-mobile">Price</span>
          <span className="header-label-mobile"></span>
        </div>
        {localProducts.map((product, index) => (
          <div
            key={product.id}
            className={`product-card-mobile ${
              index === selectedIndex ? "product-card-mobile-selected" : ""
            }`}
            onClick={() => handleRowClick(index)}
          >
            {index === selectedIndex && (
              <span className="card-arrow-mobile">→</span>
            )}
            <div className="product-card-content-mobile">
              <div className="product-input-wrapper-mobile">
                <Input
                  type="text"
                  placeholder="Enter product name"
                  value={product.productService}
                  onChange={(value) =>
                    handleProductChange(product.id, "productService", value)
                  }
                  className="product-input-mobile"
                />
              </div>
              <div className="price-input-wrapper-mobile">
                <Input
                  type="number"
                  placeholder="0"
                  value={product.price}
                  onChange={(value) =>
                    handleProductChange(product.id, "price", value)
                  }
                  className="price-input-mobile"
                  min="0"
                  step="0.01"
                />
              </div>
              <button className="card-action-btn-mobile">⋯</button>
            </div>
          </div>
        ))}
      </div>

      <div className="product-cards-tablet">
        <div className="product-card-header-tablet">
          <span className="header-label-tablet">Article No.</span>
          <span className="header-label-tablet">Product/Service</span>
          <span className="header-label-tablet">Price</span>
          <span className="header-label-tablet">In Stock</span>
          <span className="header-label-tablet">Unit</span>
          <span className="header-label-tablet"></span>
        </div>
        {localProducts.map((product, index) => (
          <div
            key={product.id}
            className={`product-card-tablet ${
              index === selectedIndex ? "product-card-tablet-selected" : ""
            }`}
            onClick={() => handleRowClick(index)}
          >
            {index === selectedIndex && (
              <span className="card-arrow-tablet">→</span>
            )}
            <div className="product-card-content-tablet">
              <div className="input-wrapper-tablet article-input">
                <Input
                  type="text"
                  placeholder="Article No"
                  value={product.articleNo}
                  onChange={(value) =>
                    handleProductChange(product.id, "articleNo", value)
                  }
                  className="tablet-input"
                />
              </div>
              <div className="input-wrapper-tablet product-input">
                <Input
                  type="text"
                  placeholder="Product name"
                  value={product.productService}
                  onChange={(value) =>
                    handleProductChange(product.id, "productService", value)
                  }
                  className="tablet-input"
                />
              </div>
              <div className="input-wrapper-tablet price-input">
                <Input
                  type="number"
                  placeholder="0"
                  value={product.price}
                  onChange={(value) =>
                    handleProductChange(product.id, "price", value)
                  }
                  className="tablet-input"
                  min="0"
                  step="0.01"
                />
              </div>
              <div className="input-wrapper-tablet stock-input">
                <Input
                  type="number"
                  placeholder="0"
                  value={product.inStock}
                  onChange={(value) =>
                    handleProductChange(product.id, "inStock", value)
                  }
                  className="tablet-input"
                  min="0"
                  step="1"
                />
              </div>
              <div className="input-wrapper-tablet unit-input">
                <Input
                  type="text"
                  placeholder="Unit"
                  value={product.unit}
                  onChange={(value) =>
                    handleProductChange(product.id, "unit", value)
                  }
                  className="tablet-input"
                />
              </div>
              <button className="card-action-btn-tablet">⋯</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductTable;
