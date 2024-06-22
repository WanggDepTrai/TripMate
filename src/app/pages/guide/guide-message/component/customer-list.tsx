import React from 'react';

const CustomerList = () => {
   return (
      <div>
         <h2 className="text-xl font-bold text-[#303030]">Customers</h2>
         <div className="rounded-lg mt-4">
            <div className="flex items-center mb-4 px-1 border-b border-[#b4abab80] pb-2">
               <img
                  src="https://s3-alpha-sig.figma.com/img/ee16/b8a6/91dc58dc8f6093ec9274311c90aefd24?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AAS40e0OcjoA2KitqsJyAhYjwK5i1CT~dlGCGXoqrU15D6GirJ3E~dBh~NRXiuHXXan78Qrplawt3kfZDFuC5mVQbaG5cya7glKqqKN0qCjgFoxQbYe6I0bWKpaucpI8fwb2F8iNkKbA8SOYMK8feG1KH~NPzc3xSiQiOPd~s~z2cMas5rwdS85ZMoOhoVxp4vn9WRx~i3IfHI~Xtn-wFHPssuXZ3DXLrLpkNBhExWuZ08cufe3nOTb6YKA8Y-WcEiACjDhaxutXMPcPZ84q0EswOopictvkJXVXSZXJyRh32IjVMm91ovdcV2Mu~Pc8cVO4V8wnO6hkO2aWaTNQGA__"
                  alt="Group 1"
                  className="w-10 h-10 rounded-full mr-4"
               />
               <div>
                  <p className="font-bold">Guides District 9</p>
                  <p className="text-gray-500">Hahahahah!</p>
               </div>
               {/* <span className="ml-auto text-red-500">4</span> */}
               <span className="ml-auto text-blue-500">&#10003;&#10003;</span>
            </div>
            <div className="flex items-center mb-4 px-1 border-b border-[#b4abab80] pb-2">
               <img
                  src="https://s3-alpha-sig.figma.com/img/ee16/b8a6/91dc58dc8f6093ec9274311c90aefd24?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AAS40e0OcjoA2KitqsJyAhYjwK5i1CT~dlGCGXoqrU15D6GirJ3E~dBh~NRXiuHXXan78Qrplawt3kfZDFuC5mVQbaG5cya7glKqqKN0qCjgFoxQbYe6I0bWKpaucpI8fwb2F8iNkKbA8SOYMK8feG1KH~NPzc3xSiQiOPd~s~z2cMas5rwdS85ZMoOhoVxp4vn9WRx~i3IfHI~Xtn-wFHPssuXZ3DXLrLpkNBhExWuZ08cufe3nOTb6YKA8Y-WcEiACjDhaxutXMPcPZ84q0EswOopictvkJXVXSZXJyRh32IjVMm91ovdcV2Mu~Pc8cVO4V8wnO6hkO2aWaTNQGA__"
                  alt="Group 1"
                  className="w-10 h-10 rounded-full mr-4"
               />
               <div>
                  <p className="font-bold">Guides 5 Star</p>
                  <p className="text-gray-500">Hahahahah!</p>
               </div>
            </div>
            <div className="flex items-center px-1 border-b border-[#b4abab80] pb-2">
               <img
                  src="https://s3-alpha-sig.figma.com/img/ee16/b8a6/91dc58dc8f6093ec9274311c90aefd24?Expires=1717372800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=AAS40e0OcjoA2KitqsJyAhYjwK5i1CT~dlGCGXoqrU15D6GirJ3E~dBh~NRXiuHXXan78Qrplawt3kfZDFuC5mVQbaG5cya7glKqqKN0qCjgFoxQbYe6I0bWKpaucpI8fwb2F8iNkKbA8SOYMK8feG1KH~NPzc3xSiQiOPd~s~z2cMas5rwdS85ZMoOhoVxp4vn9WRx~i3IfHI~Xtn-wFHPssuXZ3DXLrLpkNBhExWuZ08cufe3nOTb6YKA8Y-WcEiACjDhaxutXMPcPZ84q0EswOopictvkJXVXSZXJyRh32IjVMm91ovdcV2Mu~Pc8cVO4V8wnO6hkO2aWaTNQGA__"
                  alt="Group 1"
                  className="w-10 h-10 rounded-full mr-4"
               />
               <div>
                  <p className="font-bold">Guides 3 years</p>
                  <p className="text-gray-500">Hahahahah!</p>
               </div>
            </div>
         </div>
         
      </div>
   );
};

export default CustomerList;
