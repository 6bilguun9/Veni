import { useState, useEffect } from "react";
import "./App.css";

import Seen from "./components/seen.jsx";

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [bannedItems, setBannedItems] = useState([]);
  const [breedFor, setBreedFor] = useState("");

  const headers = new Headers({
    "Content-Type": "application/json",
    "x-api-key":
      "live_IAIXnTBz13mzyEzbW03DJlF6vTRdqPpRD8FEzqNj9NE0c9B6cWsyCGAQ3rH4xx17",
  });

  var requestOptions = {
    method: "GET",
    headers: headers,
    redirect: "follow",
  };
  const addBan = (item) => {
    setBannedItems((prevBannedItems) => [...prevBannedItems, item]);
    console.log(bannedItems);
  };

  async function fetchDogImage() {
    try {
      const response = await fetch(
        "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1",
        requestOptions
      );
      const data = await response.json();

      setName(data[0].breeds[0].name);

      setImage(data[0].url);
      setHeight(data[0].breeds[0].height.metric);
      setAge(data[0].breeds[0].life_span);

      setBreedFor(data[0].breeds[0].bred_for);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="App">
      <Seen />
      <div className="discoverContainer">
        <h1 className="header">Super Dogs</h1>
        <div className="content">
          {name && <p>{name}</p>}
          <div className="banList">
            {height && (
              <button onClick={() => addBan(`Height: ${height}`)}>
                height: {height}
              </button>
            )}
            {age && (
              <button onClick={() => addBan(`Age: ${age}`)}>age: {age}</button>
            )}

            {breedFor && (
              <button onClick={() => addBan(`Bred For: ${breedFor}`)}>
                Bred For: {breedFor}
              </button>
            )}
          </div>
          {image && <img className="image" src={image}></img>}
          <button className="color" onClick={fetchDogImage}>
            Discover!
          </button>
        </div>
      </div>
      <div className="banContainer">
        <h1>Ban List</h1>
        <ul>
          {bannedItems.length > 0 ? (
            bannedItems.map((item, index) => (
              <li key={index}>{item}</li> // Display each banned item
            ))
          ) : (
            <li>No items banned yet</li> // Show this if no items have been banned
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
