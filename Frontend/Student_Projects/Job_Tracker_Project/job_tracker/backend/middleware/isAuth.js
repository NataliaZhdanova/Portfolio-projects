export default function isAuth(req, res, next) {
    if (!req.session.isLoggedIn) {
        return res.redirect("/auth");
    }
    next();
}