import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, maxlength: 100 },
    company: { type: String, maxlength: 150, default: "" },
    email: { type: String, required: true, lowercase: true, maxlength: 150 },
    phone: { type: String, required: true, maxlength: 30 },
    product: { type: String, required: true, maxlength: 50 },
    productName: { type: String, maxlength: 150, default: "" },
    quantity: { type: Number, required: true, min: 1 },
    message: { type: String, maxlength: 2000, default: "" },
    status: { type: String, enum: ["new", "contacted", "closed"], default: "new" },
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);
