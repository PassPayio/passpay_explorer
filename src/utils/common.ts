import useNextTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';

export function useTranslation(namespace: string) {
    const { t, lang } = useNextTranslation(namespace);
    const T = useMemo(() => t, [t]);
    return { t: T, lang };
}