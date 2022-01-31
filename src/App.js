import styles from "./App.module.css"
import { useEffect, useState } from "react";
import { VideoPlayer } from "./components/VideoPlayer";
import { Chapters } from "./components/Chapters";
import { Map } from "./components/Map";

function App() {
  const [startTime, setStartTime] = useState(0);
  const [chapters, setChapters] = useState([]);
  const [waypoints, setWaypoints] = useState([]);
  const [currentWaypoint, setCurrentWaypoint] = useState();

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("https://imr3-react.herokuapp.com/backend");
      const data = await response.json();
      setChapters(data.Chapters);
      setWaypoints(data.Waypoints);
    }
    loadData();
  }, []);

  const onTimeUpdate = (time) => {
    waypoints.forEach(waypoint => {
      if (waypoint.timestamp < time) {
        setCurrentWaypoint(waypoint);
      }
    })
  }

  const onSelectChapter = (chapter) => {
    console.log(chapter.title)
    setStartTime(chapter.pos)
  }

  return (
    <section className={styles.container}>
      <div className={styles.title}>
        <h1>Cin'ENSSAT</h1>
      </div>
      <VideoPlayer 
        startTime={startTime}
        src="https://ia600900.us.archive.org/32/items/Route_66_-_an_American_badDream/Route_66_-_an_American_badDream_512kb.mp4"
        className={styles.video}
        onTimeUpdate={onTimeUpdate}
      />
      <Chapters 
        chapters={chapters} 
        onSelectChapter={onSelectChapter}
        className={styles.chapters}
      />
      <Map
        className={styles.map}
        waypoint={currentWaypoint}
      />
    </section>
  );
}

export default App;
