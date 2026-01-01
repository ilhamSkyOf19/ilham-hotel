import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type BookingType = {
  idHotel: string;
  checkIn: string;
  checkOut: string;
};

// type transaction state
const initialState: BookingType = {
  idHotel: "",
  checkIn: "",
  checkOut: "",
};

// booking slice
const BookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setBooking: (state, action: PayloadAction<BookingType>) => {
      Object.assign(state, action.payload ?? {});
    },
    clearBooking: () => ({ ...initialState }),
  },
});

// export
export const { setBooking, clearBooking } = BookingSlice.actions;
export default BookingSlice.reducer;
