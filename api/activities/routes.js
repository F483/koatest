const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../user/auth');
const db = require('../../db');
const config = require('../../config');

const router = express.Router();

// TODO add bonus Create call
// TODO add bonus Read call
// TODO add bonus Update call
// TODO add bonus Delete call

router.get('/list', async (req, res) => {
    // TODO limit and add filter options
    const activities = await db('activities').select('*');
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
                const saved = await db('activities_completed').insert({ 
                    user_id, activity_id 
                }).returning('*');
                res.status(201).json({ status: 'success', data: {
                    activity, completed: saved[0]
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
        const activities = await db('activities')
            .join('activities_completed', 'activities.id', 'activities_completed.activity_id')
            .select('activities.*')
            .where('activities_completed.user_id', req.user.id);
        res.status(200).json({ status: 'success', data: activities });
    } catch (error) {
        console.log(`ERROR: ${error}`)
        res.status(500).json({ status: 'error', message: 'Server error!' });
    }
});

module.exports = router;
