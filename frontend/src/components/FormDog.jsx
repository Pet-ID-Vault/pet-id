import { useState } from "react";

export default function FormDog() {
    const [dogImage, setDogImage] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setDogImage(URL.createObjectURL(file));
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-50">
            <h1 className="text-2xl font-semibold mb-6">Dog Information</h1>
            
            {dogImage && (
                <div className="mb-4">
                    <img
                        src={dogImage}
                        alt="Dog"
                        width={150}
                        height={150}
                        className="rounded-full"
                    />
                </div>
            )}

            <label className="w-full max-w-lg flex items-center p-4 border border-gray-300 bg-white shadow-sm rounded-xl mb-4">
                <input
                    className="flex-grow w-full p-2 text-gray-700 bg-transparent outline-none"
                    placeholder="dog name"
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
                    placeholder="date of birth"
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
                    placeholder="breed"
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
                    placeholder="gender"
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
                    placeholder="pedigree (yes/no)"
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
                    placeholder="vaccines"
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
                    placeholder="booklet"
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
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="p-2 bg-gray-100 rounded-lg cursor-pointer"
                />
            </label>
        </div>
    )
}
