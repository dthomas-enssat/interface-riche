import styles from "./App.module.css"
import { useEffect, useState } from "react";
import { VideoPlayer } from "./components/VideoPlayer";
import { Chapters } from "./components/Chapters";

function App() {
  const [startTime, setStartTime] = useState(0);
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await fetch("https://imr3-react.herokuapp.com/backend");
      const data = await response.json();
      setChapters(data.Chapters);
    }
    loadData();
  }, []);

  const onTimeUpdate = (time) => {
    console.log(time);
  }

  const onSelectChapter = (chapter) => {
    console.log(chapter.title)
    setStartTime(chapter.pos)
  }

  return (
    <div>
      <h1>Cin'ENSSAT</h1>
      <VideoPlayer 
        startTime={startTime}
        src="https://alohagames.github.io/RushTheMusic/background.mp4"
        className={styles.video}
        onTimeUpdate={onTimeUpdate}
      />
      <Chapters 
        chapters={chapters} 
        onSelectChapter={onSelectChapter}
      />
    </div>
  );
}

export default App;
