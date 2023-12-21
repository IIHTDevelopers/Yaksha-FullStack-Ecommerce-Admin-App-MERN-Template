import React, { useState } from "react";
import productService from "../../services/product.service";

function UpdateForm() {
  const [productDetails, setProductDetails] = useState();

  return (
    <div>
      <h3>Update Product</h3>
    </div>
  );
}

export default UpdateForm;
