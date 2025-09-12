"use client"

import { useState } from "react"
import { Menu, X, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToastContainer, useToast } from "@/components/ui/toast"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
  images: string[]
  isClothing?: boolean
  isBestSeller?: boolean
}

const products: Product[] = [
  {
    id: 1,
    name: "Camiseta Rotaract Premium",
    price: 999.9,
    image: "/foto.png",
    category: "Camisetas",
    description:
      "Camiseta premium 100% algodão com logo bordado do Rotaract. Tecido de alta qualidade, corte moderno e acabamento impecável. Ideal para eventos oficiais e uso casual.",
    images: ["/premium-white-t-shirt-with-rotaract-logo.png", "/premium-white-t-shirt-with-rotaract-logo.png"],
    isClothing: true,
    isBestSeller: true
  },
  {
    id: 2,
    name: "Polo Distrito 4590",
    price: 999.9,
    image: "foto.png",
    category: "Camisetas",
    description:
      "Polo elegante com bordado exclusivo do Distrito 4590. Tecido piquet de primeira linha, gola reforçada e botões de qualidade superior.",
    images: ["foto.png", "foto.png"],
    isClothing: true
  },
  {
    id: 5,
    name: "Caneca do Todo Poderoso, 800ml, cor rosa",
    price: 999.9,
    image: "/produtos/caneca.jpg",
    category: "Acessórios",
    description: "Boné premium com bordado 3D do emblema Rotaract. Aba curva, ajuste traseiro e proteção UV.",
    images: ["/foto.png", "/foto.png"],
    isClothing: false
  },
  {
    id: 6,
    name: "Tirante do Todo Podero, cor rosa",
    price: 999.9,
    image: "/produtos/tirante.jpg",
    category: "Acessórios",
    description:
      "Mochila executiva com compartimento para laptop, múltiplos bolsos organizadores e logo discreto do Rotaract.",
    images: ["/foto.png", "/foto.png"],
    isClothing: false,
  },
    {
    id: 6,
    name: "Pin Torzinho",
    price: 999.9,
    image: "/produtos/pin.jpg",
    category: "Acessórios",
    description:
      "Mochila executiva com compartimento para laptop, múltiplos bolsos organizadores e logo discreto do Rotaract.",
    images: ["/foto.png", "/foto.png"],
    isClothing: true,
  }
]

