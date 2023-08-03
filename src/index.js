const app = require("./app");

app.listen(process.env.PORT || 3000)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });