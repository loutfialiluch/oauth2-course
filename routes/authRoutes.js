const router = require("express").Router();
const passport = require("passport");
const passportSetup = require("../config/passportSetup");







// auth logout
router.get("/logout", (req, res) => {
  // handle logout with passport
  req.logout();
  res.json({
    isLoggedIn : false
  })
});

// auth with google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('http://localhost:3000')
})

module.exports = router;
