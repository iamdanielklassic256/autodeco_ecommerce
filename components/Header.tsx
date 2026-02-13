import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Search,
	ShoppingCart,
	User,
	Menu,
	X,
	Phone,
	MapPin,
	ChevronDown,
	Heart,
	LogOut,
	Settings,
	Package,
	Loader2,
	ArrowRight
} from "lucide-react";
import { SparePart } from "@/types/spare-parts";
import { User as UserType } from "@/types/user";
import { getSpareParts } from "@/utils/api/spare-parts";
import { useCart } from "@/components/contexts/CartContext";
import { toast } from "sonner";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";

const categories = [
	"Engine Parts",
	"Brake Systems",
	"Suspension & Forks",
	"Exhaust Systems",
	"Tires & Wheels",
	"Lighting & Electrical",
	"Body & Fairings",
	"Helmets & Gear",
	"Accessories",
];

const TopBar = () => (
	<div className="bg-[#131921] text-white py-2 text-xs">
		<div className="container flex justify-between items-center">
			<div className="flex items-center gap-6">
				<a href="tel:+256775246973" className="flex items-center gap-2 hover:text-accent transition-colors">
					<Phone className="h-3 w-3" />
					<span>+256 775 246973</span>
				</a>
				<div className="hidden sm:flex items-center gap-2">
					<MapPin className="h-3 w-3" />
					<span>Gulu, Uganda</span>
				</div>
			</div>
			<div className="flex items-center gap-4">
				<Link href="/track-order" className="hover:text-accent transition-colors">Track Order</Link>
				<span className="text-white/20">|</span>
				<Link href="/about" className="hover:text-accent transition-colors">About Us</Link>
			</div>
		</div>
	</div>
);

