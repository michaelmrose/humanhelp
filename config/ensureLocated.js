// credit attributed to mongoose-movies repo
module.exports = (req,res,next)=>{
    console.log( `Q ${req.query.locationId}`)
    if (req.query.locationId || req.cookies.locationId) {
        res.cookie('locationId', req.query.locationId)
        return next()}
    else {
    res.redirect('/locations' + "?target=" + req.url + "?method=" +req.originalMethod)}
}
