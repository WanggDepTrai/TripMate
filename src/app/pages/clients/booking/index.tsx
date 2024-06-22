import { images } from '@assets/images';
import { useSearchParamsHook } from '@hooks';

export const Booking = () => {
   const { searchParams } = useSearchParamsHook();

   // const handlePay = async () => {
   //    await axios
   //       .put(
   //          `http://localhost:5000/api/v1/transactions/${id}/status`,
   //          {
   //             status: 'PeddingComfirm',
   //          },
   //          {
   //             headers: {
   //                Authorization: `Bearer ${localStorage.getItem(SETTINGS_CONFIG.ACCESS_TOKEN_KEY)?.replace(/"/g, '')}`,
   //             },
   //          },
   //       )
   //       .then((response) => {
   //          if (response.data.isSuccess) {
   //             toast.success(response.data.message);
   //             return;
   //          }

   //          return toast.error(response.data.message);
   //       })
   //       .catch((error) => {
   //          console.log(error);
   //       });
   // };

   return (
      <div>
         {/* <Header /> */}
         <div className="container">
            <div className=" max-w-5xl mx-auto  rounded-lg p-6">
               <div className="mb-10">
                  <h1 className="text-3xl font-bold text-center">Vui lòng thanh toán </h1>
                  <div className="flex items-center flex-col gap-y-4 mt-4 ">
                     <div className="text-xl font-bold">Tổng thanh toán: {searchParams['price']} VND</div>
                     <div className="text-md">Nội dung chuyển khoản: Tên người dùng + Số điện thoại hoặc email</div>

                     <div className="flex items-center justify-center">
                        <img className=" object-contain" src={images.qr} />
                     </div>
                  </div>
                  {/* <div className="mt-20 flex items-center justify-end ">
                     <button className='px-4 py-2 bg-primary text-white rounded-md' onClick={handlePay}>Xác nhận thanh toán</button>
                  </div> */}
               </div>
            </div>
         </div>
         <div className="mt-3 h-10"></div>
      </div>
   );
};
