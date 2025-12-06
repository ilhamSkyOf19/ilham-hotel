export interface PayloadType {
  _id: string;
  fullName: string;
  email: string;
  isActive: boolean;
  role: "admin" | "customer";
  createAt: string;
  updatedAt: string;
}
