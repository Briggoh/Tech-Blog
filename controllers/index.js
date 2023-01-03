const router =  require("express").Router();
const homeRoutes = require("./homepageRoutes");
const dashboardRoutes = require("./dashboardRoutes");
const loginPageRoutes = require("./loginPageRoutes");
const commentRoutes =  require("./commentRoutes");
const apiRoutes = require("./api");

router.use("/", homeRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/api", apiRoutes);
router.use("/login", loginPageRoutes);
router.use("/commentRoutes", commentRoutes);

module.exports = router;

