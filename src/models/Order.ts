import { Schema, model, Types, Document } from "mongoose";

export type OrderStatus = "draft" | "placed";

export interface IOrderItem {
  productId: Types.ObjectId;
  quantity: number;
}

export interface IOrder extends Document {
  userId: Types.ObjectId;
  products: IOrderItem[];
  total: number;
  status: OrderStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

const orderItemSchema = new Schema<IOrderItem>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [1, "Quantity must be at least 1"],
    },
  },
  { _id: false }
);

const orderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: {
      type: [orderItemSchema],
      default: [],
      required: true,
    },
    total: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Total cannot be negative"],
    },
    status: {
      type: String,
      enum: ["draft", "placed"],
      default: "draft",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IOrder>("Order", orderSchema);