import React, { ReactNode } from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Toaster } from "sonner";

interface LayoutProps {
	children: ReactNode;
	title?: string;
	description?: string;
}

const Layout = ({
	children,
	title = "AutoDecoCentre",
	description = "AutoDecoCentre offers bespoke automotive decoration, interior styling, and premium car detailing services. Elevate your riding experience today."
}: LayoutProps) => {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta name="description" content={description} />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link rel="icon" href="https://res.cloudinary.com/dgfsgfzee/image/upload/v1766510388/autodeco/co8s3bmr1evyewor8eca.jpg" />
			</Head>
			<div className="min-h-screen flex flex-col pt-16">
				<Header />
				<main className="flex-grow">
					{children}
				</main>
				<Footer />
			</div>
			<Toaster position="top-right" richColors />
		</>
	);
};

export default Layout;
