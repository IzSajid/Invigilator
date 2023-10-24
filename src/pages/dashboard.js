import React from 'react';

export default function Dashboard() {
 return (
    <>
        <div className="flex justify-end pt-4 pr-4">
            <button className="border border-blue-500  text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded mr-4">
                Open a cohort
            </button>
            <button className="border border-blue-500  text-blue-500 hover:bg-blue-500 hover:text-white font-bold py-2 px-4 rounded mr-4">
                Join a cohort
            </button>
        </div>
        <div className="flex flex-col gap-x-3 justify-center items-center h-screen space-x-8">
            <div className="">
                <h1 className="text-4xl font-bold">Joined cohorts</h1>
                <p>LoremIpsum</p>
                {/* Other content goes here */}
            </div>
            <div className="">
                <h1 className="text-4xl font-bold">Created cohorts</h1>
                {/* Other content goes here */}
            </div>
        </div>
    </>
 );   
}