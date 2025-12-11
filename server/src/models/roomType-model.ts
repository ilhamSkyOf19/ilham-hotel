export type IRoomType = {
  roomType: string;
  createdAt: string;
  updatedAt: string;
};

// create
export type RoomTypeCreateRequestType = Pick<IRoomType, "roomType">;

// update
export type RoomTypeUpdateRequestType = RoomTypeCreateRequestType;

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
