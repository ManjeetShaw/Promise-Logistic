import { Router } from "express";
import crypto from "crypto";
import Enquiry from "../models/Enquiry.js";

const router = Router();
const str = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

function isAdmin(req) {
  const key = process.env.ADMIN_KEY || "";
  const given = req.get("x-admin-key") || "";
  if (!key || key.length !== given.length) return false;
  return crypto.timingSafeEqual(Buffer.from(key), Buffer.from(given));
}

// Save a new enquiry (public)
router.post("/", async (req, res, next) => {
  try {
    const b = req.body || {};
    const data = {
      name: str(b.name, 100), company: str(b.company, 150), email: str(b.email, 150),
      phone: str(b.phone, 30), product: str(b.product, 50), productName: str(b.productName, 150),
      quantity: Number(b.quantity), message: str(b.message, 2000),
    };
    if (!data.name || !isEmail(data.email) || data.phone.replace(/\D/g, "").length < 7 ||
        !data.product || !Number.isFinite(data.quantity) || data.quantity < 1) {
      return res.status(400).json({ error: "Invalid enquiry" });
    }
    await Enquiry.create(data);
    res.status(201).json({ ok: true });
  } catch (err) { next(err); }
});

// List saved enquiries (admin only: header x-admin-key)
router.get("/", async (req, res, next) => {
  try {
    if (!isAdmin(req)) return res.status(401).json({ error: "Unauthorized" });
    res.json(await Enquiry.find().sort({ createdAt: -1 }).limit(200));
  } catch (err) { next(err); }
});

export default router;
