import React from "react";
import "./index.css"
const useGeolocation = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [position, setPosition] = React.useState({});
  const [error, setError] = React.useState(null);

  const { lat, lng } = position;

  function getPosition() {
    if (!navigator.geolocation) {
      return setError("Your browser does not support geolocation");
    }

    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, position, error, getPosition };
};

const App = () => {
  const { error, isLoading, position, getPosition } = useGeolocation();
  const [countClicks, setCountClicks] = React.useState(0);

  function handleClick() {
    setCountClicks((count) => count + 1);
    getPosition();
  }

  return (
    <div className="app-container">
    <div className="content-container">
      <button className="get-position-button" onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>

      {isLoading && <p>Loading position...</p>}
      {error && <p className="error-message">{error}</p>}
      {!isLoading && !error && position.lat && position.lng && (
        <p className="position-message">
          Your GPS position:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${position.lat}/${position.lng}`}
          >
            {position.lat}, {position.lng}
          </a>
        </p>
      )}

      <p className="click-count-message">You requested position {countClicks} times</p>
    </div>
  </div>
  );
};

export default App;
