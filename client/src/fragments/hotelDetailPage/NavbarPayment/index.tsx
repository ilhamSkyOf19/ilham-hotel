// import React, { type FC, type RefObject } from 'react'
// import ButtonAction from '../../../components/ButtonAction';

// type Props = {
//     refModalBooking: RefObject<>
// }

// const NavbarPayment: FC = () => {
//   return (
//      <>
//       <div
//         ref={refModalBooking}
//         className={clsx(
//           "w-screen fixed bottom-0 h-[70vh] bg-white shadow-[0_0_10px_3px_rgba(0,0,0,0.1)] z-40 rounded-t-3xl py-2 flex flex-row justify-start items-center gap-2 transition-all duration-300 ease-in-out",
//           isModalBookingOpen ? "max-h-[70vh]" : "max-h-18"
//         )}
//       >
//         {/* total price */}
//         {bookingPending.data?.data ? (
//           <div className="w-full flex flex-row justify-start items-center px-4">
//             <ButtonAction
//               label="Lanjutkan Pembayaran"
//               blue={true}
//               link={`/bookings/detail/${bookingPending.data?.data}`}
//               linkFrom={"hotel-detail"}
//               button={true}
//             />
//           </div>
//         ) : !bookingPending.isPending &&
//           !isModalBookingOpen &&
//           !isModalWarning ? (
//           <ButtonBooking handleModalActive={() => handleButtonBooking()} />
//         ) : (
//           isModalBookingOpen &&
//           hotel?.data && (
//             <BookingSection
//               handleModalClose={() => setIsModalBookingOpen(false)}
//               idHotel={idHotel ?? ""}
//               nameHotel={hotel?.data?.data?.name ?? ""}
//               city={hotel?.data?.data?.location.city ?? ""}
//               country={hotel?.data?.data?.location.country ?? ""}
//               discount={hotel?.data?.data?.discount ?? 0}
//               linkMaps={hotel?.data?.data?.linkMaps ?? ""}
//               price={hotel?.data?.data?.price ?? 0}
//             />
//           )
//         )}
//       </div>

//       {/* modal warning */}
//       <div
//         ref={refModalWarning}
//         className={clsx(
//           "w-full fixed h-[45vh] bottom-0 bg-white shadow-[0_0_10px_3px_rgba(0,0,0,0.1)] z-50 rounded-t-3xl flex flex-col justify-start items-center pt-8 px-6 transition-all duration-300 ease-in-out gap-8",
//           isModalWarning
//             ? "max-h-[45vh] translate-y-0"
//             : "max-h-0 translate-y-full "
//         )}
//       >
//         <h2 className="text-xl font-semibold text-black text-center">
//           Anda memiliki pemesanan hotel yang sedang aktif
//         </h2>
//         <p className="text-base font-light text-black text-center">
//           Apakah Anda ingin melanjutkan pemesanan di hotel ini dan membatalkan
//           pemesanan sebelumnya?
//         </p>

//         {/* button action */}
//         <div className="w-full flex flex-row justify-between items-center">
//           {/* button batal */}
//           <button
//             onClick={() => setIsModalWarning(false)}
//             type="button"
//             className="py-4 px-10 border border-primary-skyblue rounded-full font-medium text-primary-skyblue relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-black/10 before:opacity-0 before:transition-opacity before:duration-300 before:ease-in-out hover:before:opacity-100"
//           >
//             Batal
//           </button>

//           {/* button lanjutkan */}
//           <button
//             onClick={() => {
//               setIsModalBookingOpen(true), setIsModalWarning(false);
//             }}
//             type="button"
//             className="py-4 px-10 border border-primary-skyblue rounded-full bg-primary-skyblue text-white font-medium relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-black/10 before:opacity-0 before:transition-opacity before:duration-300 before:ease-in-out hover:before:opacity-100"
//           >
//             Lanjutkan
//           </button>
//         </div>
//       </div>
//      </>
//   )
// }

// export default NavbarPayment
