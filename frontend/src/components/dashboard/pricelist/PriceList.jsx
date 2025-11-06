import { useState, useMemo } from "react";
import useLang from "../../../hooks/useLang";
import SearchBar from "../../ui/SearchBar";
import ActionButtons from "./ActionButtons";
import ProductTable from "./ProductTable";
import { mockProducts } from "../mockData";
import "./PriceList.css";

const PriceList = () => {
  const { t } = useLang();
  const [articleSearch, setArticleSearch] = useState("");
  const [productSearch, setProductSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchArticle = product.articleNo
        .toLowerCase()
        .includes(articleSearch.toLowerCase());
      const matchProduct = product.productService
        .toLowerCase()
        .includes(productSearch.toLowerCase());
      return matchArticle && matchProduct;
    });
  }, [articleSearch, productSearch]);

  return (
    <div className="price-list">
      <div className="price-list-header">
        <div className="search-section">
          <SearchBar
            placeholder={
              t("dashboard.searchArticle") || "Search Article No ..."
            }
            value={articleSearch}
            onChange={setArticleSearch}
          />
          <SearchBar
            placeholder={t("dashboard.searchProduct") || "Search Product ..."}
            value={productSearch}
            onChange={setProductSearch}
          />
        </div>
        <ActionButtons />
      </div>

      <div className="price-list-content">
        <ProductTable products={filteredProducts} />{" "}
      </div>
    </div>
  );
};

export default PriceList;
