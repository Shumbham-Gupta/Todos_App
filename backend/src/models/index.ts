import mongoose, { Document, Schema } from 'mongoose';

// User Interface
export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  createdAt: Date;
}

// Todo Interface
export interface ITodo extends Document {
  title: string;
  description?: string;
  completed: boolean;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Error Log Interface
export interface IErrorLog extends Document {
  message: string;
  stack?: string;
  endpoint: string;
  method: string;
  userId?: mongoose.Types.ObjectId;
  statusCode: number;
  timestamp: Date;
}

// User Schema
const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Todo Schema
const TodoSchema = new Schema<ITodo>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Error Log Schema
const ErrorLogSchema = new Schema<IErrorLog>({
  message: {
    type: String,
    required: true,
  },
  stack: String,
  endpoint: {
    type: String,
    required: true,
  },
  method: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  statusCode: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model<IUser>('User', UserSchema);
export const Todo = mongoose.model<ITodo>('Todo', TodoSchema);
export const ErrorLog = mongoose.model<IErrorLog>('ErrorLog', ErrorLogSchema);