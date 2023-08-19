import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ShrinkedLink = ({ dataShort, dataFull, loading }: any) => {
  const [data, setData] = useState([]);
  const shortLinkUrl = "http://localhost:5000/api/url";
  useEffect(() => {
    axios.get("http://localhost:5000/api/url").then((response) => {
      setData(response.data);
    });
  }, []);

  const deleteLink = (shortLink: React.ChangeEvent<HTMLButtonElement>) => {
    axios.delete(`http://localhost:5000/api/url/${shortLink}`);
  };

  useEffect(() => {
    // setInterval(deleteLink,10000)
  },[])

  return (
    <div className="shrinkedlink flex items-start justify-center gap-10 mt-10 bg-gray-100 w-fit px-20 py-3 m-auto rounded-[.5rem]">
        <table className="min-w-full w-[80%] divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Original Link
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Short Link
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Visited
              </th>
              <th className="px-6 py-3  text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
            </tr>
          </thead>
          {data.length === 0 ? <p className="text-center w-full text-4xl mt-4 ml-20">NO LINK</p> : data.map((item: any, index: number) => (
            <>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr
                  className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  key={index + 1}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Link
                      to={item?.fullUrl}
                      target="_blank"
                      className="text-[.8rem] mt-1 text-primary"
                    >
                      {item?.fullUrl.slice(0, 20)} ...
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <Link
                      to={`${shortLinkUrl}/${item.shortUrl}`}
                      className="text-[.8rem] mt-1 text-primary"
                      target="_blank"
                    >
                      {item?.shortUrl}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    {item?.clicks}
                  </td>

                  <td className="px-6 py-4 flex  whitespace-nowrap">
                    <Link
                      to={`${shortLinkUrl}/${item.shortUrl}`}
                      target="_blank"
                      className="text-[.8rem] flex w-fit items-center gap-2 justify-center rounded-md bg-primary px-6 py-1 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Visit Link
                    </Link>
                  </td>
                  
                </tr>
              </tbody>
            </>
          ))}
        </table>
    </div>
  );
};

export default ShrinkedLink;
