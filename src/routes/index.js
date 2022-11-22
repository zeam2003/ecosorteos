const {Router} = require('express');

const router = Router();

router.get('/', (req, res) => {
    const contacts = { id: 1}
    console.log('estoy aca')
    res.render('index', contacts);
});


module.exports = router;