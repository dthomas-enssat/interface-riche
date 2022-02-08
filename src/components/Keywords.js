import { LinkOutlined } from '@ant-design/icons';
import {
    Tag
} from "antd"

function Keyword({keyword}) {
    return (
        <Tag color="blue" icon={<LinkOutlined />}>
            <a href={keyword.url} target="_blank" rel="noreferrer">{keyword.title}</a>
        </Tag>
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
            return <Tag color="red">No Keywords</Tag>
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