import 'swiper/css';
import 'swiper/css/navigation';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import { LazyLoadingImage } from '@components';

export const Destinations = () => {
   return (
      <Swiper
         slidesPerView={5}
         spaceBetween={15}
         navigation={true}
         modules={[Navigation]}
         className="mySwiper rounded-md !mx-10"
      >
         <SwiperSlide className="pb-1 text-start !h-[350px] ">
            <LazyLoadingImage
               className="rounded-xl w-full h-full"
               src="https://s3-alpha-sig.figma.com/img/c317/95c5/b56827ff48ae5bf70c45d661117ea329?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=RxY-i4zfp4wJzqk-LMxstVHSmm5Xq5E0ok6bOWYLqhFH2YyIwRY~FgkOyKnkALfoT~TuMrSE-97p5vxY2PTzL1dNOC4SDx6KxjTQkpeutB1HMfwPHff251-4LPWaAOqXWsbKzEWzX7dCZvX1-R2szU6c0-21Cx9pMJvNnPFPrNJ4DHNdps6~i5o8cS0We9Bop3meSpLnA-MRuiYor3Km0id6NqG6JRjeH2N-0acd0nzkCmrk9ntJlQruE60i3IDQJKcqPG0l3pYqg7KP35Dg1fyT8YR4Ov2Kz02oA6i~GxglyUV7bMeIGC7AjQroU0xgYb5CmOIJZh7OqEpKl4vPEQ__"
            />
         </SwiperSlide>
         <SwiperSlide className="pb-1 text-start !h-[350px]">
            <LazyLoadingImage
               className="rounded-xl w-full h-full"
               src="https://s3-alpha-sig.figma.com/img/32cb/ae28/9fd7632c63e32df7ca132c485b588a79?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=eHR73W2deNaN8rtBbEAvU2SNBD-~3SHFAx2UnjHT2KdhLpDVToWv~0J-7g~NMmBsRfzKZqOb0po7b1B6RTzIPIf22xslhGE0ibajb4aP4SSbrdhzUvixJ3X1h9FVX1hom~97XN6Xf~n2qtY3q05xto2B19yREaKfvtDJ7hVofru~TlbkOZuwQ2bhyv9~iwm0p90h6ccGORic~x7QKiW38v8k-Kw2Vs-f~4602XnY2dlrROBx8aiQO8DhNtE~jhYdl0KL94NDcifvEQWbts5OUMo25G8AChivwlCEh9HcWEBJ7pnmtq5-Lg4fDBdnZlo1N0mZuoijMyyyLrsST1LjYA__"
            />
         </SwiperSlide>
         <SwiperSlide className="pb-1 text-start !h-[350px]">
            <LazyLoadingImage
               className="rounded-xl w-full h-full"
               src="https://s3-alpha-sig.figma.com/img/2eae/6e0c/d267ee5b4001a4fc2a28bd3fbc72d9c5?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=dQhZIlwicWtu7WsWXye9m3q88TneWJNxGAgx87iq5J~Z5LYl9p4eBDN6CYdShDKIqquSt4ddychD7v-xToCjtPfSS6aLn5iZfe-G8vTFcOzpzbT6JYrt0sAb7Pc1UfMijPK9BW9EJ1AKqgEXeOPXYQAAt98cIekqr8SDxm9taX8gB86AJ~d4LIH3oqMKC1RL~9VPU30iQXR9iBrgOAJh9vwae67KqfHqnapwjheUuydhfmL2Z6uwl44eHZpukqpDya~1tS~-HZEVLRy9HutdNrLAtTGsVNjM2yxOuwo0AqgC4S4dGGZ7c6sv9BcshznoBB2L6wRHaGR~y4ndywvs8A__"
            />
         </SwiperSlide>
         <SwiperSlide className="pb-1 text-start !h-[350px]">
            <LazyLoadingImage
               className="rounded-xl w-full h-full"
               src="https://s3-alpha-sig.figma.com/img/6f07/636e/dd79b75338cd3ee6ebb7d6043cf9669b?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b1rX5EQAMuQovQ48le5VPfLQF9Dr7gthR~4Pm6SQn~PM2kGbxxQ8M1BfFQJM26NVgJDcJEdKVuMYmSfrvnRnDZ9YQOMXo9aL-s2NF0JsB1xxp4OOAL5BJ9bADZreC2V~9fOMbQckJTWxMTKHJn2lIbZ-6dCa9BC39CziJpyHl3FivT0gxgqq61KPJvSf~8E2YxaajL9u7lwDniy~1BC2qRL5bG~JFdlaxhQwgw6X4ji5uQrctfpf04jMcI~PFUWjkLntzNr1L-8z-txthgj40981B8tTiKrS~1ZVc6PeQyq2fKufUG6bz32NaSe5EsQzxYPApBtr4MLmnbB3TW0t9Q__"
            />
         </SwiperSlide>
         <SwiperSlide className="pb-1 text-start !h-[350px]">
            <LazyLoadingImage
               className="rounded-xl w-full h-full"
               src="https://s3-alpha-sig.figma.com/img/6f07/636e/dd79b75338cd3ee6ebb7d6043cf9669b?Expires=1718582400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=b1rX5EQAMuQovQ48le5VPfLQF9Dr7gthR~4Pm6SQn~PM2kGbxxQ8M1BfFQJM26NVgJDcJEdKVuMYmSfrvnRnDZ9YQOMXo9aL-s2NF0JsB1xxp4OOAL5BJ9bADZreC2V~9fOMbQckJTWxMTKHJn2lIbZ-6dCa9BC39CziJpyHl3FivT0gxgqq61KPJvSf~8E2YxaajL9u7lwDniy~1BC2qRL5bG~JFdlaxhQwgw6X4ji5uQrctfpf04jMcI~PFUWjkLntzNr1L-8z-txthgj40981B8tTiKrS~1ZVc6PeQyq2fKufUG6bz32NaSe5EsQzxYPApBtr4MLmnbB3TW0t9Q__"
            />
         </SwiperSlide>
      </Swiper>
   );
};
