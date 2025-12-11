export type IFasilitas = {
  fasilitas: string;
  createdAt: string;
  updatedAt: string;
};

// create request
export type FasilitasCreateRequestType = Pick<IFasilitas, "fasilitas">;

// update
export type FasilitasUpdateRequestType = Partial<FasilitasCreateRequestType>;

// response
export type FasilitasResponseType = IFasilitas & {
  _id: string;
};

// to response
export const toFasilitasResponseType = (
  response: IFasilitas & { _id: string }
): FasilitasResponseType => ({
  _id: response._id,
  fasilitas: response.fasilitas,
  createdAt: response.createdAt,
  updatedAt: response.updatedAt,
});
