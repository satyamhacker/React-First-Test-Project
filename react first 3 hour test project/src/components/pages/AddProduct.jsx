import React, { useState, useEffect } from "react";

function AddProduct() {
  
    const [product, setProduct] = useState({
        ProductID:0,
        SellingPrice:0,
        ProductName:"",
    })

  const [productsList, setProductsList] = useState([]);
  const [totalSellingPrice, setTotalSellingPrice] = useState(0);

  useEffect(() => {
    // Get item from localStorage when the component mounts
    const storedProducts = localStorage.getItem("products");

    // Parse the JSON string back to an array and update the state
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setProductsList(parsedProducts);

      // Calculate total selling price when products are loaded from local storage
      const total = parsedProducts.reduce(
        (acc, item) => acc + parseInt(item.SellingPrice),
        0
      );
      setTotalSellingPrice(total);
    }
  }, []); // Empty dependency array ensures the effect runs once after the initial render

  const handleProductIdInput = (e) => { 
    const { name, value } = e.target;

    // Update the corresponding property in the product state
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleClick = () => {
    // Add object to productsList state
    setProductsList([...productsList, product]);

    // Update local storage with the updated products list
    localStorage.setItem("products", JSON.stringify([...productsList, product]));

    // Update total selling price
    setTotalSellingPrice((prevTotal) => prevTotal + parseInt(product.SellingPrice));
  };

  const handleDeleteProduct = (index) => {
    // Create a copy of the productsList state
    const updatedProductsList = [...productsList];

    // Remove the product at the specified index
    updatedProductsList.splice(index, 1);

    // Update the productsList state
    setProductsList(updatedProductsList);

    // Update local storage with the updated products list
    localStorage.setItem("products", JSON.stringify(updatedProductsList));

    // Recalculate total selling price
    const total = updatedProductsList.reduce(
      (acc, item) => acc + parseInt(item.SellingPrice),
      0
    );
    setTotalSellingPrice(total);
  };

  return (
    <>
      Product ID:
      <input
        type="number"
        name="ProductID"
        value={product.ProductID}
        onChange={handleProductIdInput}
      />
      Selling Price:
      <input
        type="number"
        name="SellingPrice"
        value={product.SellingPrice}
        onChange={handleProductIdInput}
      />
      Product Name:
      <input
        type="text"
        name="ProductName"
        value={product.ProductName}
        onChange={handleProductIdInput}
      />
      <button onClick={handleClick}>Add Product</button>
      {productsList.length > 0 ? (
        <div>
          <h1>Products</h1>
          {productsList.map((item, index) => (
            <div key={index}>
              <p>Product ID: {item.ProductID}</p>
              <p>Selling Price: {item.SellingPrice}</p>
              <p>Product Name: {item.ProductName}</p>
              <button onClick={() => handleDeleteProduct(index)}>Delete Product</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available.</p>
      )}

      {
        totalSellingPrice>0 ?(<h1>Total Value Worth of Products Rs{totalSellingPrice}</h1>):(
            <p></p>
        )
      }

      
    </>
  );
}

export default AddProduct;
