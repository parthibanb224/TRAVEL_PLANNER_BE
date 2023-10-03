const DestinationRouter = require('express').Router();
const DestinationModel = require('../models/Destination.models');

DestinationRouter.get('/:id', (req, res, next) => {
    const userName = req.params.id;
    DestinationModel.find({ userName })
        .then(response => {
            return res.status(200).json({
                result: response,
                success: true,
                message: "Destination fetch successfully"
            })
        })
        .catch(err => {
            return res.status(401).json({
                success: false,
                message: "Destination fetch failed",
                Error: err
            })
        })
})

DestinationRouter.post('/add/:id', (req, res, next) => {
    const fullName = req.params.id;
    const data = req.body;
    const newDestination = DestinationModel({ ...data, userName: fullName });
    newDestination.save()
        .then(response => {
            return res.status(200).json({
                result: response,
                success: true,
                message: "Destination Added Successfully"
            })
        })
        .catch(err => {
            return res.status(400).json({
                success: false,
                message: "Destination Added Failed"
            })
        })
})

DestinationRouter.delete('/delete/:fullName/:name', async(req,res,next) => {
    const matchedDocument = await DestinationModel.findOne({"name":req.params.name,"userName":req.params.fullName});
    await DestinationModel.findOneAndRemove({name:matchedDocument.name})
        .then(response => {
            return res.status(200).json({
                success: true,
                message: "deleted Successfully"
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(400).json({
                success: false,
                message: "deleted failed"
            })
        })
})

module.exports = DestinationRouter;