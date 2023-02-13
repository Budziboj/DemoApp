const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1:27017/farmStand', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION111 OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO, MONGO ERROR!!!!")
        console.log(err)
    })



// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })
// p.save().then(p => {
//     console.log(p)
// })
//     .catch(e => {
//         console.log("ERROR!!")
//         console.log(e)
//     })

const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 4.99,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    },
    {
        name: 'Organic Whole Milk',
        price: 2.69,
        category: 'dairy'
    },
    {
        name: 'Organic Reduced Fat Milk',
        price: 2.69,
        category: 'dairy'
    },
    {
        name: 'Russet Potato',
        price: 0.89,
        category: 'vegetable'
    }
]


Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })