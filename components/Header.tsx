import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
	return (
		<header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-zinc-200 dark:bg-black/80 dark:border-zinc-800">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center py-4">
					<div className="flex items-center">
						<Link href="/" className="flex items-center gap-2 text-xl font-bold text-black dark:text-white tracking-tight group">
							<div className="relative w-8 h-8 overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 transition-transform group-hover:scale-105">
								<Image
									src="https://res.cloudinary.com/dgfsgfzee/image/upload/v1766510388/autodeco/co8s3bmr1evyewor8eca.jpg"
									alt="AutoDecoCentre Logo"
									fill
									className="object-cover"
								/>
							</div>
							<span>AutoDecoCentre</span>
						</Link>
					</div>
					<nav className="hidden md:flex space-x-8">
						<Link href="/" className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
							Home
						</Link>
						<Link href="/services" className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
							Services
						</Link>
						<Link href="/about" className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
							About
						</Link>
						<Link href="/contact" className="text-sm font-medium text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors">
							Contact
						</Link>
					</nav>
					<div className="flex items-center space-x-4">
						<button className="px-4 py-2 text-sm font-medium text-white bg-black rounded-full hover:bg-zinc-800 transition-colors dark:bg-white dark:text-black dark:hover:bg-zinc-200">
							Get Started
						</button>
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
