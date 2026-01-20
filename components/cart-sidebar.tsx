"use client";

import { useCart } from "@/contexts/cart-context";
import { Button } from "@/components/ui/button";
import { X, Minus, Plus } from "lucide-react";
import Image from "next/image";

export function CartSidebar() {
	const {
		cartItems,
		isCartOpen,
		closeCart,
		removeFromCart,
		updateQuantity,
		clearCart,
		getCartTotal,
	} = useCart();

	const handleFinalizePurchase = () => {
		if (cartItems.length === 0) return;
		const message = cartItems
			.map(
				(item) =>
					`${item.quantity}x ${item.name}${item.size ? ` (Tamanho: ${item.size})` : ""} - R$ ${item.price.toFixed(2)}`,
			)
			.join("\n");
		const total = getCartTotal();
		const whatsappMessage = `Olá! Gostaria de fazer o seguinte pedido:\n\n${message}\n\nTotal: R$ ${total.toFixed(2)}`;
		const whatsappUrl = `https://wa.me/5519991801697?text=${encodeURIComponent(whatsappMessage)}`;
		clearCart();
		window.open(whatsappUrl, "_blank");
	};

	if (!isCartOpen) return null;

	return (
		<div className="fixed inset-0 z-50 flex">
			<div
				className="flex-1 bg-black/30 backdrop-blur-[2px]"
				onClick={closeCart}
			/>
			<div
				className="w-full sm:w-[380px] md:w-[420px] lg:w-[480px] max-w-full bg-white shadow-2xl border-l border-gray-200 flex flex-col"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
					<h2 className="text-lg sm:text-xl font-semibold text-gray-900">
						Carrinho
					</h2>
					<Button
						variant="ghost"
						size="sm"
						onClick={closeCart}
						className="h-8 w-8 p-0"
					>
						<X className="h-4 w-4" />
					</Button>
				</div>

				<div className="flex-1 overflow-y-auto p-4 sm:p-6">
					{cartItems.length === 0 ? (
						<p className="text-gray-500 text-center py-8">
							Seu carrinho está vazio
						</p>
					) : (
						<div className="space-y-3 sm:space-y-4">
							{cartItems.map((item, index) => (
								<div
									key={`${item.id}-${item.size || "no-size"}-${index}`}
									className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-lg"
								>
									<div className="relative w-14 h-14 sm:w-16 sm:h-16 shrink-0">
										<Image
											src={item.image || "/placeholder.svg"}
											alt={item.name}
											fill
											sizes="64px"
											className="rounded-md object-cover"
										/>
									</div>
									<div className="flex-1 min-w-0">
										<h3 className="font-medium text-gray-900 text-sm sm:text-base truncate">
											{item.name}
										</h3>
										{item.size && (
											<p className="text-xs sm:text-sm text-gray-500">
												Tamanho: {item.size}
											</p>
										)}
										<p className="text-sm sm:text-base font-medium text-[#d41367]">
											R$ {item.price.toFixed(2)}
										</p>

										<div className="flex items-center gap-2 mt-2">
											<Button
												variant="outline"
												size="sm"
												onClick={() =>
													updateQuantity(item.id, item.quantity - 1, item.size)
												}
												className="h-8 w-8 p-0"
											>
												<Minus className="h-3 w-3" />
											</Button>
											<span className="text-sm font-medium w-8 text-center">
												{item.quantity}
											</span>
											<Button
												variant="outline"
												size="sm"
												onClick={() =>
													updateQuantity(item.id, item.quantity + 1, item.size)
												}
												className="h-8 w-8 p-0"
											>
												<Plus className="h-3 w-3" />
											</Button>
											<Button
												variant="ghost"
												size="sm"
												onClick={() => removeFromCart(item.id, item.size)}
												className="text-red-500 hover:text-red-700 ml-1"
												aria-label="Remover item"
											>
												<X className="h-3 w-3" />
											</Button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>

				{cartItems.length > 0 && (
					<div className="border-t border-gray-200 p-4 sm:p-6">
						<div className="flex justify-between items-center mb-4">
							<span className="text-base sm:text-lg font-semibold text-gray-900">
								Total:
							</span>
							<span className="text-base sm:text-lg font-bold text-[#d41367]">
								R$ {getCartTotal().toFixed(2)}
							</span>
						</div>
						<Button
							onClick={handleFinalizePurchase}
							className="w-full bg-[#d41367] hover:bg-[#b8115a] text-white"
						>
							Finalizar Pedido
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}
