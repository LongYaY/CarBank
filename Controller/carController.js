const fs = require("fs");
const path = require("path");
const uuid = require("node-uuid");
const moment = require("moment");
const file = path.join(__dirname, "../data/car.json");
const carlist = (req, res) => {
  //获取汽车列表
  let page = req.query.page || 1;
  let size = req.query.size || 5;
  let list = getCarData(page, size);
  //获取列表数据
  let result = {
    code: 200,
    msg: "ok",
    count: list.length,
    page: page,
    size: size,
    ...list,
  };
  res.json(result);
};
const getCarData = (page = 1, size) => {
  let data = fs.readFileSync(file, "utf-8");
  data = JSON.parse(data).list;
  size = size || data.length;
  if (page && size) {
    data.data = data.slice((page - 1) * size, page * size);
  }
  return data;
};

//添加
const caradd = (req, res) => {
  let params = req.body;
  //整理数据
  let datatime = moment().format("YYY-MM-DD HH:mm:ss");
  let newData = {
    ...params,
    idcard: uuid.v1(),
    createTime: datatime,
    updateTime: datatime,
    deleteTime: null,
  };
  //效验参数
  //读取数据
  let data = getCarData();
  data.unshift(newData);
  //添加到文件内
  wirteDate(data);
  res.json({
    code: 200,
    msg: "ok",
    idcard: newData.idcard,
  });
};
//修改
const caredit = (req, res) => {
  //接受参数 2个参数 id和修改的数据
  let id = req.params.idcard;
  let data = req.body;
  //获取数据
  let list = getCarData();
  let index = list.findIndex((item) => item.idcard == id);
  if (index == -1) {
    res.json({
      code: 404,
      msg: "未找到数据",
    });
  }
  list[index] = {
    ...list[index],
    ...data,
    updateTime: moment().format("YYY-MM-DD HH:mm:ss"),
  };
  wirteDate(list);
  res.json({
    code: 200,
    msg: "ok",
  });
};
//写入数据
const wirteDate = (data) => {
  fs.writeFileSync(file, JSON.stringify({ list: data }));
  return;
};
module.exports = {
  carlist,
  caradd,
  caredit,
};
