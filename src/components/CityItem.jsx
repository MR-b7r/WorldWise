import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";
import { flagemojiToPNG, formatDate } from "./FlagEmoji";

export default function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { emoji, cityName, date, id, position } = city;

  function handleClick(e) {
    e.preventDefault();
    deleteCity(city.id);
  }
  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>
          {emoji ? flagemojiToPNG(emoji) : ""}
        </span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          x
        </button>
      </Link>
    </li>
  );
}
