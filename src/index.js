const app = require("./app");

app.listen(process.env.PORT || 3306)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });