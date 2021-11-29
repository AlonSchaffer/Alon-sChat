const express = require('express');
const router = express.Router();
const User = require("./models/user")
//sends userlist as json file
router.get('/', async (req, res) => {
    try {
        const subscribers = await User.find()
        res.json(subscribers)
    } catch {
        res.status(500).json({ message: err.message })
    }
})

//check if user is in db
router.post('/checkuser', (req, res) => {
    const user = User.findOne({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).then((res1) => {
        if (res1) {
            res.send(true)
        } else {
            res.send(false)
        }
    }).catch((err) => {
        res.send(err)

    })
})

//create user
router.post('/', async (req, res) => {
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
    })
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

router.delete('/delete/:username', getUser, async (req, res) => {
    try {
        console.log(res.user)
        await res.user.remove();

    } catch (err) {
        res.status(500).json()

    }

})

async function getUser(req, res, next) {
    let user;
    try {
        await User.findOne({ username: req.params.username }).then((res) => {
            console.log(res)
            if (res == null) {
                return res.status(404).json({ message: 'Cannot find subscriber' })
            }
            user = res;
        });
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.user = user
    next()

}
module.exports = router;