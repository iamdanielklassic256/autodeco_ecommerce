import { Clock, CreditCard, Facebook, Instagram, Mail, MapPin, Phone, Send, Shield, Truck, Twitter, Youtube } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Link from "next/link";
import { createSubscriber } from "@/utils/api/subscriber";
import { toast } from "sonner";
import { currentYear } from "@/utils/currentYear";


const features = [
	{ icon: Truck, title: "Free Delivery", desc: "On orders over 200,000 UGX" },
	{ icon: Shield, title: "Secure Payment", desc: "100% secure transactions" },
	{ icon: Clock, title: "24/7 Support", desc: "Contact us anytime" },
	{ icon: CreditCard, title: "Easy Returns", desc: "30 days return policy" },
];

export const Footer = () => {
	const [isLoading, setIsLoading] = useState(false);
	return (
		<footer className="bg-primary text-primary-foreground">
			{/* Features Bar */}
			<div className="border-b border-primary-foreground/10">
				<div className="container py-8">
					<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
						{features.map((feature) => (
							<div key={feature.title} className="flex items-center gap-3">
								<div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center shrink-0">
									<feature.icon className="h-6 w-6 text-accent" />
								</div>
								<div>
									<h4 className="font-semibold text-sm">{feature.title}</h4>
									<p className="text-xs text-primary-foreground/70">{feature.desc}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Main Footer */}
			<div className="container py-12">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
					{/* About */}
					{/* About */}
					<div className="space-y-4">
						<div className="flex items-center gap-3">
							<div className="w-12 h-12 rounded-lg bg-white p-1 flex items-center justify-center shrink-0">
								<img
									src="https://res.cloudinary.com/dgfsgfzee/image/upload/v1766510388/autodeco/co8s3bmr1evyewor8eca.jpg"
									alt="AutoDeco Centre"
									className="w-full h-full object-contain rounded-md"
								/>
							</div>
							<div className="space-y-0.5">
								<h3 className="font-display font-bold text-lg leading-none">AutoDeco</h3>
								<p className="text-xs uppercase text-accent font-bold tracking-widest">Centre</p>
							</div>
						</div>
						<p className="text-sm text-primary-foreground/70 leading-relaxed">
							Your trusted source for quality motorcycle parts in Uganda. We offer genuine and
							aftermarket parts for all motorcycle makes and models.
						</p>

					</div>

					{/* Quick Links */}
					<div>
						<h4 className="font-display font-semibold text-lg mb-4">Quick Links</h4>
						<ul className="space-y-2">
							<li>
								<Link href="/about" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
									About Us
								</Link>
							</li>
							<li>
								<Link href="/shop" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
									Shop
								</Link>
							</li>
							<li>
								<Link href="/contact" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
									Contact Us
								</Link>
							</li>
							<li>
								<Link href="/track-order" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
									Track Order
								</Link>
							</li>
						</ul>
					</div>

					{/* Customer Service */}
					<div>
						<h4 className="font-display font-semibold text-lg mb-4">Customer Service</h4>
						<ul className="space-y-2">
							<li>
								<Link href="/login" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
									My Account
								</Link>
							</li>
							<li>
								<Link href="/track-order" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
									Track Order
								</Link>
							</li>
							<li>
								<Link href="/cart" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
									Shopping Cart
								</Link>
							</li>
							<li>
								<Link href="/contact" className="text-sm text-primary-foreground/70 hover:text-accent transition-colors">
									Help Center
								</Link>
							</li>
						</ul>
					</div>

					{/* Newsletter */}
					<div>
						<h4 className="font-display font-semibold text-lg mb-4">Newsletter</h4>
						<p className="text-sm text-primary-foreground/70 mb-4">
							Subscribe for exclusive deals and updates on new products.
						</p>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								const email = (e.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
								if (!email) return;

								setIsLoading(true);
								createSubscriber({ email })
									.then(() => {
										toast.success("Subscribed successfully!");
										(e.target as HTMLFormElement).reset();
									})
									.catch((error) => {
										toast.error(error.message || "Failed to subscribe");
									})
									.finally(() => {
										setIsLoading(false);
									});
							}}
							className="flex gap-2"
						>
							<Input
								name="email"
								type="email"
								placeholder="Your email"
								required
								disabled={isLoading}
								className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
							/>
							<Button type="submit" variant="accent" size="icon" disabled={isLoading}>
								{isLoading ? (
									<div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
								) : (
									<Send className="h-4 w-4" />
								)}
							</Button>
						</form>
						<div className="mt-6 space-y-3">
							<a href="tel:+256775246973" className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-accent transition-colors">
								<div className="w-8 h-8 rounded-full bg-primary-foreground/5 flex items-center justify-center shrink-0">
									<Phone className="h-4 w-4" />
								</div>
								<span>+256 775 246973<br />+256 757 044538</span>
							</a>
							<a href="mailto:lubzevans@gmail.com" className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-accent transition-colors">
								<div className="w-8 h-8 rounded-full bg-primary-foreground/5 flex items-center justify-center shrink-0">
									<Mail className="h-4 w-4" />
								</div>
								<span>lubzevans@gmail.com</span>
							</a>
							<div className="flex items-center gap-3 text-sm text-primary-foreground/70">
								<div className="w-8 h-8 rounded-full bg-primary-foreground/5 flex items-center justify-center shrink-0">
									<MapPin className="h-4 w-4" />
								</div>
								<span>Gulu, Uganda</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="border-t border-primary-foreground/10">
				<div className="container py-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-10">
					<p className="text-xs text-primary-foreground/50">
						© {currentYear} AutoDeco Centre. All rights reserved.
					</p>
					<div className="flex items-center gap-4">
						<img src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="Mastercard" className="h-6 opacity-70" />
						<img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-70" />
						<span className="text-xs text-primary-foreground/50">Mobile Money</span>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
