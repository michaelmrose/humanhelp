// credit attributed to mongoose-movies repo
module.exports = (req,res,next)=>{
    if (req.query.locationId || req.cookies.locationId) {
        if (req.query.locationId)
        res.cookie('locationId', req.query.locationId)
        return next()
    }
    else {
    res.redirect('/locations' + "?target=" + req.url + "?method=" +req.originalMethod)}
    return
}
