import {NextIntlClientProvider} from 'next-intl';
import {useLocale, useMessages} from 'next-intl';
 

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    const locale = useLocale();
    const messages = useMessages();
 
    return (
        <html lang={locale}>
        <body>
            <NextIntlClientProvider messages={messages} locale={locale}>
            {children}
            </NextIntlClientProvider>
        </body>
        </html>
    );
}