function Keyword({keyword}) {
    return (
        <span>
            <a href={keyword.url} target="_blank" rel="noreferrer">{keyword.title}</a>
        </span>
    )
}

export function Keywords({keywords = [], className}) {
    const keywordRender = (keyword, index) => {
        return (
            <Keyword key={index} keyword={keyword} />
        )
    }

    const keywordsRender = () => {
        if (keywords.length <= 0) {
            return <span>Aucun mot-clé</span>
        } else {
            return keywords.map(keywordRender);
        }
    }

    return (
        <section className={className}>
            {keywordsRender()}
        </section>
    )
}