import React, { createContext, useContext, useState, useEffect } from 'react';
import { SparePart } from '@/types/spare-parts';

export interface CartItem extends SparePart {
	quantity: number;
}

interface CartContextType {
	items: CartItem[];
	addToCart: (item: SparePart, quantity?: number) => void;
	removeFromCart: (itemId: string) => void;
	updateQuantity: (itemId: string, quantity: number) => void;
	clearCart: () => void;
	getCartTotal: () => number;
	getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [items, setItems] = useState<CartItem[]>([]);

	const isMounted = React.useRef(false);

	useEffect(() => {
		const savedCart = typeof window !== 'undefined' ? localStorage.getItem('cart') : null;
		if (savedCart) {
			try {
				setItems(JSON.parse(savedCart));
			} catch (e) {
				console.error("Failed to parse cart");
			}
		}
		isMounted.current = true;
	}, []);

	useEffect(() => {
		if (isMounted.current) {
			localStorage.setItem('cart', JSON.stringify(items));
		}
	}, [items]);

	const addToCart = (item: SparePart, quantity: number = 1) => {
		setItems((prevItems) => {
			const existingItem = prevItems.find((i) => i.id === item.id);
			if (existingItem) {
				return prevItems.map((i) =>
					i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
				);
			}
			return [...prevItems, { ...item, quantity }];
		});
	};

	const removeFromCart = (itemId: string) => {
		setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
	};

	const updateQuantity = (itemId: string, quantity: number) => {
		if (quantity <= 0) {
			removeFromCart(itemId);
			return;
		}
		setItems((prevItems) =>
			prevItems.map((item) =>
				item.id === itemId ? { ...item, quantity } : item
			)
		);
	};

	const clearCart = () => {
		setItems([]);
	};

	const getCartTotal = () => {
		return items.reduce((total, item) => total + item.final_consumer_price * item.quantity, 0);
	};

	const getCartCount = () => {
		return items.reduce((count, item) => count + item.quantity, 0);
	};

	return (
		<CartContext.Provider
			value={{
				items,
				addToCart,
				removeFromCart,
				updateQuantity,
				clearCart,
				getCartTotal,
				getCartCount,
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => {
	const context = useContext(CartContext);
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider');
	}
	return context;
};
