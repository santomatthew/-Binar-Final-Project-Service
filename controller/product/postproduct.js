const { Products } = require("../../models");

async function postProduct(req, res) {
    const inputName = req.body.name
    const inputPrice = req.body.price
    const inputCategory = req.body.category
    const inputDescription = req.body.description
    const inputPhoto = req.body.photo

    const newProduct = await Products.create({ 
        name: inputName,
        price: inputPrice,
        category_id: inputCategory,
        description: inputDescription,
        photo: inputPhoto 
    })
    if(newProduct) {
        res.status(201).send(`Product ${inputName} berhasil dibuat`)
    }
    else{
        res.status(424).send(`Product tidak berhasil dibuat`)
    }
}

module.exports = postProduct;