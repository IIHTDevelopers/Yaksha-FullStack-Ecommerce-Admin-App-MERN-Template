import React, { useState } from "react";
import productService from "../../services/product.service";

function AddForm() {
  const [productDetails, setProductDetails] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    featured: false,
  });

  return (
    <div>
      <h3>Add Product</h3>
    </div>
  );
}

export default AddForm;
