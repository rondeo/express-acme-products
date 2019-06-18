const express = require('express');
const fs = require('fs');
const path = require('path');
const morgan = require('morgan');

const port = process.env.PORT || 3000; // uses process.env.PORT in case deployed

const productsFile = path.join(__dirname, 'products.json');

function mkId(products) {
  const ids = products.map(product => product.id);
  let idTaken = false;
  let id;
  do {
    id = Math.ceil(1000*Math.random());
    idTaken = ids.includes(id);
 } while (idTaken);
  return id;
}

function pushProduct(products, newProduct) {
  productNames = products.map(product => product.name);
  if (productNames.includes(newProduct.name)) {
    products.forEach((product,index) => {
      if (product.name === newProduct.name) {
        products[index].qnt = Number(products[index].qnt) + Number(newProduct.qnt);
      }
    });
  }
  else {
    newProduct.id = mkId(products);
    products.push(newProduct);
  }
  return products;
}

function postProduct (file, newProduct) {
  return new Promise ((resolve, reject) => {
    fs.readFile(file, (err, readData) => {
      if(err) {
        return reject(err);
      }

      let data = readData.toString();
      try {
        if(!data) throw "JSON Data did not load";
        data = JSON.parse(data);
      } catch {
        data = {products:[]};
      }

      data.products = pushProduct(data.products, newProduct);

      fs.writeFile(file, JSON.stringify(data), (err) => {
        if(err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

function removeProduct(products, productId) {
  productIds = products.map(product => product.id);
  
  if (productIds.includes(productId)) {
    products = products.filter(product => product.id !== productId);
  }
  else {
    console.error('Product ID not found in products list');
  }
  return products;
}

function delProduct (file, productId) {
  return new Promise ((resolve, reject) => {
    fs.readFile(file, (err, readData) => {
      if(err) {
        return reject(err);
      }

      let data = readData.toString();
      
      try {
        if(!data) throw "JSON Data did not load";
        data = JSON.parse(data);
      } catch {
        data = {products:[]};
      }

      data.products = removeProduct(data.products, productId);
      
      fs.writeFile(file, JSON.stringify(data), (err) => {
        if(err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

//Pipeline
const app = express();
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.use(express.json());

app.route('/api/products')
.get((req, res, next) => {
  res.sendFile(productsFile);
})
.post((req, res, next) => {
  const newProduct = req.body;
  postProduct(productsFile, newProduct);
  res.status(201);
  res.end();
})

// app.use(express.urlencoded({ extended: false }));//adds data submitted by form with POST request to req.body
app.delete('/api/products/:id', (req, res, next) => {
  const productId = Number(req.params.id);
  delProduct(productsFile, productId);
  res.status(204);
  res.end();
})

app.listen(port, () => console.log(`Listening on port: ${port}`));