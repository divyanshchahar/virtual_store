import express from "express";
import { Products } from "../schema/productSchema";

const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).send(products).end();
  } catch (error) {
    res.status(500).send(error).end();
  }
});

router.route("/:productId").get(async (req, res) => {
  try {
    const result = await Products.findById(req.params.productId);
    res.status(200).send(result).end();
  } catch (error) {
    res.status(500).send(error).end();
  }
});

export default router;
