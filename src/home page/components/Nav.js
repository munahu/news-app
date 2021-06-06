import { NavLink } from "react-router-dom";
import styles from "../styles/Nav.module.css";

function Nav() {
    return (
      <nav>
        <ul className={styles.list}>
          <NavLink to="/business" activeClassName={styles.isActive}>
            <li className={styles.category}>Business</li>
          </NavLink>
          <NavLink to="/entertainment" activeClassName={styles.isActive}>
            <li className={styles.category}>Entertainment</li>
          </NavLink>
          <NavLink to="/technology" activeClassName={styles.isActive}>
            <li className={styles.category}>Technology</li>
          </NavLink>
          <NavLink to="/health" activeClassName={styles.isActive}>
            <li className={styles.category}>Health</li>
          </NavLink>
          <NavLink to="/science" activeClassName={styles.isActive}>
            <li className={styles.category}>Science</li>
          </NavLink>
          <NavLink to="/sports" activeClassName={styles.isActive}>
            <li className={styles.category}>Sports</li>
          </NavLink>
        </ul>
      </nav>
    );
}

export default Nav