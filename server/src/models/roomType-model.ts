export type IRoomType = {
  roomType: string;
  createdAt: string;
  updatedAt: string;
};

// create
export type RoomTypeCreateRequest = Pick<IRoomType, "roomType">;

// response type
export type RoomTypeResponseType = IRoomType & { _id: string };

// to response type
export const toRoomTypeResponseType = (
  response: IRoomType & { _id: string }
): RoomTypeResponseType => ({
  _id: response._id,
  roomType: response.roomType,
  createdAt: response.createdAt,
  updatedAt: response.updatedAt,
});
