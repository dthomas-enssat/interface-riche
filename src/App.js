import styles from "./App.module.css"
import { useEffect, useState } from "react";
import { VideoPlayer } from "./components/VideoPlayer";
import { Chapters } from "./components/Chapters";
import { Map } from "./components/Map";
import { Keywords } from "./components/Keywords";
import { Chatroom } from "./components/Chatroom";
import "./styles/antd.css";

import {
  Typography
} from 'antd';
const { Title } = Typography;

function App() {
  const [movie, setMovie] = useState();
  const [time, setTime] = useState(0)

  const [startTime, setStartTime] = useState(0);
  const [chapters, setChapters] = useState([]);

  const [waypoints, setWaypoints] = useState([]);
  const [currentWaypoint, setCurrentWaypoint] = useState();

  const [keywords, setKeywords] = useState([]);
  const [currentKeyword, setCurrentKeyword] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("https://imr3-react.herokuapp.com/backend");
      const data = await response.json();
      setMovie(data.Film);
      setChapters(data.Chapters);
      setWaypoints(data.Waypoints);
      setKeywords(data.Keywords);
    }
    loadData();
  }, []);

  const onTimeUpdate = (time) => {
    setTime(time);

    waypoints.forEach(waypoint => {
      if (waypoint.timestamp <= time) {
        setCurrentWaypoint(waypoint);
      }
    });

    keywords.forEach(keyword => {
      if (keyword.pos <= time) {
        setCurrentKeyword(keyword.data);
      }
    });
  }

  const onSelectChapter = (chapter) => {
    setStartTime(chapter.pos)
  }

  const onClickMessage = (message) => {
    if (message.moment) {
      setStartTime(message.moment)
    }
  }

  return (
    <section className={styles.container}>
      <Map
        className={styles.map}
        waypoint={currentWaypoint}
      />
      <VideoPlayer 
        startTime={startTime}
        src="https://ia600900.us.archive.org/32/items/Route_66_-_an_American_badDream/Route_66_-_an_American_badDream_512kb.mp4"
        className={styles.video}
        onTimeUpdate={onTimeUpdate}
      />
      <Chapters 
        className={styles.chapters}
        chapters={chapters} 
        onSelectChapter={onSelectChapter}
      />
      <div className={styles.metadata}>
        <Title className={styles.title}>{ movie && 
          <a href={movie.synopsis_url} target="_blank" rel="noreferrer">{movie.title}</a> }
        </Title>
        <Keywords
          className={styles.keywords}
          keywords={currentKeyword}
        />
      </div>
      <Chatroom 
        className={styles.chatroom}
        moment={time}
        onClickMessage={onClickMessage}
      />
    </section>
  );
}

export default App;
