import React, { useState, useEffect } from "react";

const Number = ({ urls }) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (urls.length === 0) {
        setIsLoading(false);
        return;
      }

      try {
        const fetchPromises = urls.map((url) => fetch(url).then((response) => response.json()));
        const responses = await Promise.all(fetchPromises);
        const mergedData = responses.reduce((acc, response) => {
          if (response.numbers && Array.isArray(response.numbers)) {
            acc.push(...response.numbers);
          }
          return acc;
        }, []);
        const uniqueData = Array.from(new Set(mergedData)).sort((a, b) => a - b);
        setData(uniqueData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [urls]);

  if (isLoading) {
    return <p className="">Loading...</p>;
  }

  if (data.length === 0) {
    return <p className="text-white">No data found.</p>;
  }

  return (
    <div className="lining-nums text-white">
    <h3 className="py-4 text-lg">Numbers: </h3>
      {data.map((num, index) => (
        <span  className="px-1" key={index}>{num+" "}</span>
      ))}
    </div>
  );
};

export default Number;
