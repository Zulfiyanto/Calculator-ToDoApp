const { todo } = require("../../models");

exports.AddTodo = async (req, res) => {
  try {
    const data = req.body;
    console.log(req.body.do);
    const datas = await todo.create({ do: req.body.do });
    let todos = await todo.findOne({
      where: { id: datas.id },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    todos = JSON.parse(JSON.stringify(todos));
    res.send({
      status: "success",
      data: {
        todos,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.DeleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    await todo.destroy({
      where: {
        id,
      },
    });
    res.send({
      status: "success",
      data: {
        id,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.UpdateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const datas = await todo.update({ ...data }, { where: { id } });

    res.send({
      status: "success",
      datas,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.GetTodos = async (req, res) => {
  try {
    const datas = await todo.findAll();

    res.send({
      status: "success",
      datas,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
