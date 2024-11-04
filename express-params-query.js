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

app.get("/api/v1/query", (req, res) => {
  console.log(req.query);
  const { search, limit } = req.query;
  let sortedProducts = [...products];
  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }

  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if (sortedProducts.length < 1) {
    // res.status(200).send("no products matched your search");
    return res.status(200).json({ success: true, data: [] });
  }
  res.status(200).json(sortedProducts);
});

app.all("*", (req, res) => {
  res.status(404).send("<h1>404 not found</h1>");
});
