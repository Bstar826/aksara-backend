import "./App.css";
import { useState } from "react";
function App() {
  const [qrValue, setQrValue] = useState("jeftar");
  const handleOnChange = (event) => {
    const { value } = event.target;
    setQrValue(value);
  };
  const generate = async () => {
    let obj = { string: document.getElementById("stringInput").value };
    const response = await (
      await fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      })
    ).json();
    console.log(response);

    document.getElementById("qrCode").src = response.image;
    document.getElementById("qrdown").href = response.image;
    document.getElementById("visible").textContent = "Download";
    document.getElementById("visible").className =
      "p-2 text-white bg-blue-300 rounded-md";
  };

  return (
    <div className="flex flex-col items-center justify-center gap-12 px-10 py-8">
      <div className="flex items-center justify-center w-100">
        <img src="/H2S_Gradient_Logo.png" width="120" alt="H2S logo" />
      </div>
      <div className="flex flex-col gap-5 md:flex-row lg:w-4/5">
        <div className="flex flex-col items-center justify-center gap-6 px-6 py-4 bg-white rounded-lg md:w-1/2 g lightShadow">
          <h1 className="text-3xl text-blue-300 bg-white ">Generate QR Code</h1>
          <input
            id="stringInput"
            className="w-10/12 p-2 rounded-md bg-back"
            onChange={handleOnChange}
            placeholder="Enter URL Here"
          />
          <div className="flex flex-col justify-start w-4/5 gap-6">
            <div className="flex justify-start gap-2 bg-white w-100">
              <input type="color" className="bg-white " />
              <label className="text-gray-800 bg-white ">
                Customize the color
              </label>
            </div>
            <div className="flex gap-2 bg-white pointer">
              <input type="color" className="bg-white " />
              <label className="text-gray-800 bg-white">
                Customize the Background Color
              </label>
            </div>
          </div>
          <div className="flex items-center justify-center w-4/5 bg-white">
            <div className="w-1/3">
              <hr />
            </div>
            <div>&nbsp; OR &nbsp;</div>
            <div className="w-1/3">
              <hr />
            </div>
          </div>
          <div className="flex flex-col justify-start w-4/5 gap-4">
            <input type="file" />
          </div>
          <button
            onClick={generate}
            className="p-2 text-white bg-blue-300 rounded-md hover:bg-sky-500"
          >
            Generate
          </button>
        </div>
        <div className="flex flex-col items-center justify-center bg-indigo-200 rounded-lg md:w-1/2">
          <Image src="" alt="QR code to be generated" id="qrCode" width="250" />
          <a href="" id="qrdown" download="qrcode" className="mt-3">
            <button className="" id="visible"></button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
