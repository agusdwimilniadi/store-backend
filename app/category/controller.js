const Category = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMassage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = {
        message: alertMassage,
        status: alertStatus,
      };
      const category = await Category.find();
      res.render("admin/category/view_category", {
        category,
        alert,
      });
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/category/create");
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;
      let category = await Category({ name });
      await category.save();
      req.flash("alertMessage", `Berhasil tambah kategori`);
      req.flash("alertStatus", "success");
      res.redirect("/category");
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const category = await Category.findOne({ _id: id });
      res.render("admin/category/edit", { category });
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      await Category.findOneAndUpdate({ _id: id }, { name });
      req.flash("alertMessage", `Berhasil edit kategori`);
      req.flash("alertStatus", "success");
      res.redirect("/category");
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Category.findOneAndDelete({ _id: id });
      res.redirect("/category");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      console.log(error);
    }
  },
};
