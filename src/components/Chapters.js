import styles from "./Chapters.module.css"

import {
    Button,
    Typography
} from 'antd';
const { Title } = Typography;

function Chapter({chapter, onClickChapter}) {
    return (
        <Button size="small" onClick={onClickChapter} className={styles.button} block>
            {chapter.title}
        </Button>
    )
}

export function Chapters({onSelectChapter, chapters = [], className}) {
    const onClickChapter = (chapter) => {
        onSelectChapter && onSelectChapter(chapter)
    }

    const chapterRender = (chapter, index) => {
        return (
            <Chapter key={index} chapter={chapter} onClickChapter={() => onClickChapter(chapter)}/>
        )
    }

    const chaptersRender = chapters.map(chapterRender);

    return (
        <aside className={className}>
            <Title level={2}>Chapitres</Title>
            <div className={styles.chapters}>
                {chaptersRender}
            </div>
        </aside>
    )
}