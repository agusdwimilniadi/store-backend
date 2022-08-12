const Voucher = require("./model");
const Category = require("../category/model");
const Nominal = require("../nominal/model");
const path = require("path");
const fs = require("fs");
const config = require("../../config/index");

module.exports = {
  index: async (req, res) => {
    try {
      const alertMassage = req.flash("alertMessage");
      const alertStatus = req.flash("alertStatus");

      const alert = {
        message: alertMassage,
        status: alertStatus,
      };
      const voucher = await Voucher.find();
      res.render("admin/voucher/view_voucher", {
        voucher,
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
      const category = await Category.find();
      const nominal = await Nominal.find();
      const rupiah = require("rupiah-format");

      res.render("admin/voucher/create", {
        category,
        nominal,
        rupiah,
      });
    } catch (err) {
      console.log(err);
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
  actionCreate: async (req, res) => {
    try {
      const { name, category, nominals } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originaExt =
          req.file.originalname.split(".")[
            req.file.originalname.split(".").length - 1
          ];
        let filename = req.file.filename + "." + originaExt;
        console.log("========= FILE NAME ========= ", filename);
        let target_path = path.resolve(
          config.rootpath,
          `public/uploads/${filename}`
        );

        const src = fs.createReadStream(tmp_path);
        const dest = fs.createWriteStream(target_path);

        src.pipe(dest);

        src.on("end", async () => {
          try {
            const voucher = new Voucher({
              name,
              category,
              nominals,
              thumbnial: filename,
            });

            await voucher.save();

            req.flash("alertMessage", "Berhasil tambah voucher");
            req.flash("alertStatus", "success");

            res.redirect("/voucher");
          } catch (err) {
            req.flash("alertMessage", `${err.message}`);
            req.flash("alertStatus", "danger");
            res.redirect("/voucher");
          }
        });
      } else {
        const voucher = new Voucher({
          name,
          category,
          nominals,
        });

        await voucher.save();

        req.flash("alertMessage", "Berhasil tambah voucher");
        req.flash("alertStatus", "success");

        res.redirect("/voucher");
      }
    } catch (err) {
      req.flash("alertMessage", `${err.message}`);
      req.flash("alertStatus", "danger");
      res.redirect("/voucher");
    }
  },
  //   viewEdit: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       const nominal = await Nominal.findOne({ _id: id });
  //       console.log("Nominalll ", nominal);
  //       res.render("admin/nominal/edit", { nominal, rupiah });
  //     } catch (error) {
  //       console.log(error);
  //       req.flash("alertMessage", `${error.message}`);
  //       req.flash("alertStatus", "danger");
  //     }
  //   },
  //   actionEdit: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       const { coinName, coinQuantity, price } = req.body;
  //       await Nominal.findOneAndUpdate(
  //         { _id: id },
  //         { coinName, coinQuantity, price }
  //       );
  //       req.flash("alertMessage", `Berhasil edit Koin`);
  //       req.flash("alertStatus", "success");
  //       res.redirect("/nominal");
  //     } catch (error) {
  //       console.log(error);
  //       req.flash("alertMessage", `${error.message}`);
  //       req.flash("alertStatus", "danger");
  //     }
  //   },
  //   actionDelete: async (req, res) => {
  //     try {
  //       const { id } = req.params;
  //       await Nominal.findOneAndDelete({ _id: id });
  //       res.redirect("/nominal");
  //     } catch (error) {
  //       req.flash("alertMessage", `${error.message}`);
  //       req.flash("alertStatus", "danger");
  //       console.log(error);
  //     }
  //   },
};
