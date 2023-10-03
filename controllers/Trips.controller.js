const TripsRouter = require('express').Router();
const TripsModel = require('../models/Trips.models');

TripsRouter.get('/:id', (req, res, next) => {
    const userName = req.params.id;
    TripsModel.find({ userName })
        .then(response => {
            return res.status(200).json({
                result: response,
                success: true,
                message: "Trip fetch successfully"
            })
        })
        .catch(err => {
            return res.status(401).json({
                success: false,
                message: "Trip fetch failed",
                Error: err
            })
        })
})

TripsRouter.post('/add/:id', (req, res, next) => {
    const fullName = req.params.id;
    const data = req.body;
    const newTrip = TripsModel({ ...data, userName: fullName });
    newTrip.save()
        .then(response => {
            return res.status(200).json({
                result: response,
                success: true,
                message: "Trip Added Successfully"
            })
        })
        .catch(err => {
            return res.status(400).json({
                success: false,
                message: "Trip Added Failed"
            })
        })
})

TripsRouter.patch('/edit/:id/:title', async (req, res, next) => {
    try {
        const userName = req.params.id;
        const title = req.params.title;
        const details = req.body;
        const matchedUser = await TripsModel.findOne({ userName,title });
        if (!matchedUser) {
            res.status(400).json({ Err: "Trip not exist" });
            return;
        }
        else {
            matchedUser.title = details.title;
            matchedUser.location = details.location;
            matchedUser.date = details.date;
            matchedUser.description = details.description;
            await TripsModel.findByIdAndUpdate(matchedUser.id, matchedUser);
            res.status(201).json({
                success: true,
                message: `${matchedUser.userName} details has been changed sucessfully`,
            });
        }
    }
    catch (error) {
        return res.status(500).json({ err: error });
    }
})

TripsRouter.delete('/delete/:fullName/:title', async(req,res,next) => {
    const matchedDocument = await TripsModel.findOne({"title":req.params.title,"userName":req.params.fullName});
    await TripsModel.findOneAndRemove({title:matchedDocument.title})
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

module.exports = TripsRouter;