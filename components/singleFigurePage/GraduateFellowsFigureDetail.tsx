import React from 'react';
import classes from '../../styles/article.module.scss';

export default function GraduateFellowsFigureDetail(props, data) {
    const introduction: string = data?.figure?.translation?.graduateFellowsFigure?.introduction
        ?? data?.figure?.translation?.ourTeamFigure?.introduction;
    return <div className={classes.content} dangerouslySetInnerHTML={{__html: introduction}}/>;
}
