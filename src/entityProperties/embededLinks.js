import React from "react"

export const Link = (props) => {
        const { contentState, entityKey } = props;
        const { url } = contentState.getEntity(entityKey).getData();
        console.log(`url found at component: ${url}`)
    return (
        <a
        href={url}
        target="_blank"
        aria-label={url}
        >{props.children}</a>
    );
};

export const linkStrategy = (contentBlock, callback, contentState) =>
    {
        contentBlock.findEntityRanges(
        (character) => {
        const entityKey = character.getEntity();
    return (
        entityKey !== null &&
        contentState.getEntity(entityKey).getType() === 'LINK'
        );
        },
        callback
    );
};