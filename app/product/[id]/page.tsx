"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ToastContainer, useToast } from "@/components/ui/toast";
import { useCart } from "@/contexts/cart-context";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/products";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProductPage() {
	const params = useParams<{ id: string }>();
	const router = useRouter();
	const [quantity, setQuantity] = useState(1);
	const [selectedImage, setSelectedImage] = useState(0);
	const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
	const {
		openCart,
		addToCart: addToCartContext,
		getCartItemsCount,
	} = useCart();
	const { messages, showToast, removeToast } = useToast();

	const productId = Number(params?.id);
	const product = products.find((p) => p.id === productId);

	const showSizes = useMemo(() => {
		if (!product) return false;
		if (typeof product.requiresSize === "boolean") return product.requiresSize;
		const blob =
			`${product.name} ${product.category} ${product.description}`.toLowerCase();
		return /camis|camisa|regata|blusa|uniforme/.test(blob);
	}, [product]);

	useEffect(() => {
		if (showSizes) setSelectedSizes([""]);
		else setSelectedSizes([]);
		setQuantity(1);
		setSelectedImage(0);
	}, [productId, showSizes]);

	if (!product) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-white">
				<div className="text-center">
					<h1 className="text-2xl font-light mb-6 text-black">
						Produto não encontrado
					</h1>
					<Link href="/">
						<Button className="bg-[#d41367] hover:bg-[#b8115a] text-white font-light text-sm tracking-wide uppercase">
							Voltar à loja
						</Button>
					</Link>
				</div>
			</div>
		);
	}

	const addToCart = () => {
		if (showSizes && selectedSizes.length !== quantity) {
			showToast({
				type: "warning",
				title: "Tamanhos obrigatórios",
				message: "Por favor, selecione o tamanho para cada item.",
			});
			return;
		}
		if (showSizes) {
			selectedSizes.forEach((size) => {
				if (!size) return;
				addToCartContext({
					id: product.id,
					name: product.name,
					price: product.price,
					image: product.image,
					size,
				});
			});
		} else {
			addToCartContext(
				{
					id: product.id,
					name: product.name,
					price: product.price,
					image: product.image,
				},
				quantity,
			);
		}
		showToast({
			type: "success",
			title: "Produto adicionado",
			message: "Produto adicionado ao carrinho com sucesso!",
		});
		setQuantity(1);
		setSelectedSizes(showSizes ? [""] : []);
	};

	const increaseQuantity = () => {
		const q = quantity + 1;
		setQuantity(q);
		if (showSizes) setSelectedSizes((prev) => [...prev, ""]);
	};
	const decreaseQuantity = () => {
		if (quantity > 1) {
			const q = quantity - 1;
			setQuantity(q);
			if (showSizes) setSelectedSizes((prev) => prev.slice(0, -1));
		}
	};
	const updateSize = (index: number, size: string) => {
		setSelectedSizes((prev) => {
			const next = [...prev];
			next[index] = size;
			return next;
		});
	};

	const cartItemsCount = getCartItemsCount();

	return (
		<div className="min-h-screen bg-white">
			<ToastContainer messages={messages} onRemove={removeToast} />

			<header className="sticky top-0 z-40 bg-white border-b border-gray-100 py-4 sm:py-6 px-4 sm:px-6">
				<div className="mx-auto w-full max-w-7xl flex items-center justify-between">
					<Button
						variant="ghost"
						onClick={() => router.back()}
						className="hover:bg-[#d41367] text-black font-light text-sm tracking-wide uppercase"
					>
						<ArrowLeft className="w-4 h-4 mr-2" /> Voltar
					</Button>
					<Link href="/" className="flex items-center">
						<Image
							src="/rotaract-logo.png"
							alt="Rotaract Distrito 4590"
							width={150}
							height={50}
							className="h-8 sm:h-10 w-auto"
						/>
					</Link>
					<Button
						variant="ghost"
						size="sm"
						className="relative hover:bg-gray-50"
						onClick={openCart}
					>
						<ShoppingCart className="w-5 h-5 text-black" />
						{cartItemsCount > 0 && (
							<Badge className="absolute -top-2 -right-2 bg-[#d41367] text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
								{cartItemsCount}
							</Badge>
						)}
					</Button>
				</div>
			</header>

			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-8 sm:py-12">
				<div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
					<div className="space-y-4 sm:space-y-6">
						<div className="relative w-full aspect-square bg-gray-50">
							<Image
								src={product.images[selectedImage] || product.image}
								alt={product.name}
								fill
								sizes="(max-width: 1024px) 100vw, 50vw"
								className="object-cover"
							/>
						</div>

						{product.images.length > 4 ? (
							<Swiper
								modules={[Navigation]}
								slidesPerView={4}
								spaceBetween={8}
								loop={true}
								navigation
								breakpoints={{
									480: { slidesPerView: 5, spaceBetween: 8 },
									768: { slidesPerView: 6, spaceBetween: 10 },
								}}
								className="w-full"
							>
								{product.images.map((image, index) => (
									<SwiperSlide key={`thumb-slide-${index}`}>
										<button
											onClick={() => setSelectedImage(index)}
											className={`relative w-full aspect-square overflow-hidden ${selectedImage === index ? "ring-2 ring-[#d41367]" : "hover:ring-1 hover:ring-gray-300"}`}
										>
											<Image
												src={image || "/placeholder.svg"}
												alt={`${product.name} ${index + 1}`}
												fill
												sizes="10vw"
												className="object-cover bg-gray-50"
											/>
										</button>
									</SwiperSlide>
								))}
							</Swiper>
						) : (
							<div className="grid grid-cols-4 gap-2 sm:gap-3">
								{product.images.map((image, index) => (
									<button
										key={`thumb-${index}`}
										onClick={() => setSelectedImage(index)}
										className={`relative w-full aspect-square overflow-hidden ${selectedImage === index ? "ring-2 ring-[#d41367]" : "hover:ring-1 hover:ring-gray-300"}`}
									>
										<Image
											src={image || "/placeholder.svg"}
											alt={`${product.name} ${index + 1}`}
											fill
											sizes="25vw"
											className="object-cover bg-gray-50"
										/>
									</button>
								))}
							</div>
						)}
					</div>

					<div className="space-y-6 sm:space-y-8">
						<div>
							<Badge className="mb-3 sm:mb-4 bg-gray-100 text-gray-600 font-light text-xs tracking-wider uppercase">
								{product.category}
							</Badge>
							<h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-black mb-4 sm:mb-6 tracking-tight">
								{product.name}
							</h1>
							<div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
								<span className="text-3xl sm:text-4xl font-light text-black">
									R$ {product.price.toFixed(2).replace(".", ",")}
								</span>
								<Badge
									variant="outline"
									className="border-gray-300 text-gray-600 font-light"
								>
									Frete Grátis
								</Badge>
							</div>
						</div>

						<div className="space-y-2 sm:space-y-3">
							<label className="text-sm font-light tracking-wide uppercase text-gray-600">
								Quantidade
							</label>
							<div className="flex items-center gap-3 sm:gap-4">
								<Button
									variant="outline"
									size="sm"
									onClick={decreaseQuantity}
									className="border-gray-300 hover:bg-gray-50 w-9 h-9 sm:w-10 sm:h-10 p-0 bg-transparent"
								>
									<Minus className="w-4 h-4" />
								</Button>
								<span className="text-lg sm:text-xl font-light w-10 text-center text-black">
									{quantity}
								</span>
								<Button
									variant="outline"
									size="sm"
									onClick={increaseQuantity}
									className="border-gray-300 hover:bg-gray-50 w-9 h-9 sm:w-10 sm:h-10 p-0 bg-transparent"
								>
									<Plus className="w-4 h-4" />
								</Button>
							</div>
						</div>

						{showSizes && (
							<div className="space-y-3 sm:space-y-4">
								<label className="text-sm font-light tracking-wide uppercase text-gray-600">
									Tamanhos {quantity > 1 && `(${quantity} itens)`}
								</label>
								<div className="space-y-2 sm:space-y-3">
									{Array.from({ length: quantity }, (_, index) => (
										<div
											key={`size-${index}`}
											className="flex items-center gap-2 sm:gap-3"
										>
											<span className="text-xs sm:text-sm text-gray-500 w-14 sm:w-16">
												Item {index + 1}:
											</span>
											<Select
												value={selectedSizes[index] || ""}
												onValueChange={(value) => updateSize(index, value)}
											>
												<SelectTrigger className="flex-1">
													<SelectValue placeholder="Selecione o tamanho" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="PP">PP</SelectItem>
													<SelectItem value="P">P</SelectItem>
													<SelectItem value="M">M</SelectItem>
													<SelectItem value="G">G</SelectItem>
													<SelectItem value="GG">GG</SelectItem>
													<SelectItem value="XG">XG</SelectItem>
												</SelectContent>
											</Select>
										</div>
									))}
								</div>
							</div>
						)}

						<Button
							size="lg"
							className="w-full text-sm py-5 sm:py-6 bg-[#d41367] hover:bg-[#b8115a] text-white font-light tracking-wide uppercase transition-all duration-300"
							onClick={addToCart}
						>
							<ShoppingCart className="w-4 h-4 mr-2" />
							Adicionar ao Carrinho - R${" "}
							{(product.price * quantity).toFixed(2).replace(".", ",")}
						</Button>

						<div className="space-y-5 sm:space-y-6 pt-6 sm:pt-8 border-t border-gray-100">
							{product.detailHtml ? (
								<div
									className="prose prose-sm sm:prose-base max-w-none prose-headings:font-light prose-p:font-light prose-li:font-light"
									dangerouslySetInnerHTML={{ __html: product.detailHtml }}
								/>
							) : (
								<>
									<h3 className="text-xl sm:text-2xl font-light text-black tracking-tight">
										Descrição do Produto
									</h3>
									<p className="text-gray-600 leading-relaxed font-light text-base sm:text-lg">
										{product.description}
									</p>
								</>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
