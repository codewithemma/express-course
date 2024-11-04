const express = require("express");
const app = express();
const { products } = require("./data");
// app.get
// app.post
// app.delete
// app.put
// app.all
// app.use
// app.listen

app.get("/", (req, res) => {
  res.send(`<h1>home page</h1><a href="/api/products">
    Products</a>`);
});

app.get("/api/products", (req, res) => {
  const newProducts = products.map((product) => {
    const { id, name, image } = product;
    return { id, name, image };
  });
  res.send(newProducts);
});

app.get("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const singleProduct = products.find((product) => product.id === Number(id));
  if (!singleProduct) {
    return res.status(404).send("product does not exist");
  }
  res.send(singleProduct);
});

app.get("/api/products/:id/reviews/:reviewId", (req, res) => {
  console.log(req.params);
  res.send("hello world");
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>404 not found</h1>");
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
