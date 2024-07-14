"use client"

import Image from "next/image";

export default function Form() {
    return (
        <div className="flex flex-col items-center p-6 bg-gray-50 min-h-screen">
            <h1 className="text-2xl font-semibold mb-6">Owner Information</h1>

            <label className="w-full max-w-lg flex items-center p-4 border border-gray-300 bg-white shadow-sm rounded-xl mb-4">
                <input
                    className="flex-grow w-full p-2 text-gray-700 bg-transparent outline-none"
                    placeholder="name"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    type="text"
                />
                <button
                    className="ml-4 px-4 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Save
                </button>
            </label>

            <label className="w-full max-w-lg flex items-center p-4 border border-gray-300 bg-white shadow-sm rounded-xl mb-4">
                <input
                    className="flex-grow w-full p-2 text-gray-700 bg-transparent outline-none"
                    placeholder="address"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    type="text"
                />
                <button
                    className="ml-4 px-4 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Save
                </button>
            </label>

            <label className="w-full max-w-lg flex items-center p-4 border border-gray-300 bg-white shadow-sm rounded-xl mb-4">
                <input
                    className="flex-grow w-full p-2 text-gray-700 bg-transparent outline-none"
                    placeholder="telephone number"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    type="text"
                />
                <button
                    className="ml-4 px-4 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Save
                </button>
            </label>

            <label className="w-full max-w-lg flex items-center p-4 border border-gray-300 bg-white shadow-sm rounded-xl mb-4">
                <input
                    className="flex-grow w-full p-2 text-gray-700 bg-transparent outline-none"
                    placeholder="email address"
                    autoComplete="off"
                    autoCorrect="off"
                    spellCheck="false"
                    type="text"
                />
                <button
                    className="ml-4 px-4 py-2 font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Save
                </button>
            </label>
        </div>
    )
}
