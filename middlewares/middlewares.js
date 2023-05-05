const authPage = (permissions) => {
  return (req, res, next) => {
    const admin = req.body.code
    console.log("name is " + admin);
    if(permissions.includes(admin)){
      next()
    } else {
      return res.status(401).json("You are not an admin")
    }
  }
}




const auCourse = () => {

}

module.exports = { authPage, auCourse};