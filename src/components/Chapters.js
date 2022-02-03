import styles from "./Chapters.module.css"

function Chapter({chapter, onClickChapter}) {
    return (
        <button onClick={onClickChapter}>
            {chapter.title}
        </button>
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
            <h2>Chapitres</h2>
            <div className={styles.chapters}>
                {chaptersRender}
            </div>
        </aside>
    )
}