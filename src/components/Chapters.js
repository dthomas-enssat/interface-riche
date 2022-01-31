export function Chapter({chapter, onClickChapter}) {

    return (
        <button onClick={onClickChapter}>
            {chapter.title}
        </button>
    )
}

export function Chapters({onSelectChapter, chapters = []}) {
    const onClickChapter = (chapter) => {
        onSelectChapter && onSelectChapter(chapter)
    }

    const chapterRender = (chapter, index) => {
        return (
            <Chapter key={index} chapter={chapter} onClickChapter={() => onClickChapter(chapter)}/>
        )
    }

    const chaptersRender = chapters.map(chapterRender);

    return <div>{chaptersRender}</div>
}