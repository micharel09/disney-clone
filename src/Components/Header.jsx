import React, { useState, useEffect } from 'react'
import { signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { auth, googleProvider } from '../firebase';
import logo from './../assets/Images/logo.png'
import { HiHome, HiMagnifyingGlass, HiStar, HiPlayCircle, HiTv } from "react-icons/hi2";
import { HiPlus, HiDotsVertical } from "react-icons/hi";
import HeaderItem from './HeaderItem';

function Header() {
    const [toggle, setToggle] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const menu = [
        { name: 'HOME', icon: HiHome },
        { name: 'SEARCH', icon: HiMagnifyingGlass },
        { name: 'WATCH LIST', icon: HiPlus },
        { name: 'ORIGINALS', icon: HiStar },
        { name: 'MOVIES', icon: HiPlayCircle },
        { name: 'SERIES', icon: HiTv }
    ];

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false);
            
            // Log the authentication state
            if (currentUser) {
                console.log('User is signed in:', currentUser.email);
            } else {
                console.log('No user signed in');
            }
        });

        return () => unsubscribe();
    }, []);

    const handleLogin = async () => {
        try {
            setLoading(true);
            const result = await signInWithPopup(auth, googleProvider);
            // The signed-in user info
            const user = result.user;
            setUser(user);
        } catch (error) {
            console.error("Error signing in with Google", error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        try {
            setLoading(true);
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error("Error signing out", error);
        } finally {
            setLoading(false);
        }
    };

   
    return (
        <div className='flex items-center justify-between p-5'>
            <div className='flex gap-8 items-center'>
                <img src={logo} className='w-[80px] md:w-[115px] object-cover' />
                <div className='hidden md:flex gap-8'>
                    {menu.map((item) => (
                        <HeaderItem name={item.name} Icon={item.icon} key={item.name} />
                    ))}
                </div>
                <div className='flex md:hidden gap-5'>
                    {menu.map((item, index) => index < 3 && (
                        <HeaderItem name={''} Icon={item.icon} key={item.name} />
                    ))}
                    <div className='md:hidden' onClick={() => setToggle(!toggle)}>
                        <HeaderItem name={''} Icon={HiDotsVertical} />
                        {toggle ? <div className='absolute mt-3 bg-[#121212] border-[1px] border-gray-700 p-3 px-5 py-4'>
                            {menu.map((item, index) => index > 2 && (
                                <HeaderItem name={item.name} Icon={item.icon} key={item.name} />
                            ))}
                        </div> : null}
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                {user ? (
                    <div className="flex items-center gap-4">
                        {user.photoURL && (
                            <img 
                                src={user.photoURL} 
                                alt="Profile" 
                                className="w-8 h-8 rounded-full"
                            />
                        )}
                        <span className="text-white">{user.displayName}</span>
                        <button
                            onClick={handleLogout}
                            className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded"
                            disabled={loading}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={handleLogin}
                        className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded"
                        disabled={loading}
                    >
                        Login with Google
                    </button>
                )}
            </div>
        </div>
    )
}

export default Header

