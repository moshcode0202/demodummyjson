import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const SingleProduct = () => {
  const [singleProducts, setSingleProducts] = useState({});

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    async function fetchProducts() {
      const response = await fetch(`https://dummyjson.com/products/${slug}`);
      const data = await response.json();
      //   console.log(data);
      setSingleProducts(data);
    }
    fetchProducts();
  }, []);
//   console.log(singleProducts);

  return (
    <div>
        <h2>{singleProducts.id}-{singleProducts.title}</h2>
        <h4>description - {singleProducts.description}</h4>
        <h4>price - {singleProducts.price}</h4>
        <h4>rating -{singleProducts.rating}</h4>
    </div>
  );
};

export default SingleProduct;
