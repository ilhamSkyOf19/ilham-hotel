export type IFasilitas = {
  fasilitas: string;
  createdAt: string;
  updatedAt: string;
};

// create request
export type FasilitasCreateRequestType = Pick<IFasilitas, "fasilitas">;

// update
export type FasilitasUpdateRequestType = FasilitasCreateRequestType;

// response
export type FasilitasResponseType = Pick<IFasilitas, "fasilitas"> & {
  _id: string;
};

// to response
export const toFasilitasResponseType = (
  response: IFasilitas & { _id: string }
): FasilitasResponseType => ({
  _id: response._id,
  fasilitas: response.fasilitas,
});
