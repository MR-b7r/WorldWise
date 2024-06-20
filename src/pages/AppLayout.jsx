import Sidebar from "../components/sidebar";
import Map from "../components/map";
import styles from "./AppLayout.module.css";
import User from "../components/User";

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}
