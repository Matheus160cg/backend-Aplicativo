const {subHours} = require('date-fns');
const TaskModel = require('../models/TaskModel');

class TaskControllers {
    async create(req, res){
        const { type, title, description, when } = req.body;

        const task = new TaskModel({type, title, description, when: subHours(new Date(when), 3)});
        await task.save().then(response => {
            return res.json(response);
        })
        .catch(error => {
            return res.json(error);
        });
    }

    async all(req, res){
        await TaskModel.find().sort('when').then(response => {
            return res.status(200).json(response);
        })
        .catch(error => {return res.status(400).json(error);
        })
    }

    async show(req, res){
        await TaskModel.findById(req.params.id)
        .then(response => {
            return res.status(200).json(response)
        })
        .catch(error => {
            return res.status(400).json(error);
        })
    }

    async update(req, res){
        await TaskModel.findByIdAndUpdate(
            {'_id': req.params.id}, 
            req.body,
            {new: true})
        .then(task => {
            return res.status(200).json(task);
        })
        .catch(error => {
            return res.status(400).json(error);
        });
    }

    async delete(req, res){
        await TaskModel.deleteOne({'_id': req.params.id})
        .then(task => { return res.status(200).json(task);})
        .catch(error => { return res.status(400).json(error);})
    }
}

module.exports = new TaskControllers();