import { useState } from "react";

export function useGeolocation(defaultPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);
  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          resolve(pos);
          setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setIsLoading(false);
        },
        (error) => {
          setError(error.message);
          reject(error);
          setIsLoading(false);
        }
      );
    });

    setIsLoading(true);
  }

  return { isLoading, position, error, getPosition };
}
