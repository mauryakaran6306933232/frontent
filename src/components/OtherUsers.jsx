import React from 'react'
import OtherUser from './OtherUser'
import { useSelector } from 'react-redux';
import useGetOtherUser from '../hooks/useGetOtherUser';
import Store from '../redux/store';
export default function OtherUsers() {
    useGetOtherUser();
    const { otherUsers } = useSelector(Store => Store.user)
    console.log('new other usre', otherUsers)
    if (!otherUsers) {
        return;
    }

    return (
        <div className='h-[450px] overflow-auto'>
            {
                otherUsers?.map((user) => {
                    return (
                        <OtherUser key={user._id} user={user} />
                    )
                })
            }

        </div>
    )
}
