import React, { useEffect, useState } from "react";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({
    _id: "",
    name: "",
    price: "",
    description: "",
    image: "",
    featured: false,
  });

  return (
    <div>
      <h2>Products</h2>
    </div>
  );
}

export default ProductPage;
