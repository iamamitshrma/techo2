const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');

router.get("/allUsers", async(req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    }catch(error) {
        res.status(500).json(error);
    }
});


//DELETE
router.delete('/:key', async(req, res) => {
  console.log(req, res);
  if(req.user.key === req.params.key) {
    try {
        await User.findOneAndDelete({key: req.params.key})
        res.status(200).json("User has been deleted!");
    } catch (error) {
        res.status(501).json(error);
    }
}else {
    res.status(403).json("you can delete only your account!");
}
});


// update
router.patch("/:id", async(req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      user.phone = req.body.phone || user.phone;
      user.isAdmin = req.body.isAdmin;
  
      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        phone: updatedUser.phone,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      res.status(404);
    }
});

module.exports = router;