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
router.post('/',createProfile);

// DELETE a new blog
router.delete('/:id', deleteProfile);

// UPDATE a discount
router.patch('/:id', updateProfile);

module.exports = router;
