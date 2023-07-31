// credit attributed to mongoose-movies repo
// module.exports = (req,res,next)=>{
//     if (req.query.locationId || req.cookies.locationId) {
//         if (req.query.locationId)
//         res.cookie('locationId', req.query.locationId)
//         return next()
//     }
//     else {
//     res.redirect('/locations' + "?target=" + req.url + "?method=" +req.originalMethod)
// }
// }
const { URL } = require('url');

module.exports = (req, res, next) => {
    if (req.query.locationId) {
        res.cookie('locationId', req.query.locationId);
        redirectToTarget(req, res);
    } else if (req.cookies.locationId) {
        return next();
    } else {
        redirectToLocations(req, res);
    }
};

function redirectToTarget(req, res) {
    const targetUrl = new URL(req.query.target || '/', req.protocol + '://' + req.get('host'));
    targetUrl.searchParams.append('method', req.method);
    res.redirect(targetUrl.toString());
}

function redirectToLocations(req, res) {
    const targetUrl = new URL('/locations', req.protocol + '://' + req.get('host'));
    targetUrl.searchParams.append('target', req.originalUrl);
    targetUrl.searchParams.append('method', req.method);
    res.redirect(targetUrl.toString());
}