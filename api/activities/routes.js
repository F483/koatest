const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../user/auth');
const db = require('../../db');
const config = require('../../config');

const router = express.Router();


router.post('/create', auth, async (req, res) => {
    try {
        // TODO user admin right check
        const { title, description, category, difficulty, duration, content } = req.body;
        const result = await db('activities').insert({
            title, description, category, difficulty, duration, content,
        }).returning('*');
        const record = result[0]
        res.status(201).json({ status: 'success', data: record });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error!' });
    }
});

router.post('/update', auth, async (req, res) => {
    try {
        // TODO user admin right check
        // TODO only update properties where key is given
        const { id, title, description, category, difficulty, duration, content } = req.body;
        const result = await db('activities').where({ id }).update({
            title, description, category, difficulty, duration, content
        }).returning('*');
        if(!result || !result[0]) {
            res.status(404).json({ status: 'error', message: 'Activity not found!' });
        } else {
            res.status(200).json({ status: 'success', data: result[0] });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error!' });
    }
});

router.post('/read', auth, async (req, res) => { // TODO change to get with parameter
    try {
        // TODO user admin right check
        const { activity_id } = req.body;
        const activity = await db('activities').where({ id: activity_id }).first();
        if (activity) {
            res.status(200).json({ status: 'success', data: activity });
        } else {
            res.status(404).json({ status: 'error', message: 'Activity not found!' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error!' });
    }
});

router.post('/delete', auth, async (req, res) => {
    try {
        // TODO user admin right check
        const { activity_id } = req.body;
        const result = await db('activities').where({ id: activity_id }).del().returning('*');
        if(!result) {
            res.status(404).json({ status: 'error', message: 'Activity not found!' });
        } else {
            res.status(200).json({ status: 'success', data: {} });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error!' });
    }
});

router.get('/list', async (req, res) => {
    // TODO limit and add filter options
    const activities = await db('activities').orderBy('id').select('*');
    res.json(activities);
});

router.post('/completed/mark', auth, async (req, res) => {
    try {
        const user_id = req.user.id;
        const { activity_id } = req.body;
        const activity = await db('activities').where({ id: activity_id }).first();
        if (activity) {
            const completed = await db('activities_completed').where({ 
                user_id, activity_id 
            }).first();
            if (completed) {
                res.status(200).json({ status: 'success', data: { activity, completed } });
            } else {
                const result = await db('activities_completed').insert({ 
                    user_id, activity_id 
                }).returning('*');
                res.status(201).json({ status: 'success', data: {
                    activity, completed: result[0]
                }});
            }
        } else {
            res.status(404).json({ status: 'error', message: 'Activity not found!' });
        }
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Server error!' });
    }
});

router.get('/completed/list', auth, async (req, res) => {
    try {
        const activities = await db('activities').orderBy('id')
            .join('activities_completed', 'activities.id', 'activities_completed.activity_id')
            .select('activities.*')
            .where('activities_completed.user_id', req.user.id);
        res.status(200).json({ status: 'success', data: activities });
    } catch (error) {
        console.log(`ERROR: ${error}`)
        res.status(500).json({ status: 'error', message: 'Server error!' });
    }
});

// TODO call to list incompleted
// TODO call to list all with status

module.exports = router;
