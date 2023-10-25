import '@/styles/globals.css';
import './root-of-equation/GraphicalMethod/graphicalMethod.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
	return <Component {...pageProps} />;
}
