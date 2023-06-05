import Link from "next/link";
import React, { useEffect, useState } from "react";

const Crud = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(products);
  const [title, setTitle] = useState("");
  const [editData, setEditData] = useState({});
  const [show, setShow] = useState(true);
  const [limitData, setLimitData] = useState();
  const [skipData, setSkipData] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://dummyjson.com/products");
      const data = await response.json();
      setProducts(data.products);
      setResults(data.products);
    //   setLimitData(data.products)
    //   setSkipData(data.products)
    };
    fetchProducts();
  }, []);

//   console.log(limitData);
//   console.log(skipData);

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `https://dummyjson.com/products/search?q=${search}`
    );
    const results = await response.json();
    // console.log(results.products);
    setResults(results.products);
  };

  const addProductData = async (e) => {
    e.preventDefault();
    const data = await fetch("https://dummyjson.com/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
      }),
    });
    const addData = await data.json();
    console.log(addData);
    setTitle("");
  };

  const deleteProduct = async (id) => {
    const data = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "DELETE",
    });
    const deleteData = await data.json();
    console.log(deleteData);
  };

  const editProductData = async (e, id) => {
    // console.log(id);
    e.preventDefault();
    const data = await fetch(`https://dummyjson.com/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: editData,
        // title: "iPhone Galaxy +1",
      }),
    });
    console.log(data);
    const updateData = await data.json();
    console.log(updateData);
    setEditData({ id: "", title: "" });
    setShow(true);
  };


  const pagination = async (e) => {
    e.preventDefault();
    const pageData = await fetch(
      `https://dummyjson.com/products?limit=${limitData}&skip=${skipData}&select=title,price`
    );
    const data =await pageData.json();
    // console.log(data.products);
    setResults(data.products)
    setLimitData('')
    setSkipData('')
  };

  return (
    <div>
      <div className="mt-5 mb-5 flex">
        {/* search data */}
        <form onSubmit={handleSearch}>
          <label>
            Search :
            <input
              type="text"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </label>
          <button type="submit">Search</button>
        </form>
        <form onSubmit={pagination}>
          <div className="flex">
            <input
              type="number"
              value={limitData}
              onChange={(e) => setLimitData(e.target.value)}
            />
            <input
              type="number"
              value={skipData}
              onChange={(e) => setSkipData(e.target.value)}
            />
            <button type="submit">Limit/Skip</button>
          </div>
        </form>
        {/* add data */}
        {show ? (
          <form onSubmit={addProductData} className="mt-5">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <button className="ml-5" type="submit">
              Add Product
            </button>
          </form>
        ) : (
          ""
        )}

        {/* edit data */}
        {!show ? (
          <form
            onSubmit={(e) => editProductData(e, editData.id)}
            className="mt-5"
          >
            <input
              type="text"
              value={editData.title}
              onChange={(e) =>
                setEditData({ ...editData, title: e.target.value })
              }
            />
            <button className="ml-5" type="submit">
              Edit Product
            </button>
          </form>
        ) : (
          ""
        )}
      </div>
      {/* list data */}
      <ul className="mt-10">
        {results.map((product) => (
          <React.Fragment key={product.id}>
            <li className="flex gap-3">
              <Link href={`/singleProduct/${product.id}`} className="list-none">
                {product.id}--{product.title}
              </Link>
              <button
                type="button"
                className="ml-3"
                onClick={() => {
                  setEditData({ id: product.id, title: product.title });
                  setShow(false);
                }}
              >
                Edit
              </button>
              {/* delete data */}
              <button
                type="button"
                className="ml-3"
                onClick={() => deleteProduct(product.id)}
              >
                Delete
              </button>
            </li>
            <hr />
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Crud;
