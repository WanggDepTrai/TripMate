import { useAuth } from '~/app/redux/slices';
import { useConfirm } from '../CoreComfirm';
import { useMutation } from '@tanstack/react-query';
import { serviceApi } from '@configs';

export const HeaderContetnGuide = () => {
   const { user, authLogin } = useAuth();

   const { mutate: getMe } = useMutation({
      mutationKey: ['putStatusGuide'],
      mutationFn: async () => {
         const res = await serviceApi.request.get('guides/me');
         console.log(res.data);
         return res.data;
      },
      onSuccess: (data) => {
         authLogin(data);
      },
   });

   const { mutate } = useMutation({
      mutationKey: ['putStatusGuide'],
      mutationFn: async () => {
         const res = await serviceApi.request.put('guides/me/status');
         console.log(res.data);
         return res.data;
      },
      onSuccess: () => {
         getMe();
      },
   });

   const coreConfirm = useConfirm();

   const handleChangeStatus = () => {
      coreConfirm({
         title: 'Chuyển trạng thái',
         confirmOk: 'Xác nhận',
         content: user?.status === 'Active' ? 'Xác nhận khóa tài khoản' : 'Xác nhận mở tài khoản',
         callbackOK: async () => {
            mutate();
         },
      });
   };

   return (
      <header className="flex justify-between items-center mb-8 bg-white py-2 px-6">
         <div className="flex items-center gap-2">
            <svg width="50" height="51" viewBox="0 0 50 51" fill="none" xmlns="http://www.w3.org/2000/svg">
               <rect y="0.593994" width="50" height="49.8539" rx="4" fill="#BD4545" />
               <mask
                  id="mask0_1_8484"
                  style={{
                     maskType: 'luminance',
                  }}
                  maskUnits="userSpaceOnUse"
                  x="0"
                  y="0"
                  width="50"
                  height="51"
               >
                  <rect y="0.593994" width="50" height="49.8539" rx="4" fill="white" />
               </mask>
               <g mask="url(#mask0_1_8484)">
                  <path
                     d="M28.4273 22.1035H24.9999H21.5724C19.6874 22.1035 18.145 23.6413 18.145 25.5209V30.647C18.145 31.2736 18.4306 31.8431 18.8305 32.2418C19.2304 32.6405 19.8016 32.9253 20.43 32.9253V38.0514C20.43 39.931 21.9723 41.4688 23.8574 41.4688H24.9999H26.1423C28.0274 41.4688 29.5698 39.931 29.5698 38.0514V32.9253C30.1981 32.9253 30.7693 32.6975 31.1692 32.2418C31.5691 31.8431 31.8547 31.2736 31.8547 30.647V25.5209C31.8547 23.6413 30.3124 22.1035 28.4273 22.1035Z"
                     fill="white"
                  />
                  <path
                     d="M24.9996 19.8253C27.208 19.8253 28.9983 18.0402 28.9983 15.8383C28.9983 13.6363 27.208 11.8513 24.9996 11.8513C22.7912 11.8513 21.001 13.6363 21.001 15.8383C21.001 18.0402 22.7912 19.8253 24.9996 19.8253Z"
                     fill="white"
                  />
                  <path
                     d="M16.774 35.0327C16.6598 34.9187 16.4884 34.8048 16.3742 34.6909C15.2888 33.5518 14.6605 32.1279 14.6605 30.647V25.5209C14.6605 23.6983 15.4031 21.9896 16.6027 20.7935C16.9454 20.4517 16.6598 19.8252 16.2028 19.8252C15.2317 19.8252 14.1463 19.8252 14.1463 19.8252H10.7189C8.83384 19.8252 7.2915 21.363 7.2915 23.2426V28.3687C7.2915 28.9952 7.57712 29.5648 7.97699 29.9635C8.37685 30.3622 8.94809 30.647 9.57645 30.647V35.7731C9.57645 37.6527 11.1188 39.1905 13.0039 39.1905H14.1463H15.2888C15.8029 39.1905 16.2599 39.0766 16.6598 38.9057C16.8883 38.7918 17.0025 38.6209 17.0025 38.3931C17.0025 37.7096 17.0025 36.1148 17.0025 35.4883C17.0025 35.3174 16.9454 35.1466 16.774 35.0327Z"
                     fill="white"
                  />
                  <path
                     d="M14.1461 17.5469C16.3545 17.5469 18.1448 15.7619 18.1448 13.56C18.1448 11.358 16.3545 9.573 14.1461 9.573C11.9377 9.573 10.1475 11.358 10.1475 13.56C10.1475 15.7619 11.9377 17.5469 14.1461 17.5469Z"
                     fill="white"
                  />
                  <path
                     d="M39.2807 19.8252H35.8533C35.8533 19.8252 34.7679 19.8252 33.7968 19.8252C33.2827 19.8252 33.0542 20.3948 33.3969 20.7935C34.5965 22.0465 35.3391 23.6983 35.3391 25.5209V30.647C35.3391 32.1279 34.7679 33.5518 33.6254 34.6909C33.5112 34.8048 33.3969 34.9187 33.2256 35.0327C33.1113 35.1466 32.9971 35.3174 32.9971 35.4883C32.9971 36.1148 32.9971 37.6527 32.9971 38.3931C32.9971 38.6209 33.1113 38.8488 33.3398 38.9057C33.7397 39.0766 34.1967 39.1905 34.7108 39.1905H35.8533H36.9957C38.8808 39.1905 40.4231 37.6527 40.4231 35.7731V30.647C41.0515 30.647 41.6227 30.4192 42.0226 29.9635C42.4225 29.5648 42.7081 28.9952 42.7081 28.3687V23.2426C42.7081 21.363 41.1658 19.8252 39.2807 19.8252Z"
                     fill="white"
                  />
                  <path
                     d="M35.8531 17.5469C38.0615 17.5469 39.8518 15.7619 39.8518 13.56C39.8518 11.358 38.0615 9.573 35.8531 9.573C33.6448 9.573 31.8545 11.358 31.8545 13.56C31.8545 15.7619 33.6448 17.5469 35.8531 17.5469Z"
                     fill="white"
                  />
               </g>
            </svg>

            <div>
               <h1 className="text-xl font-bold text-[#6D1950]">Tripmate's Guide</h1>
               <p className="text-2xl text-[#BD4545]">{user?.fullName}</p>
            </div>
         </div>
         <div className="flex items-center gap-2">
            <div className="h-8 rounded-full w-20 ">
               <label className="switch">
                  <input type="checkbox" checked={user?.status === 'Active'} onClick={handleChangeStatus} />
                  <span className="slider round"></span>
               </label>
            </div>
            <span className="text-xl text-purple-800 mr-2">{user?.status}</span>
         </div>
      </header>
   );
};
