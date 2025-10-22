"use client"

import { useState } from "react"
import { Menu, X, ShoppingCart, ChevronLeft, ChevronRight, Instagram } from "lucide-react"
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
import { products, type Product } from "@/lib/products"

export default function RotaractLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { openCart, addToCart: addToCartContext, getCartItemsCount } = useCart()
  const [selectedSizes, setSelectedSizes] = useState<{ [key: number]: string }>({})
  const { messages, showToast, removeToast } = useToast()

const addToCart = (product: Product, size?: string) => {
  const needsSize = product.isClothing || product.requiresSize
  if (needsSize && !size) {
    showToast({ type: "warning", title: "Tamanho obrigatório", message: "Por favor, selecione um tamanho para este produto." })
    return
  }
  addToCartContext({ id: product.id, name: product.name, price: product.price, image: product.image, size })
  showToast({ type: "success", title: "Produto adicionado", message: "Produto adicionado ao carrinho com sucesso!" })
  if (needsSize) setSelectedSizes((prev) => ({ ...prev, [product.id]: "" }))
}


  const cartItemsCount = getCartItemsCount()
  const sections = [
    { title: "Camisetas Premium", category: "Camisetas" },
    { title: "Acessórios Exclusivos", category: "Acessórios" },
    { title: "Kits/Combos", category: "Kits/Combos" },
  ]
  const scrollToSection = (category: string) => {
    document.getElementById(category.toLowerCase())?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }
  const bestSellers = products.filter((p) => p.isBestSeller)

  const FeaturedCard = ({ p }: { p: Product }) => (
    <Card className="mx-auto w-full max-w-6xl group hover:shadow-2xl transition-all duration-500 border border-gray-100 shadow-lg bg-white">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="relative w-full aspect-square bg-gray-50">
            <Image src={p.image || "/placeholder.svg"} alt={p.name} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-700 group-hover:scale-105" priority />
          </div>
          <div className="p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center bg-white relative">
            <div className="absolute -top-3 left-4 sm:left-8">
              <div className="bg-[#d41367] text-white px-3 py-1 rounded-full shadow-md inline-block border border-[#b8115a]">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3 h-3 fill-white" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  <span className="font-medium text-xs tracking-wide uppercase">Mais Vendido</span>
                </div>
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light mb-4 md:mb-6 text-black tracking-tight">{p.name}</h3>
            <p className="text-gray-600 text-sm sm:text-base md:text-[1.05rem] mb-6 md:mb-8 leading-relaxed">{p.description}</p>
            <div className="flex items-center gap-4 sm:gap-6 mb-6 md:mb-8">
              <span className="text-3xl md:text-4xl font-light text-black">R$ {p.price.toFixed(2).replace(".", ",")}</span>
              <Badge variant="outline" className="border-gray-300 text-gray-600 font-light whitespace-nowrap">Frete Grátis</Badge>
            </div>
            {(p.isClothing || p.requiresSize) && (
            <div className="mb-4 md:mb-6">
              <Select
                value={selectedSizes[p.id] || ""}
                onValueChange={(v) => setSelectedSizes((prev) => ({ ...prev, [p.id]: v }))}
              >
                <SelectTrigger className="w-full h-10 md:h-11">
                  <SelectValue placeholder="Selecione o tamanho" />
                </SelectTrigger>
                <SelectContent>
                  {["PP","P","M","G","GG","XG"].map(t => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link href={`/product/${p.id}`} className="w-full">
                <Button variant="outline" className="w-full border-black text-black hover:bg-black hover:text-white transition-all duration-300 font-light text-sm tracking-wide uppercase">Ver Detalhes</Button>
              </Link>
              <Button className="w-full bg-[#d41367] hover:bg-[#b8115a] text-white font-light text-sm tracking-wide uppercase transition-all duration-300" onClick={() => addToCart(p, selectedSizes[p.id])}>Adicionar ao Carrinho</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <ToastContainer messages={messages} onRemove={removeToast} />
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image src="/rotaract-logo.png" alt="Rotaract Distrito 4590" width={160} height={54} className="h-10 sm:h-12 w-auto" />
            </Link>
            <nav className="hidden md:flex items-center gap-6 lg:gap-12">
              {sections.map((section) => (
                <button key={`nav-${section.category}`} onClick={() => scrollToSection(section.category)} className="text-black hover:text-[#d41367] transition-colors font-light text-xs lg:text-sm tracking-wide uppercase">
                  {section.title}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-2 sm:gap-4">
              <Button variant="ghost" size="sm" className="relative hover:bg-gray-50" onClick={openCart} aria-label="Abrir carrinho">
                <ShoppingCart className="w-5 h-5 text-black" />
                {cartItemsCount > 0 && <Badge className="absolute -top-2 -right-2 bg-[#d41367] text-white text-[10px] min-w-[18px] h-[18px] flex items-center justify-center rounded-full">{cartItemsCount}</Badge>}
              </Button>
              <Button variant="ghost" size="sm" className="md:hidden hover:bg-gray-50" onClick={() => setIsMenuOpen((v) => !v)} aria-label="Abrir menu">
                {isMenuOpen ? <X className="w-5 h-5 text-black" /> : <Menu className="w-5 h-5 text-black" />}
              </Button>
            </div>
          </div>
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
              {sections.map((section) => (
                <button key={`navm-${section.category}`} onClick={() => scrollToSection(section.category)} className="block w-full text-left py-3 text-black hover:text-[#d41367] transition-colors font-light text-sm tracking-wide uppercase">
                  {section.title}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 px-4 sm:px-6">
        <div className="mx-auto w-full max-w-5xl text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-light text-black mb-4 sm:mb-6 tracking-tight">
            ROTARACT
            <span className="block text-[#d41367] font-extralight">DISTRITO 4590</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-12 leading-relaxed max-w-2xl mx-auto">
            Uma coleção exclusiva que celebra a excelência e o compromisso com o serviço.
          </p>
        </div>
      </section>

      {bestSellers.length > 0 && (
        <section className="px-4 sm:px-6 pb-6 sm:pb-10">
          <div className="mx-auto w-full max-w-7xl">
            {bestSellers.length === 1 ? (
              <FeaturedCard p={bestSellers[0]} />
            ) : (
              <Swiper modules={[Navigation, Pagination, Autoplay]} slidesPerView={1} spaceBetween={16} loop autoplay={{ delay: 4500, disableOnInteraction: false }} pagination={{ clickable: true }} navigation className="w-full">
                {bestSellers.map((p) => (
                  <SwiperSlide key={`best-${p.id}`}>
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
          <section key={`sec-${section.category}`} id={section.category.toLowerCase()} className="py-12 sm:py-16 md:py-20 px-4 sm:px-6">
            <div className="mx-auto w-full max-w-7xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-center mb-10 sm:mb-14 text-black tracking-tight">{section.title}</h2>
              {sectionProducts.length > 4 ? (
                <div className="relative mx-auto">
                  <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={16}
                    slidesPerView={1}
                    navigation={{ nextEl: `.swiper-button-next-${section.category}`, prevEl: `.swiper-button-prev-${section.category}` }}
                    pagination={{ clickable: true, el: `.swiper-pagination-${section.category}` }}
                    breakpoints={{ 480: { slidesPerView: 2, spaceBetween: 16 }, 768: { slidesPerView: 3, spaceBetween: 20 }, 1024: { slidesPerView: 4, spaceBetween: 24 } }}
                    className="pb-10"
                  >
                    {sectionProducts.map((product) => (
                      <SwiperSlide key={`slide-${section.category}-${product.id}`}>
                        <Card className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 rounded-lg overflow-hidden h-full">
                          <CardContent className="p-0 h-full flex flex-col">
                            <Link href={`/product/${product.id}`}>
                              <div className="relative w-full aspect-square bg-gray-50">
                                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                              </div>
                            </Link>
                            <div className="p-4 sm:p-5 bg-white flex-1 flex flex-col justify-between">
                              <div>
                                <Link href={`/product/${product.id}`}>
                                  <h3 className="font-normal text-sm sm:text-[0.95rem] mb-2 text-gray-800 hover:text-[#d41367] transition-colors leading-tight line-clamp-2 min-h-[2.5rem]">
                                    {product.name}
                                  </h3>
                                </Link>
                                <p className="text-lg sm:text-xl font-normal text-black mb-4">R$ {product.price.toFixed(2).replace(".", ",")}</p>
                              </div>
                                {(product.isClothing || product.requiresSize) && (
                                <div className="mb-3">
                                  <Select
                                    value={selectedSizes[product.id] || ""}
                                    onValueChange={(v) => setSelectedSizes((prev) => ({ ...prev, [product.id]: v }))}
                                  >
                                    <SelectTrigger className="w-full h-9 text-xs sm:h-10">
                                      <SelectValue placeholder="Tamanho" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {["PP","P","M","G","GG","XG"].map(t => (
                                        <SelectItem key={t} value={t}>{t}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              )}
                              <Button className="w-full bg-[#d41367] hover:bg-[#b8115a] text-white font-normal text-xs sm:text-[13px] tracking-wide uppercase transition-all duration-300 py-2 h-9" onClick={() => addToCart(product, selectedSizes[product.id])}>
                                Adicionar
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                  <button className={`swiper-button-prev-${section.category} hidden md:flex items-center justify-center absolute -left-2 lg:-left-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50`} aria-label="Anterior"><ChevronLeft className="w-5 h-5 text-gray-600" /></button>
                  <button className={`swiper-button-next-${section.category} hidden md:flex items-center justify-center absolute -right-2 lg:-right-4 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-50`} aria-label="Próximo"><ChevronRight className="w-5 h-5 text-gray-600" /></button>
                  <div className={`swiper-pagination-${section.category} flex justify-center mt-4`} />
                </div>
              ) : (
                <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                  {sectionProducts.map((product, idx) => (
                    <Card key={`grid-${section.category}-${product.id}-${idx}`} className="group hover:shadow-lg transition-all duration-300 bg-white border border-gray-200 rounded-lg overflow-hidden">
                      <CardContent className="p-0 h-full flex flex-col">
                        <Link href={`/product/${product.id}`}>
                          <div className="relative w-full aspect-square bg-gray-50">
                            <Image src={product.image || "/placeholder.svg"} alt={product.name} fill sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                          </div>
                        </Link>
                        <div className="p-4 sm:p-5 bg-white flex-1 flex flex-col justify-between">
                          <div>
                            <Link href={`/product/${product.id}`}>
                              <h3 className="font-normal text-sm sm:text-[0.95rem] mb-2 text-gray-800 hover:text-[#d41367] transition-colors leading-tight line-clamp-2 min-h-[2.5rem]">{product.name}</h3>
                            </Link>
                            <p className="text-lg sm:text-xl font-normal text-black mb-4">R$ {product.price.toFixed(2).replace(".", ",")}</p>
                          </div>
                          {(product.isClothing || product.requiresSize) && (
                            <div className="mb-3">
                              <Select
                                value={selectedSizes[product.id] || ""}
                                onValueChange={(v) => setSelectedSizes((prev) => ({ ...prev, [product.id]: v }))}
                              >
                                <SelectTrigger className="w-full h-9 text-xs sm:h-10">
                                  <SelectValue placeholder="Tamanho" />
                                </SelectTrigger>
                                <SelectContent>
                                  {["PP","P","M","G","GG","XG"].map(t => (
                                    <SelectItem key={t} value={t}>{t}</SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                          <Button className="w-full bg-[#d41367] hover:bg-[#b8115a] text-white font-normal text-xs sm:text-[13px] tracking-wide uppercase transition-all duration-300 py-2 h-9" onClick={() => addToCart(product, selectedSizes[product.id])}>Adicionar</Button>
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
      <footer className="bg-black text-white py-12 sm:py-16 px-4 sm:px-6">
        <div className="mx-auto w-full max-w-7xl text-center">
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <Image
              src="/rotaract-logo.png"
              alt="Rotaract Distrito 4590"
              width={200}
              height={67}
              className="h-12 sm:h-16 w-auto brightness-0 invert"
            />
          </div>
          <div className="mb-5 flex items-center justify-center gap-3">
            <Link
              href="https://www.instagram.com/rotaract4590/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 bg-white/10 hover:bg-white/20 transition"
            >
              <Instagram className="w-5 h-5" />
              <span className="text-sm">Instagram</span>
            </Link>
          </div>
          <p className="text-xs sm:text-sm opacity-70 font-light tracking-wide">
            © 2025 ROTARACT DISTRITO 4590. TODOS OS DIREITOS RESERVADOS.
          </p>
        </div>
      </footer>
    </div>
  )
}
