import {useTranslations} from 'next-intl';
 
export default function Home() {
  const t = useTranslations('common');
 
  return (
    <main>
      <h1>{t('welcome')}</h1>
      <p>{t('language')}</p>
    </main>
  );
}