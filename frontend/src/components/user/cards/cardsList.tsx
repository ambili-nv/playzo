import React from 'react';

const Card :React.FC=() => {
  // Dummy content
  const dummyImage = "/src/assets/images/banner2.jpg";
  const dummyTitle = "Dummy Title";
  const dummyLocation = "Dummy Location";
  const dummyRating = "4.5";
 
 
  return (
    <>
    <div className="flex flex-wrap justify-around  items-center  p-5">
    <div className="bg-white rounded-lg shadow-md overflow-hidden duration-300  hover:-translate-y-1 w-[350px] mt-5">
      <img src={dummyImage} alt={dummyTitle} className="w-full h-52 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{dummyTitle}</h3>
        <p className="text-gray-500">{ dummyLocation} </p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{dummyRating} </span>
          </div>
        </div>
      </div>
    </div>


    <div className="bg-white rounded-lg shadow-md overflow-hidden duration-300  hover:-translate-y-1 w-[350px] mt-5">
      <img src={dummyImage} alt={dummyTitle} className="w-full h-52 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{dummyTitle}</h3>
        <p className="text-gray-500">{ dummyLocation} </p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{dummyRating}</span>
          </div>
        </div>
      </div>
    </div>


    <div className="bg-white rounded-lg shadow-md overflow-hidden duration-300  hover:-translate-y-1 w-[350px] mt-5">
      <img src={dummyImage} alt={dummyTitle} className="w-full h-52 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{dummyTitle}</h3>
        <p className="text-gray-500">{ dummyLocation} </p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{dummyRating}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-lg shadow-md overflow-hidden duration-300  hover:-translate-y-1 w-[350px] mt-5">
      <img src={dummyImage} alt={dummyTitle} className="w-full h-52 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{dummyTitle}</h3>
        <p className="text-gray-500">{ dummyLocation}</p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{dummyRating}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-lg shadow-md overflow-hidden duration-300  hover:-translate-y-1 w-[350px] mt-5">
      <img src={dummyImage} alt={dummyTitle} className="w-full h-52 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{dummyTitle}</h3>
        <p className="text-gray-500">{ dummyLocation} </p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{dummyRating}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-lg shadow-md overflow-hidden duration-300  hover:-translate-y-1 w-[350px] mt-5">
      <img src={dummyImage} alt={dummyTitle} className="w-full h-52 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{dummyTitle}</h3>
        <p className="text-gray-500">{ dummyLocation} </p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{dummyRating}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-lg shadow-md overflow-hidden duration-300  hover:-translate-y-1 w-[350px] mt-5">
      <img src={dummyImage} alt={dummyTitle} className="w-full h-52 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{dummyTitle}</h3>
        <p className="text-gray-500">{ dummyLocation} </p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{dummyRating}</span>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-white rounded-lg shadow-md overflow-hidden duration-300  hover:-translate-y-1 w-[350px] mt-5">
      <img src={dummyImage} alt={dummyTitle} className="w-full h-52 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{dummyTitle}</h3>
        <p className="text-gray-500">{ dummyLocation} </p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="ml-1">{dummyRating}</span>
          </div>
        </div>
      </div>
    </div>



</div>

</>
  );
};

export default Card;
