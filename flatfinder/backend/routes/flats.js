const express = require('express');
const router = express.Router();
const Flat = require('../models/Flat');

// GET all flats
router.get('/', async (req, res) => {
  try {
    const {
      city,
      minPrice,
      maxPrice,
      minArea,
      maxArea,
      ownerId,
      favouriteUserId
    } = req.query;

    const filter = {};

    if (city) {
      filter.city = { $regex: city, $options: 'i' };
    }

    if (minPrice || maxPrice) {
      filter.rentPrice = {};
      if (minPrice) filter.rentPrice.$gte = Number(minPrice);
      if (maxPrice) filter.rentPrice.$lte = Number(maxPrice);
    }

    if (minArea || maxArea) {
      filter.areaSize = {};
      if (minArea) filter.areaSize.$gte = Number(minArea);
      if (maxArea) filter.areaSize.$lte = Number(maxArea);
    }

    if (ownerId) {
      filter.ownerId = ownerId;
    }

    if (favouriteUserId) {
      filter.favouriteBy = favouriteUserId;
    }

    const flats = await Flat.find(filter).sort({ createdAt: -1 });
    res.json(flats);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching flats',
      error: error.message
    });
  }
});

// GET flat by id
router.get('/:id', async (req, res) => {
  try {
    const flat = await Flat.findById(req.params.id);

    if (!flat) {
      return res.status(404).json({ message: 'Flat not found' });
    }

    res.json(flat);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching flat',
      error: error.message
    });
  }
});

// CREATE flat
router.post('/', async (req, res) => {
  try {
    const flat = new Flat(req.body);
    const savedFlat = await flat.save();
    res.status(201).json(savedFlat);
  } catch (error) {
    res.status(400).json({
      message: 'Error creating flat',
      error: error.message
    });
  }
});

// UPDATE flat
router.put('/:id', async (req, res) => {
  try {
    const updatedFlat = await Flat.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedFlat) {
      return res.status(404).json({ message: 'Flat not found' });
    }

    res.json(updatedFlat);
  } catch (error) {
    res.status(400).json({
      message: 'Error updating flat',
      error: error.message
    });
  }
});

// DELETE flat
router.delete('/:id', async (req, res) => {
  try {
    const deletedFlat = await Flat.findByIdAndDelete(req.params.id);

    if (!deletedFlat) {
      return res.status(404).json({ message: 'Flat not found' });
    }

    res.json({ message: 'Flat deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting flat',
      error: error.message
    });
  }
});

// TOGGLE favourite
router.patch('/:id/favourite', async (req, res) => {
  try {
    const { userId } = req.body;

    const flat = await Flat.findById(req.params.id);

    if (!flat) {
      return res.status(404).json({ message: 'Flat not found' });
    }

    const alreadyFavourite = flat.favouriteBy.includes(userId);

    if (alreadyFavourite) {
      flat.favouriteBy = flat.favouriteBy.filter(id => id !== userId);
    } else {
      flat.favouriteBy.push(userId);
    }

    await flat.save();

    res.json(flat);
  } catch (error) {
    res.status(400).json({
      message: 'Error toggling favourite',
      error: error.message
    });
  }
});

module.exports = router;