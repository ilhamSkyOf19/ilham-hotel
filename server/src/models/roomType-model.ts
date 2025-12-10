export type IRoomType = {
  roomType: string;
};

// create
export type RoomTypeCreateRequest = IRoomType;

// response type
export type RoomTypeResponseType = IRoomType & { _id: string };

// to response type
export const toRoomTypeResponseType = (
  response: IRoomType & { _id: string }
): RoomTypeResponseType => ({
  ...response,
  _id: response._id,
});
