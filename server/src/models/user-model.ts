// IUser shcema type
export interface IUser {
  _id?: string;
  fullName: string;
  email: string;
  phone: string;
  role: "admin" | "customer";
  password: string;
  avatar: string;
  isActive: boolean;
  activateCode: string;
  createdAt: string;
  updatedAt: string;
}

// create request
export interface UserCreateRequestType
  extends Pick<IUser, "fullName" | "email" | "phone" | "password"> {}

// response user
export interface UserResponseType
  extends Omit<IUser, "password" | "activateCode"> {}

// to response
export const toUserResponseType = (user: IUser): UserResponseType => ({
  _id: user._id,
  fullName: user.fullName,
  email: user.email,
  phone: user.phone,
  role: user.role,
  avatar: user.avatar,
  isActive: user.isActive,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});
