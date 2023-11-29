import {ChevronRightIcon} from '@heroicons/react/20/solid';
import React from 'react';

export default function PrincipalInvestigatorsFigureDetail(props, data, t) {
    const quotation: string = data?.figure?.translation?.principalInvestigatorsFigure?.quotation;
    const introduction: string = data?.figure?.translation?.principalInvestigatorsFigure?.introduction;
    const researchAreas: string[] = data?.figure?.translation?.principalInvestigatorsFigure?.researchAreas?.map((item) => item.researchArea);
    const linkDescription: string = data?.figure?.translation?.principalInvestigatorsFigure?.linkDescription;
    const link: string = data?.figure?.translation?.principalInvestigatorsFigure?.link;

    return (
        <>
            {quotation && <p className="mb-4 italic">“{quotation}”</p>}
            {introduction && <div className="mb-4" dangerouslySetInnerHTML={{__html: introduction}}></div>}
            <p className="mb-8">{t('Research Areas: ')} {researchAreas.join('; ')}</p>
            {link && <a href={link} target="_blank" className="block text-neutral-900 hover:text-tcci-orange-o70"
						            rel="noreferrer">
                {linkDescription} <ChevronRightIcon className="w-5 h-5 inline-block" aria-hidden={true}/>
						</a>}
        </>
    )
}
