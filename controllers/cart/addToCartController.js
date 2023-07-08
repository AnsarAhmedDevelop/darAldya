import { Cart } from "../../models/index.js";

const addToCartController = {
  async cartItems(req, res, next) {
    const { cart, name, email, phone } = req.body;
    const cartitem = new Cart({
      name,
      email,
      phone,
      cart,
    });

    try {
      await cartitem.save();
      res.status(201).json(cartitem);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Somthing went worng" });
    }
  },
  async latestCarts(req, res, next) {
    try {
      const cartDetails = await Cart.find({ isVerified: false }).sort({
        createdAt: -1,
      });
      res.status(200).json(cartDetails);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  },
  async verifiedCarts(req, res, next) {
    try {
      const cartDetails = await Cart.find({
        isVerified: true,
        isCompleted: false,
      }).sort({
        updatedAt: -1,
      });
      res.status(200).json(cartDetails);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  },
  async completedCarts(req, res, next) {
    try {
      const cartDetails = await Cart.find({
        isCompleted: true,
      }).sort({
        updatedAt: -1,
      });
      res.status(200).json(cartDetails);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  },
  async singleCart(req, res, next) {
    const id = req.params.id;
    try {
      const singleCartDetail = await Cart.find({ _id: id });

      res.status(200).json(singleCartDetail);
    } catch (error) {
      console.log(error);
      return next(error);
    }
  },
  async updateToVerifiedBooking(req, res, next) {
    const id = req.params.id;
    console.log(id, "id");
    try {
      const updateCartDetail = await Cart.findOneAndUpdate(
        { _id: id },
        {
          isVerified: true,
        },
        { new: true }
      );

      res.status(200).json(updateCartDetail);
    } catch (error) {
      console.log(error);

      return next(error);
    }
  },
  async updateToCompletedBooking(req, res, next) {
    const id = req.params.id;
    // console.log(id, "id");
    try {
      const updateCartDetail = await Cart.findOneAndUpdate(
        { _id: id },
        {
          isCompleted: true,
        },
        { new: true }
      );

      res.status(200).json(updateCartDetail);
    } catch (error) {
      console.log(error);

      return next(error);
    }
  },
};

export default addToCartController;
