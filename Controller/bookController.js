const db = require("../model/conflg");

const bookList = (req, res) => {
  let sql = "SELECT * FROM class";
  db.query(sql, (err, result) => {
    if (err) {
      res.json({
        code: 400,
        msg: err.message,
      });
    }
    res.json({
      code: 200,
      msg: "ok",
      data: result,
    });
  });
};

module.exports = {
  bookList,
};
