const { Products } = require("../../models")

async function putProduct(req, res){
    const inputName = req.body.name;
    const inputPrice = req.body.price;
    const inputDescription = req.body.description;
    const inputPhoto = req.body.photo;
    const inputCategory = req.body.category;

    await Products.update({
        name: inputName, 
        price: inputPrice,
        category_id: inputCategory,
        description: inputDescription,
        photo: inputPhoto
    },{where:{id:req.params.id}})

    res.status(204).send(`update product ${req.params.id} berhasil`)
}
module.exports = putProduct