import React from 'react'
import MesssageContainer from './MesssageContainer';
import SiedeBar from './SiedeBar';
export default function Homepage() {
  return (
    <div className='flex sm:h-[450px] md:h-[450px] rounded-lg overflow-hidden bg-white/30 backdrop-blur-lg'>
  <SiedeBar />
  <MesssageContainer />
</div>

  )
}
