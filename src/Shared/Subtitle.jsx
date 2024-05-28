

import React from 'react';

const Subtitle = ({ subtitle }) => {
  return (
    <div>
      <h3 className="bg-red-800 font-subtitle text-white inline-block px-3 py-1 rounded-full font-medium italic text-base md:text-lg lg:text-xl">
        {subtitle}
      </h3>
    </div>
  );
};

export default Subtitle;
