const Nominal = require("./model");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMassage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = {
        message: alertMassage,
        status: alertStatus,
      };
      const nominal = await Nominal.find();
      res.render("admin/nominal/view_nominal", {
        nominal,
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
      res.render("admin/nominal/create");
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { coinName, coinQuantity, price } = req.body;
      let nominal = await Nominal({ coinName, coinQuantity, price });
      await nominal.save();
      req.flash("alertMessage", `Berhasil tambah Nominal`);
      req.flash("alertStatus", "success");
      res.redirect("/nominal");
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/nominal");
    }
  },
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const nominal = await Nominal.findOne({ _id: id });
      console.log("Nominalll ", nominal);
      res.render("admin/nominal/edit", { nominal, rupiah });
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { coinName, coinQuantity, price } = req.body;
      await Nominal.findOneAndUpdate(
        { _id: id },
        { coinName, coinQuantity, price }
      );
      req.flash("alertMessage", `Berhasil edit Koin`);
      req.flash("alertStatus", "success");
      res.redirect("/nominal");
    } catch (error) {
      console.log(error);
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
    }
  },
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Nominal.findOneAndDelete({ _id: id });
      res.redirect("/nominal");
    } catch (error) {
      req.flash("alertMessage", `${error.message}`);
      req.flash("alertStatus", "danger");
      console.log(error);
    }
  },
};
