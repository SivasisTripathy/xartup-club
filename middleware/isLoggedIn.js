module.exports = {
  isLoggedIn: (req, res, next) => {
    if (req.user) {
      //console.log('aaaaaa');
      //console.log(req.user);
      next();
    }
    else {
      res.json({ msg: 'No esta logeado' });
    }
  },
}
