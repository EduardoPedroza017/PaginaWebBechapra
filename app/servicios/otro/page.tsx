import React, { useEffect, useState } from "react";
import SubpageHero from "../../../components/SubpageHero";
import { useLanguage } from '../../../lib/LanguageContext';
import { translateText } from '../../../lib/translate';

export default function Page() {
	const { lang } = useLanguage();
	const [title, setTitle] = useState('Otro');
	const [subtitle, setSubtitle] = useState('Página temporal para nuevas líneas de servicio.');
	const [content, setContent] = useState('Contenido en construcción.');

	useEffect(() => {
		async function fetchTranslations() {
			if (lang === 'es') {
				setTitle('Otro');
				setSubtitle('Página temporal para nuevas líneas de servicio.');
				setContent('Contenido en construcción.');
			} else {
				setTitle(await translateText('Otro', lang));
				setSubtitle(await translateText('Página temporal para nuevas líneas de servicio.', lang));
				setContent(await translateText('Contenido en construcción.', lang));
			}
		}
		fetchTranslations();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lang]);

	return (
		<>
			<SubpageHero title={title} subtitle={subtitle} />
			<div className="glass-card">{content}</div>
		</>
	);
}