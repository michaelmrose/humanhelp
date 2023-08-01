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
    const targetUrl = req.query.target ? req.query.target : '/';
    const methodQueryParam = `?method=${req.method}`;
    res.redirect(targetUrl + methodQueryParam);
}

function redirectToLocations(req, res) {
    const targetUrl = '/locations';
    const queryParams = `?target=${req.originalUrl}&method=${req.method}`;
    res.redirect(targetUrl + queryParams);
}