const MobileMenu = ({ isOpen, onClose, user, onLogout }: any) => {
	if (!isOpen) return null;
	return (
		<div className="fixed inset-0 z-[100] md:hidden">
			<div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
			<div className="absolute top-0 right-0 h-full w-[280px] bg-white shadow-xl animate-in slide-in-from-right duration-300">
				<div className="flex flex-col h-full">
					<div className="p-4 border-b flex justify-between items-center bg-primary text-primary-foreground">
						<span className="font-bold">Menu</span>
						<Button variant="ghost" size="icon" onClick={onClose} className="text-white hover:bg-white/10">
							<X className="h-5 w-5" />
						</Button>
					</div>
					<div className="flex-1 overflow-y-auto p-4 space-y-6">
						<div className="space-y-2">
							<h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Pages</h3>
							<nav className="flex flex-col gap-2">
								<Link href="/" onClick={onClose} className="px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors font-medium">Home</Link>
								<Link href="/spare-parts" onClick={onClose} className="px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors font-medium">Spare Parts</Link>
								<Link href="/about" onClick={onClose} className="px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors font-medium">About</Link>
								<Link href="/contact" onClick={onClose} className="px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors font-medium">Contact</Link>
							</nav>
						</div>
						<div className="space-y-2">
							<h3 className="font-bold text-sm text-muted-foreground uppercase tracking-wider">Account</h3>
							<div className="flex flex-col gap-2">
								{user ? (
									<>
										<Link href="/profile" onClick={onClose} className="px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors font-medium">My Profile</Link>
										<button onClick={() => { onLogout(); onClose(); }} className="px-4 py-2 rounded-lg hover:bg-rose-50 text-rose-600 transition-colors font-bold text-left">Sign Out</button>
									</>
								) : (
									<>
										<Link href="/login" onClick={onClose} className="px-4 py-2 rounded-lg hover:bg-accent/10 transition-colors font-medium">Login</Link>
										<Link href="/register" onClick={onClose} className="px-4 py-2 rounded-lg bg-accent text-accent-foreground transition-colors font-bold text-center">Register</Link>
									</>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [searchQuery, setSearchQuery] = useState("");
	const [showSearchResults, setShowSearchResults] = useState(false);
	const [searchResults, setSearchResults] = useState<SparePart[]>([]);
	const [isSearching, setIsSearching] = useState(false);
	const [user, setUser] = useState<UserType | null>(null);
	const router = useRouter();
	const { getCartCount } = useCart();

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			try {
				setUser(JSON.parse(storedUser));
			} catch (e) {
				console.error("Failed to parse user");
			}
		}
	}, []);

	useEffect(() => {
		const delayDebounceFn = setTimeout(async () => {
			if (searchQuery.trim().length >= 2) {
				setIsSearching(true);
				try {
					const response = await getSpareParts({ search: searchQuery, limit: 5 });
					setSearchResults(response.data);
					setShowSearchResults(true);
				} catch (error) {
					console.error("Live search failed:", error);
				} finally {
					setIsSearching(false);
				}
			} else {
				setSearchResults([]);
				setShowSearchResults(false);
			}
		}, 300);

		return () => clearTimeout(delayDebounceFn);
	}, [searchQuery]);

	const handleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUser(null);
		toast.success("Signed Out successfully");
		router.push("/");
	};

	const handleSearch = () => {
		if (searchQuery.trim()) {
			router.push(`/spare-parts?search=${encodeURIComponent(searchQuery.trim())}`);
			setShowSearchResults(false);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	return (
		<header className="sticky top-0 z-50 w-full">
			<TopBar />
			<div className="bg-white border-b shadow-sm">
				<div className="container py-4">
					<div className="flex items-center justify-between gap-4">
						<Link href="/" className="flex items-center gap-2 shrink-0 group">
							<div className="w-10 h-10 rounded-lg overflow-hidden border border-zinc-200 group-hover:scale-105 transition-transform">
								<img
									src="https://res.cloudinary.com/dgfsgfzee/image/upload/v1766510388/autodeco/co8s3bmr1evyewor8eca.jpg"
									alt="AutoDeco Centre Logo"
									className="w-full h-full object-cover"
								/>
							</div>
							<div className="hidden sm:block">
								<h1 className="font-bold text-lg uppercase text-foreground leading-tight tracking-tight">
									AutoDeco
								</h1>
								<p className="text-[10px] uppercase text-accent font-black tracking-widest -mt-0.5">Centre</p>
							</div>
						</Link>

						<div className="flex-1 max-w-2xl hidden md:block relative group">
							<div className="relative">
								<Input
									type="text"
									placeholder="Search for motorcycle parts, brands..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									onKeyDown={handleKeyDown}
									onFocus={() => searchQuery.trim().length >= 2 && setShowSearchResults(true)}
									className="w-full h-11 pl-4 pr-12 rounded-lg border-zinc-200 focus:ring-2 focus:ring-accent/20"
								/>
								<div className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1">
									{isSearching && <Loader2 className="h-4 w-4 animate-spin text-accent mr-2" />}
									<Button
										size="icon"
										variant="accent"
										onClick={handleSearch}
										className="h-9 w-9 rounded-md transition-transform active:scale-95"
									>
										<Search className="h-4 w-4" />
									</Button>
								</div>
							</div>

							{showSearchResults && (
								<>
									<div className="fixed inset-0 z-40" onClick={() => setShowSearchResults(false)} />
									<div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-zinc-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
										{searchResults.length > 0 ? (
											<div className="py-2">
												{searchResults.map((part) => (
													<div
														key={part.id}
														onClick={() => {
															router.push(`/spare-parts/${part.id}`);
															setShowSearchResults(false);
															setSearchQuery("");
														}}
														className="px-4 py-3 hover:bg-zinc-50 flex items-center gap-4 cursor-pointer transition-colors group"
													>
														<div className="w-10 h-10 bg-zinc-100 rounded-lg overflow-hidden shrink-0">
															{part.image ? (
																<img src={part.image} alt={part.part_name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
															) : (
																<div className="w-full h-full flex items-center justify-center"><Package className="h-5 w-5 text-zinc-300" /></div>
															)}
														</div>
														<div className="flex-1 min-w-0">
															<p className="font-bold text-zinc-900 truncate text-sm">{part.part_name}</p>
															<p className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">{part.brand} • {part.category}</p>
														</div>
														<div className="text-right">
															<p className="font-bold text-zinc-900 text-sm italic">
																{new Intl.NumberFormat('en-UG', {
																	style: 'currency',
																	currency: 'UGX',
																	minimumFractionDigits: 0,
																}).format(part.final_consumer_price)}
															</p>
														</div>
													</div>
												))}
												<button
													onClick={handleSearch}
													className="w-full py-3 bg-zinc-50 hover:bg-zinc-100 text-accent text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors border-t border-zinc-100"
												>
													View All Results <ArrowRight className="h-3 w-3" />
												</button>
											</div>
										) : (
											<div className="p-8 text-center">
												<Package className="h-8 w-8 text-zinc-200 mx-auto mb-2" />
												<p className="text-zinc-500 text-sm font-medium">No parts found</p>
											</div>
										)}
									</div>
								</>
							)}
						</div>

						<div className="flex items-center gap-2">
							<Link href="/cart">
								<Button variant="ghost" size="icon" className="relative hover:bg-zinc-100 rounded-full">
									<ShoppingCart className="h-5 w-5" />
									{getCartCount() > 0 && (
										<span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-white text-[10px] flex items-center justify-center font-black ring-2 ring-white">
											{getCartCount()}
										</span>
									)}
								</Button>
							</Link>
							<div className="hidden sm:flex items-center gap-2">
								{user ? (
									<DropdownMenu>
										<DropdownMenuTrigger asChild>
											<Button variant="accent" size="sm" className="gap-2 rounded-full font-bold">
												<User className="h-4 w-4" />
												<span className="max-w-[100px] truncate">{user.firstName}</span>
												<ChevronDown className="h-3 w-3 opacity-50" />
											</Button>
										</DropdownMenuTrigger>
										<DropdownMenuContent align="end" className="w-56 rounded-xl shadow-xl mt-2">
											<DropdownMenuLabel className="font-bold">My Account</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuItem onClick={() => router.push("/profile")} className="gap-2 cursor-pointer font-semibold">
												<User className="h-4 w-4" /> Profile Settings
											</DropdownMenuItem>
											<DropdownMenuSeparator />
											<DropdownMenuItem onClick={handleLogout} className="gap-2 text-rose-500 hover:text-rose-600 cursor-pointer font-bold">
												<LogOut className="h-4 w-4" /> Sign Out
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								) : (
									<>
										<Link href="/login">
											<Button variant="outline" size="sm" className="rounded-full font-bold">Login</Button>
										</Link>
										<Link href="/register">
											<Button variant="accent" size="sm" className="rounded-full font-bold">Register</Button>
										</Link>
									</>
								)}
							</div>
							<Button
								variant="ghost"
								size="icon"
								className="md:hidden rounded-full hover:bg-zinc-100"
								onClick={() => setIsMenuOpen(!isMenuOpen)}
							>
								{isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
							</Button>
						</div>
					</div>

					<div className="mt-3 md:hidden">
						<div className="relative">
							<Input
								type="text"
								placeholder="Search motorcycle parts..."
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								onKeyDown={handleKeyDown}
								className="w-full h-10 pl-4 pr-12 rounded-lg border-zinc-200"
							/>
							<Button
								size="icon"
								variant="accent"
								onClick={handleSearch}
								className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md"
							>
								<Search className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>

				<div className="border-t bg-[#232f3e] text-white hidden md:block">
					<div className="container">
						<nav className="flex items-center gap-1 py-1.5">
							<Sheet>
								<SheetTrigger asChild>
									<Button variant="ghost" size="sm" className="flex items-center gap-2 font-bold px-3 h-9 lg:px-4 hover:bg-white/10 hover:text-white transition-colors text-white">
										<Menu className="h-5 w-5" /> All
									</Button>
								</SheetTrigger>
								<SheetContent side="left" className="w-[300px] p-0 border-r-0">
									<SheetHeader className="bg-[#232f3e] p-6 text-left">
										<SheetTitle className="text-white flex items-center gap-3">
											<div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center">
												<User className="h-6 w-6" />
											</div>
											<div className="flex flex-col">
												<span className="text-xs font-normal text-white/70">{user ? `Hello, ${user.firstName}` : "Hello, Guest"}</span>
												<span className="text-base font-bold text-white">AutoDeco Centre</span>
											</div>
										</SheetTitle>
									</SheetHeader>
									<div className="py-4 space-y-2">
										<div className="px-6 py-2 font-black text-xs uppercase tracking-widest text-zinc-400">Categories</div>
										<div className="flex flex-col">
											<Link href="/spare-parts" className="px-6 py-3 hover:bg-zinc-50 text-sm font-bold text-zinc-700 flex justify-between items-center group">
												Browse All Spare Parts <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
											</Link>
										</div>
										<div className="px-6 py-2 border-t font-black text-xs uppercase tracking-widest text-zinc-400 mt-4">Help & Info</div>
										<div className="flex flex-col">
											<Link href="/about" className="px-6 py-3 hover:bg-zinc-50 text-sm font-bold text-zinc-700">About Us</Link>
											<Link href="/contact" className="px-6 py-3 hover:bg-zinc-50 text-sm font-bold text-zinc-700">Contact Us</Link>
											<Link href="/track-order" className="px-6 py-3 hover:bg-zinc-50 text-sm font-bold text-zinc-700">Track Orders</Link>
										</div>
									</div>
								</SheetContent>
							</Sheet>

							<div className="flex items-center gap-8 ml-6 text-xs font-black uppercase tracking-widest text-white/90">
								<Link href="/spare-parts" className="hover:text-white transition-colors border-b-2 border-transparent hover:border-accent py-1">Spare Parts</Link>
								<Link href="/contact" className="hover:text-white transition-colors border-b-2 border-transparent hover:border-accent py-1">Customer Service</Link>
							</div>
						</nav>
					</div>
				</div>
			</div>

			<MobileMenu
				isOpen={isMenuOpen}
				onClose={() => setIsMenuOpen(false)}
				user={user}
				onLogout={handleLogout}
			/>
		</header>
	);
};

export default Header;
