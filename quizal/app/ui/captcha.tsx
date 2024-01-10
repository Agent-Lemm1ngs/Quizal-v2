import { useEffect, useState } from "react";
import Image from "next/image";

export default function Captcha() {
  const [data, setData] = useState(null);
  function stop() {
    return false;
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://captcha-generator.p.rapidapi.com/?noise_number=4&fontname=ubuntu",
          {
            method: "GET",
            headers: {
              "X-RapidAPI-Host": "captcha-generator.p.rapidapi.com",
              "X-RapidAPI-Key":
                "a44bcbc06fmsh1cbd95833752a28p125311jsn8b24930afb23",
            },
          },
        );
        const jsonData = await response.json();
        setData({ image: jsonData.image_url, solution: jsonData.solution });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-full items-center lg:items-start">
      {data ? (
        <>
          <label htmlFor="captcha">Captcha</label>
          <div className="flex flex-col lg:flex-row gap-2">
            <Image src={data.image} width={100} height={50} alt="captcha" />
            <input
              type="text"
              name="captcha"
              id="captcha"
              className="border-2 p-2 duration-75 w-full outline-none focus:border-blue-400 focus:shadow rounded"
              placeholder="#####"
              required
            />
          </div>
          <input
            type="hidden"
            name="solution"
            id="solution"
            value={data.solution}
          />
        </>
      ) : (
        <input
          type="text"
          name="captcha"
          id="captcha"
          className="border-2 p-2 duration-75 w-full outline-none focus:border-blue-400 focus:shadow rounded"
          placeholder="Loading Captcha..." // Set the value to the captcha solution from the data state
          disabled // Prevent modification by the
          required // Keep it as a required field
        />
      )}
    </div>
  );
}
