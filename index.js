const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')


const Product = require('./models/product');
const { resourceLimits } = require('worker_threads');

mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/farmStand2', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION111 OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO, MONGO ERROR!!!!")
        console.log(err)
    })

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))


//FARM ROUTES

app.get('/farms/new', (req, res) => {
    res.render('farms/new')
})

app.post('/farms', async (req, res) => {
    res.send(req.body)
})




//PRODUCT ROUTES
const categories = ['fruit', 'vegetable', 'dairy', 'mushroom'];
// const cat1 = { category };
// const cat2 = category.charAt(0).toUpperCase() + category.slice(1);

app.get('/products', async (req, res) => {
    const { category } = req.query
    if (category) {
        const products = await Product.find({ category: category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })
    }
})













//NEW
app.get('/products/new', (req, res) => {
    res.render('products/new', { categories })
})

//POST
app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.redirect(`/products/${newProduct._id}`)
})

//ID
app.get('/products/:id', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    console.log(product)
    res.render('products/show', { product })
})

//EDIT
app.get('/products/:id/edit', async (req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.render('products/edit', { product, categories })
})
// app.get('/products/:id/edit', async (req, res) => {
//     const { id } = req.params;
//     const product = await Product.findById(id)
//     res.render('products/edit', { product, categories })
//     // res.render('products/edit', { product })
// })

app.put('/products/:id', async (req, res) => {
    const { id } = req.params;
    // const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
    const product = await Product.findByIdAndUpdate(id, req.body)
    console.log(req.body)
    res.redirect(`/products/${product._id}`)
})

app.delete('/products/:id', async (req, res) => {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.redirect('/products');

})






app.listen(3000, () => {
    console.log("APP IS LISTENING ON PORT 3000")
})

// //******************************************************NOTES*************************************************************** */
// //VALIDATOR ISSUE: issue with runValidators being passed in the put request


// const express = require('express');
// const app = express();
// const path = require('path');
// const mongoose = require('mongoose');
// const methodOverride = require('method-override')


// const Product = require('./models/product');
// mongoose.set('strictQuery', true);
// mongoose.connect('mongodb://127.0.0.1:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log("MONGO CONNECTION OPEN!!!")
//     })
//     .catch(err => {
//         console.log("OH NO MONGO CONNECTION ERROR!!!!")
//         console.log(err)
//     })


// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');

// app.use(express.urlencoded({ extended: true }));
// app.use(methodOverride('_method'))

// const categories = ['fruit', 'vegetable', 'dairy'];

// app.get('/products', async (req, res) => {
//     const { category } = req.query;
//     if (category) {
//         const products = await Product.find({ category })
//         res.render('products/index', { products, category })
//     } else {
//         const products = await Product.find({})
//         res.render('products/index', { products, category: 'All' })
//     }
// })

// app.get('/products/new', (req, res) => {
//     res.render('products/new', { categories })
// })

// app.post('/products', async (req, res) => {
//     const newProduct = new Product(req.body);
//     await newProduct.save();
//     res.redirect(`/products/${newProduct._id}`)
// })

// app.get('/products/:id', async (req, res) => {
//     const { id } = req.params;
//     const product = await Product.findById(id)
//     res.render('products/show', { product })
// })

// app.get('/products/:id/edit', async (req, res) => {
//     const { id } = req.params;
//     const product = await Product.findById(id);
//     res.render('products/edit', { product, categories })
// })

// app.put('/products/:id', async (req, res) => {
//     const { id } = req.params;
//     const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
//     res.redirect(`/products/${product._id}`);
// })

// app.delete('/products/:id', async (req, res) => {
//     const { id } = req.params;
//     const deletedProduct = await Product.findByIdAndDelete(id);
//     res.redirect('/products');
// })



// app.listen(3000, () => {
//     console.log("APP IS LISTENING ON PORT 3000!")
// })