export default function RotaractLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { openCart, addToCart: addToCartContext, getCartItemsCount } = useCart()
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({})
  const { messages, showToast, removeToast } = useToast()

  const addToCart = (product: Product, size?: string) => {
    if (product.isClothing && !size) {
      showToast({
        type: "warning",
        title: "Tamanho obrigatório",
        message: "Por favor, selecione um tamanho para este produto."
      })
      return
    }

    addToCartContext({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size
    })

    showToast({
      type: "success",
      title: "Produto adicionado",
      message: "Produto adicionado ao carrinho com sucesso!"
    })

    if (product.isClothing) {
      setSelectedSizes((prev) => ({ ...prev, [product.id]: "" }))
    }
  }

  const cartItemsCount = getCartItemsCount()

  const sections = [
    { title: "Camisetas Premium", category: "Camisetas" },
    { title: "Acessórios Exclusivos", category: "Acessórios" }
  ]

  const scrollToSection = (category: string) => {
    const element = document.getElementById(category.toLowerCase())
    element?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  const bestSellers = products.filter((p) => p.isBestSeller)

  const FeaturedCard = ({ p }: { p: Product }) => (
    <Card className="max-w-6xl mx-auto group hover:shadow-2xl transition-all duration-500 border border-gray-100 shadow-lg bg-white">
      <CardContent className="p-0">
        <div className="grid md:grid-cols-2 gap-0">
          <div className="aspect-square overflow-hidden bg-gray-50 ml-5">
            <img
              src={p.image || "/placeholder.svg"}
              alt={p.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </div>
          <div className="p-12 flex flex-col justify-center bg-white relative">
            <div className="absolute -top-2 left-8">
              <div className="bg-[#d41367] text-white px-3 py-1 rounded-full shadow-md inline-block border border-[#b8115a]">
                <div className="flex items-center justify-center gap-1.5">
                  <svg className="w-3 h-3 fill-white" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="font-medium text-xs tracking-wide uppercase text-white">Mais Vendido</span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-3xl md:text-4xl font-light mb-6 text-black tracking-tight">{p.name}</h3>
              <p className="text-gray-600 mb-8 text-pretty font-light leading-relaxed">{p.description}</p>
              <div className="flex items-center gap-6 mb-8">
                <span className="text-4xl font-light text-black">R$ {p.price.toFixed(2).replace(".", ",")}</span>
                <Badge variant="outline" className="border-gray-300 text-gray-600 font-light">
                  Frete Grátis
                </Badge>
              </div>

              {p.isClothing && (
                <div className="mb-6">
                  <Select
                    value={selectedSizes[p.id] || ""}
                    onValueChange={(value) => setSelectedSizes((prev) => ({ ...prev, [p.id]: value }))}
                  >
                    <SelectTrigger className="w-full">
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
              )}

              <div className="flex gap-4">
                <Link href={`/product/${p.id}`} className="flex-1">
                  <Button
                    variant="outline"
                    className="w-full border-black text-black hover:bg-black hover:text-white transition-all duration-300 font-light text-sm tracking-wide uppercase bg-transparent"
                  >
                    Ver Detalhes
                  </Button>
                </Link>
                <Button
                  className="flex-1 bg-[#d41367] hover:bg-[#b8115a] text-white font-light text-sm tracking-wide uppercase transition-all duration-300"
                  onClick={() => addToCart(p, selectedSizes[p.id])}
                >
                  Adicionar ao Carrinho
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer messages={messages} onRemove={removeToast} />

      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image src="/rotaract-logo.png" alt="Rotaract Distrito 4590" width={180} height={60} className="h-12 w-auto" />
            </Link>

            <nav className="hidden md:flex items-center space-x-12">
              {sections.map((section) => (
                <button
                  key={section.category}
                  onClick={() => scrollToSection(section.category)}
                  className="text-black hover:text-[#d41367] transition-colors font-light text-sm tracking-wide uppercase"
                >
                  {section.title}
                </button>
              ))}
            </nav>

            <div className="flex items-center space-x-6">
              <Button variant="ghost" size="sm" className="relative hover:bg-gray-50" onClick={openCart}>
                <ShoppingCart className="w-5 h-5 text-black" />
                {cartItemsCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-[#d41367] text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                    {cartItemsCount}
                  </Badge>
                )}
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="md:hidden hover:bg-gray-50"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
              </Button>
            </div>
          </div>

          {isMenuOpen && (
            <nav className="md:hidden mt-6 pb-6 border-t border-gray-100 pt-6">
              {sections.map((section) => (
                <button
                  key={section.category}
                  onClick={() => scrollToSection(section.category)}
                  className="block w-full text-left py-3 text-black hover:text-[#d41367] transition-colors font-light text-sm tracking-wide uppercase"
                >
                  {section.title}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-light text-black mb-8 text-balance tracking-tight">
              ROTARACT
              <span className="block text-[#d41367] font-extralight">DISTRITO 4590</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-12 text-pretty font-light leading-relaxed max-w-2xl mx-auto">
              Uma coleção exclusiva que celebra a excelência e o compromisso com o serviço. Cada peça é cuidadosamente criada para representar os valores do Rotaract.
            </p>
          </div>
        </div>
      </section>

      {bestSellers.length > 0 && (
        <section className="px-6 pb-8">
          <div className="container mx-auto">
            {bestSellers.length === 1 ? (
              <FeaturedCard p={bestSellers[0]} />
            ) : (
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={1}
                spaceBetween={24}
                loop
                autoplay={{ delay: 4500, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation
                className="max-w-6xl mx-auto"
              >
                {bestSellers.map((p) => (
                  <SwiperSlide key={p.id}>
                    <FeaturedCard p={p} />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </section>
      )}

      {sections.map((section) => {
        const sectionProducts = products.filter((p) => p.category === section.category)

        return (
          <section key={section.category} id={section.category.toLowerCase()} className="py-20 px-6">
            <div className="container mx-auto">
              <h2 className="text-4xl md:text-5xl font-light text-center mb-16 text-black tracking-tight">
                {section.title}
              </h2>

              {sectionProducts.length > 4 ? (
                <div className="relative max-w-7xl mx-auto">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={32}
                    slidesPerView={1}
                    navigation={{
                      nextEl: `.swiper-button-next-${section.category}`,
                      prevEl: `.swiper-button-prev-${section.category}`
                    }}
                    pagination={{
                      clickable: true,
                      el: `.swiper-pagination-${section.category}`
                    }}
                    breakpoints={{
                      640: { slidesPerView: 2 },
                      1024: { slidesPerView: 4 }
                    }}
                    className="pb-12"
                  >
                    {sectionProducts.map((product) => (
                      <SwiperSlide key={product.id}>
                        <Card className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 rounded-lg overflow-hidden h-full">
                          <CardContent className="p-0 h-full flex flex-col">
                            <Link href={`/product/${product.id}`}>
                              <div className="aspect-square overflow-hidden bg-gray-50 cursor-pointer">
                                <img
                                  src={product.image || "/placeholder.svg"}
                                  alt={product.name}
                                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                />
                              </div>
                            </Link>
                            <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                              <div>
                                <Link href={`/product/${product.id}`}>
                                  <h3 className="font-normal text-sm mb-2 text-gray-800 hover:text-[#d41367] transition-colors cursor-pointer leading-tight line-clamp-2 min-h-[2.5rem]">
                                    {product.name}
                                  </h3>
                                </Link>
                                <p className="text-xl font-normal text-black mb-4">
                                  R$ {product.price.toFixed(2).replace(".", ",")}
                                </p>
                              </div>
                              {product.isClothing && (
                                <div className="mb-3">
                                  <Select
                                    value={selectedSizes[product.id] || ""}
                                    onValueChange={(value) =>
                                      setSelectedSizes((prev) => ({ ...prev, [product.id]: value }))
                                    }
                                  >
                                    <SelectTrigger className="w-full h-8 text-xs">
                                      <SelectValue placeholder="Tamanho" />
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
                              )}
                              <Button
                                className="w-full bg-[#d41367] hover:bg-[#b8115a] text-white font-normal text-xs tracking-wide uppercase transition-all duration-300 py-2 h-8"
                                onClick={() => addToCart(product, selectedSizes[product.id])}
                              >
                                Adicionar
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </SwiperSlide>
                    ))}
                  </Swiper>

                  <button
                    className={`swiper-button-prev-${section.category} absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors`}
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <button
                    className={`swiper-button-next-${section.category} absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50 transition-colors`}
                  >
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>

                  <div className={`swiper-pagination-${section.category} flex justify-center mt-6`}></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                  {sectionProducts.map((product) => (
                    <Card
                      key={product.id}
                      className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 rounded-lg overflow-hidden"
                    >
                      <CardContent className="p-0 h-full flex flex-col">
                        <Link href={`/product/${product.id}`}>
                          <div className="aspect-square overflow-hidden bg-gray-50 cursor-pointer">
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </Link>
                        <div className="p-4 bg-white flex-1 flex flex-col justify-between">
                          <div>
                            <Link href={`/product/${product.id}`}>
                              <h3 className="font-normal text-sm mb-2 text-gray-800 hover:text-[#d41367] transition-colors cursor-pointer leading-tight line-clamp-2 min-h-[2.5rem]">
                                {product.name}
                              </h3>
                            </Link>
                            <p className="text-xl font-normal text-black mb-4">
                              R$ {product.price.toFixed(2).replace(".", ",")}
                            </p>
                          </div>
                          {product.isClothing && (
                            <div className="mb-3">
                              <Select
                                value={selectedSizes[product.id] || ""}
                                onValueChange={(value) =>
                                  setSelectedSizes((prev) => ({ ...prev, [product.id]: value }))
                                }
                              >
                                <SelectTrigger className="w-full h-8 text-xs">
                                  <SelectValue placeholder="Tamanho" />
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
                          )}
                          <Button
                            className="w-full bg-[#d41367] hover:bg-[#b8115a] text-white font-normal text-xs tracking-wide uppercase transition-all duration-300 py-2 h-8"
                            onClick={() => addToCart(product, selectedSizes[product.id])}
                          >
                            Adicionar
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </section>
        )
      })}

      <footer className="bg-black text-white py-16 px-6">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-8">
            <Image
              src="/rotaract-logo.png"
              alt="Rotaract Distrito 4590"
              width={200}
              height={67}
              className="h-16 w-auto brightness-0 invert"
            />
          </div>
          <p className="text-sm opacity-70 mb-4 font-light tracking-wide">
            © 2025 ROTARACT DISTRITO 4590. TODOS OS DIREITOS RESERVADOS.
          </p>
        </div>
      </footer>
    </div>
  )
}
