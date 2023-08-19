import React, { useState } from "react";
import "./Landing.css";
import axios from "axios";
import ShrinkedLink from "./ShrinkedLink";

const Landing = () => {
  const [formData, setFormData] = useState({ originalUrl: "" });
  const [dataFull, setDataFull] = useState("");
  const [dataShort, setDataShort] = useState("");
  const [loading, setLoading] = useState(false);


  const handleInputchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    try {
      if (formData.originalUrl === "") {
      }
      const response = await axios.post("http://localhost:5000/api/url", {
        originalUrl: formData.originalUrl,
      });

      setDataFull(response.data.fullUrl);
      setDataShort(response.data.shortUrl);
      formData.originalUrl = "";
      window.location.reload();
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      console.log(error.response.data.message);
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[85vh]">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <label className="text-primary font-semibold">Enter Link :</label>
          <div className="div mt-1">
            <input
              type="text"
              placeholder="Enter url Here"
              name="originalUrl"
              value={formData.originalUrl}
              onChange={handleInputchange}
            />{" "}
            <button type="submit" className="bg-primary font-semibold">
              Shrink
            </button>
          </div>
        </form>
      </div>
      <ShrinkedLink dataShort={dataShort} dataFull={dataFull} loading={loading} />
    </div>
  );
};

export default Landing;
