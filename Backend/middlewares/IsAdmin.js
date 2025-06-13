// Middleware: isAdmin.js
export const isAdmin = (req, res, next) => {
    // Check if user is authenticated AND has role="admin"
    if (req.user && req.user.role === "admin") {
        next(); // Allow access
    } else {
        res.status(403).json({ error: "Access denied. Admins only." });
    }
};