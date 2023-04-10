const jsonServer = require("json-server");
const auth = require("json-server-auth");
const app = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

const PORT = 9000;
app.db = router.db;
app.use(
  jsonServer.rewriter({
    "/users": "/664/users",
    "/users/:id": "/664/users/:id",
    "/classes": "/664/classes",
    "/classes/:id": "/664/classes/:id",
    "/schedule": "/664/schedule",
    "/schedule/:id": "/664/schedule/:id",
    "/teachers": "/664/teachers",
    "/teachers/:id": "/664/teachers/:id",
    "/profile": "/664/profile",
    "/profile/edit": "/664/profile/edit",
    "/admin": "/664/admin",
    "/admin/editclass/:id": "/664/admin/editclass/:id",
    "/admin/addclass/": "/664/admin/addclass/",
    "/admin/schedule/": "/664/admin/schedule/",
    "/admin-teachers": "/664/admin-teachers",
    "/admin-teachers/addclass": "/664/admin-teachers/addclass",
    "/admin-teachers/editclass/:id": "/664/admin-teachers/editclass/:id",
  })
);
app.use(middlewares);
app.use(auth);
app.use(router);
app.listen(PORT, () => {
  console.log("Server is Running");
  console.log("http://localhost:" + PORT);
});
module.exports = app;
