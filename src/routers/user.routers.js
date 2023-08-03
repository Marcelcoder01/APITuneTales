const { Router } = require("express");
const router = router();
const publicationCtrl = require('../controllers/publication.controller');


router.post("/publicacion", publicationCtrl.postPublication);
router.put("/publicacion", publicationCtrl.putPublication);
router.delete("/publicacion",publicationCtrl.deletePublication);



module.exports = router; 