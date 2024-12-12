import axios from "axios";
import React, { useEffect, useState } from "react";
// require('dotenv').config()
const backendURL="http://localhost:5000/";

export default function TablePreview() {
  //console.log("Inside Table Preview");
  const [Enter, setEnter] = useState(0);
  const [response, setResponse] = useState([]);

  useEffect(() => {
    const fetchMyData = async () => {
      try {
        let body = await axios.get(`${backendURL}table`);
        setResponse(body.data);
        if (body.data.length >= 1) {
          setEnter(1);
        }
        console.log(response);
      } catch (error) {
        console.error('There was an error logging in!', error);
      }
    };

    fetchMyData();
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto">
      {Enter === 1 && (
        <div className="overflow-x-auto shadow-md sm:rounded-lg">

          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-4 py-3 w-1/2">
                  LongURL
                </th>
                <th scope="col" className="px-4 py-3 w-1/2">
                  ShortURL
                </th>
              </tr>
            </thead>
            <tbody>
              {response.map((item, index) => (
                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <td className="px-4 py-3 w-1/2 break-all">
                    <div className="whitespace-normal max-w-full">
                      <a href={item.longURL} target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:underline">
                        {item.longURL}
                      </a>
                    </div>
                  </td>
                  <td className="px-4 py-3 w-1/2 break-all">
                    <div className="whitespace-normal max-w-full">
                      <a href={item.shortURL} target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:underline">
                        {item.shortURL}
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
