const router = require('express').Router();

// auth logout
router.get("/logout", (req, res) => {
  // handle logout with passport
  res.send("Logging out ! ");
});

// auth with google
router.get("/google", (req, res) => {
  // handle googla auth with passport
  res.send("Loggin in with google");
});


module.exports = router;
