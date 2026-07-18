import { useState } from "react";
import apiPath from "./../config/apiPath";
import apiService from "./../config/apiServices";

const Demo = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted name:", name);
    try {
      await apiService.postCall(apiPath.demo, { name });
    } catch (error) {
      console.error("Error submitting demo data:", error);
    }
  };

  return (
    <div>
      <h1>Demo Component</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Demo;
