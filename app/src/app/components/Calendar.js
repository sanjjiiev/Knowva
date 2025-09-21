import styles from '../styles/home.module.css';

export default function Calendar() {
  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <p className={styles.calendarMonth}>July 2024</p>
        <div className={styles.calendarControls}>
          <button className={styles.calendarButton}>
            <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
            </svg>
          </button>
          <button className={styles.calendarButton}>
            <svg fill="currentColor" height="20" viewBox="0 0 256 256" width="20" xmlns="http://www.w3.org/2000/svg">
              <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
            </svg>
          </button>
        </div>
      </div>
      <div className={styles.calendarGrid}>
        <p className={styles.weekday}>S</p>
        <p className={styles.weekday}>M</p>
        <p className={styles.weekday}>T</p>
        <p className={styles.weekday}>W</p>
        <p className={styles.weekday}>T</p>
        <p className={styles.weekday}>F</p>
        <p className={styles.weekday}>S</p>
        <div className={`${styles.calendarDay} ${styles.calendarDayOffset}`}>1</div>
        <div className={styles.calendarDay}>2</div>
        <div className={styles.calendarDay}>3</div>
        <div className={styles.calendarDay}>4</div>
        <div className={`${styles.calendarDay} ${styles.calendarDayCurrent}`}>5</div>
        <div className={styles.calendarDay}>6</div>
        <div className={styles.calendarDay}>7</div>
        <div className={styles.calendarDay}>8</div>
        <div className={styles.calendarDay}>9</div>
        <div className={styles.calendarDay}>10</div>
        <div className={styles.calendarDay}>11</div>
        <div className={styles.calendarDay}>12</div>
        <div className={styles.calendarDay}>13</div>
        <div className={styles.calendarDay}>14</div>
        <div className={styles.calendarDay}>15</div>
        <div className={styles.calendarDay}>16</div>
        <div className={styles.calendarDay}>17</div>
        <div className={styles.calendarDay}>18</div>
        <div className={styles.calendarDay}>19</div>
        <div className={styles.calendarDay}>20</div>
        <div className={styles.calendarDay}>21</div>
        <div className={styles.calendarDay}>22</div>
        <div className={styles.calendarDay}>23</div>
        <div className={styles.calendarDay}>24</div>
        <div className={styles.calendarDay}>25</div>
        <div className={styles.calendarDay}>26</div>
        <div className={styles.calendarDay}>27</div>
        <div className={styles.calendarDay}>28</div>
        <div className={styles.calendarDay}>29</div>
        <div className={styles.calendarDay}>30</div>
      </div>
    </div>
  );
}