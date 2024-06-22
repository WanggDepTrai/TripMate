import ReactECharts from 'echarts-for-react';

import { useMemo } from 'react';

const AxisAlignWithTick = ({ data }: { data: Array<{ count: number; duration: number }> }) => {
   const option = useMemo(() => {
      const durations = data?.map((item) => item.duration);
      const counts = data?.map((item) => item.count);

      return {
         tooltip: {
            trigger: 'axis',
            axisPointer: {
               type: 'shadow',
            },
         },
         grid: {
            left: '0%',
            right: '4%',
            bottom: '0%',
            containLabel: true,
         },
         xAxis: [
            {
               type: 'category',

               data: durations,
               axisTick: {
                  alignWithLabel: true,
               },
            },
         ],
         yAxis: [
            {
               type: 'value',
            },
         ],
         series: [
            {
               name: 'Khoảng thời gian (giờ)',
               type: 'bar',
               barWidth: '60%',
               data: counts,
            },
         ],
      };
   }, [data]);

   return (
      <div>
         <ReactECharts style={{ height: 400, width: '100%' }} option={option} />
      </div>
   );
};

export default AxisAlignWithTick;
