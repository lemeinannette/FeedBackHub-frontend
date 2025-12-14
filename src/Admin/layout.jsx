import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className='flex h-screen w-full'>
      {/* Sidebar */}
      <div className='fixed h-[480px] top-0 left-0 w-50 mt-15 ml-5 rounded-lg shadow-md overflow-y-auto'>
        {children.sidebar}
      </div>

      {/* Main content */}
      <div className='ml-[245px] flex flex-col w-full items-center justify-start overflow-y-auto pt-7'>
        {children.main}
      </div>
    </div>
  );
};

export default Layout;
