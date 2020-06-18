// This middleware checks existence of playbuzz cookie
module.exports = (req, res, next) => {
  if(!req.cookies || !req.cookies.myCookie) {
    res.send(400, 'Must have a valid cookie');
  } else {
    next();
  }
};