export type IFasilitas = {
  fasilitas: string;
  createdAt: string;
  updatedAt: string;
};

// create request
export type FasilitasCreateRequestType = Pick<IFasilitas, "fasilitas">;

// response
export type FasilitasResponseType = IFasilitas & {
  _id: string;
};

// to response
export const toFasilitasResponseType = (
  response: IFasilitas & { _id: string }
): FasilitasResponseType => ({
  ...response,
  _id: response._id,
});
