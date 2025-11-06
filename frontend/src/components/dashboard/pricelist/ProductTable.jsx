import { useState, useEffect } from "react";
import "./ProductTable.css";
import Input from "../../ui/Input";

const ProductTable = ({ products }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [localProducts, setLocalProducts] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    setLocalProducts(products);
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
    if (sortConfig.key !== key) return "↕️";
    return sortConfig.direction === "asc" ? "↓" : "↑";
  };

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...localProducts];
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value
    };
    setLocalProducts(updatedProducts);
  };

  const handleRowClick = (index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th onClick={() => handleSort("articleNo")}>
                Article No. {getSortIcon("articleNo")}
              </th>
              <th onClick={() => handleSort("productService")}>
                Product/Service {getSortIcon("productService")}
              </th>
              <th onClick={() => handleSort("inPrice")}>
                In Price {getSortIcon("inPrice")}
              </th>
              <th onClick={() => handleSort("price")}>
                Price {getSortIcon("price")}
              </th>
              <th onClick={() => handleSort("unit")}>
                Unit {getSortIcon("unit")}
              </th>
              <th onClick={() => handleSort("inStock")}>
                In Stock {getSortIcon("inStock")}
              </th>
              <th>Description</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {getSortedProducts().map((product) => (
              <tr key={product.id}>
                <td>{product.articleNo}</td>
                <td>{product.productService}</td>
                <td>{product.inPrice}</td>
                <td>{product.price}</td>
                <td>{product.unit}</td>
                <td>{product.inStock}</td>
                <td>{product.description}</td>
                <td>
                  <button className="row-action-btn">⋯</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View (2 columns) */}
      <div className="product-cards-mobile">
        <div className="product-card-header-mobile">
          <span className="header-label-mobile">Product/Service</span>
          <span className="header-label-mobile">Price</span>
          <span className="header-label-mobile"></span>
        </div>
        {localProducts.map((product, index) => (
          <div
            key={product.id}
            className={`product-card-mobile ${index === selectedIndex ? 'product-card-mobile-selected' : ''}`}
            onClick={() => handleRowClick(index)}
          >
            {index === selectedIndex && <span className="card-arrow-mobile">→</span>}
            <div className="product-card-content-mobile">
              <div className="product-input-wrapper-mobile">
                <Input
                  type="text"
                  placeholder="Enter product name"
                  value={product.productService}
                  onChange={(value) => handleProductChange(index, 'productService', value)}
                  className="product-input-mobile"
                />
              </div>
              <div className="price-input-wrapper-mobile">
                <Input
                  type="text"
                  placeholder="0"
                  value={product.price}
                  onChange={(value) => handleProductChange(index, 'price', value)}
                  className="price-input-mobile"
                />
              </div>
              <button className="card-action-btn-mobile">⋯</button>
            </div>
          </div>
        ))}
      </div>

      {/* Tablet Row View (5 columns) */}
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
            className={`product-card-tablet ${index === selectedIndex ? 'product-card-tablet-selected' : ''}`}
            onClick={() => handleRowClick(index)}
          >
            {index === selectedIndex && <span className="card-arrow-tablet">→</span>}
            <div className="product-card-content-tablet">
              <div className="input-wrapper-tablet article-input">
                <Input
                  type="text"
                  placeholder="Article No"
                  value={product.articleNo}
                  onChange={(value) => handleProductChange(index, 'articleNo', value)}
                  className="tablet-input"
                />
              </div>
              <div className="input-wrapper-tablet product-input">
                <Input
                  type="text"
                  placeholder="Product name"
                  value={product.productService}
                  onChange={(value) => handleProductChange(index, 'productService', value)}
                  className="tablet-input"
                />
              </div>
              <div className="input-wrapper-tablet price-input">
                <Input
                  type="text"
                  placeholder="0"
                  value={product.price}
                  onChange={(value) => handleProductChange(index, 'price', value)}
                  className="tablet-input"
                />
              </div>
              <div className="input-wrapper-tablet stock-input">
                <Input
                  type="text"
                  placeholder="0"
                  value={product.inStock}
                  onChange={(value) => handleProductChange(index, 'inStock', value)}
                  className="tablet-input"
                />
              </div>
              <div className="input-wrapper-tablet unit-input">
                <Input
                  type="text"
                  placeholder="Unit"
                  value={product.unit}
                  onChange={(value) => handleProductChange(index, 'unit', value)}
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
