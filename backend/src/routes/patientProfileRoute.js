const express = require('express');

// Import the controllers
const {
    createProfile,
    deleteProfile,
    updateProfile,
    getProfileByEmail
} = require('../controller/patientProfileController');

const router = express.Router();


// GET discounts by email
router.get('/:email', getProfileByEmail);

// POST a new discount
router.put('/add',createProfile);

// DELETE a new blog
router.delete('/delete/:id', deleteProfile);

// UPDATE a discount
router.patch('/update/:id', updateProfile);

module.exports = router;
