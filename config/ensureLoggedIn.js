// credit attributed to mongoose-movies repo
module.exports = (req,res,next)=>{
    if (req.isAuthenticated()) return next()
    res.redirect('auth/google')
}