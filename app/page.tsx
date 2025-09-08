"use client"

import { useState } from "react"
import { Menu, X, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ToastContainer, useToast } from "@/components/ui/toast"
import { useCart } from "@/contexts/cart-context"
import Link from "next/link"
import Image from "next/image"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
  images: string[]
  isClothing?: boolean
}

const products: Product[] = [
  // Seção Camisetas Premium
  {
    id: 1,
    name: "Camiseta Rotaract Premium",
    price: 89.9,
    image: "/foto.png",
    category: "Camisetas",
    description:
      "Camiseta premium 100% algodão com logo bordado do Rotaract. Tecido de alta qualidade, corte moderno e acabamento impecável. Ideal para eventos oficiais e uso casual.",
    images: ["/premium-white-t-shirt-with-rotaract-logo.png", "/premium-white-t-shirt-with-rotaract-logo.png"],
    isClothing: true,
  },
  {
    id: 2,
    name: "Polo Distrito 4590",
    price: 129.9,
    image: "foto.png",
    category: "Camisetas",
    description:
      "Polo elegante com bordado exclusivo do Distrito 4590. Tecido piquet de primeira linha, gola reforçada e botões de qualidade superior.",
    images: ["foto.png", "foto.png"],
    isClothing: true,
  },
  {
    id: 3,
    name: "Regata Esportiva",
    price: 69.9,
    image: "/foto.png",
    category: "Camisetas",
    description:
      "Regata esportiva com tecnologia dry-fit. Perfeita para atividades físicas e eventos esportivos do Rotaract.",
    images: ["/foto.png", "/foto.png"],
    isClothing: true,
  },
  {
    id: 4,
    name: "Camiseta Vintage",
    price: 99.9,
    image: "/foto.png",
    category: "Camisetas",
    description:
      "Camiseta com design vintage exclusivo. Estampa retrô que celebra a história do Rotaract com estilo contemporâneo.",
    images: ["/foto.png", "/foto.png"],
    isClothing: true,
  },

  // Seção Acessórios
  {
    id: 5,
    name: "Boné Rotaract Elite",
    price: 79.9,
    image: "/foto.png",
    category: "Acessórios",
    description: "Boné premium com bordado 3D do emblema Rotaract. Aba curva, ajuste traseiro e proteção UV.",
    images: ["/foto.png", "/foto.png"],
  },
  {
    id: 6,
    name: "Mochila Executiva",
    price: 199.9,
    image: "/foto.png",
    category: "Acessórios",
    description:
      "Mochila executiva com compartimento para laptop, múltiplos bolsos organizadores e logo discreto do Rotaract.",
    images: ["/foto.png", "/foto.png"],
  },
  {
    id: 7,
    name: "Caneca Premium",
    price: 39.9,
    image: "/foto.png",
    category: "Acessórios",
    description:
      "Caneca de porcelana premium com design exclusivo do Rotaract. Capacidade de 350ml, resistente ao microondas.",
    images: ["/foto.png", "/foto.png"],
  },
  {
    id: 8,
    name: "Chaveiro Exclusivo",
    price: 19.9,
    image: "foto.png",
    category: "Acessórios",
    description: "Chaveiro em metal nobre com acabamento premium. Design exclusivo do Rotaract Distrito 4590.",
    images: ["foto.png", "/foto.png"],
  },

  // Seção Uniformes
  {
    id: 9,
    name: "Camisa Social Rotaract",
    price: 159.9,
    image: "/foto.png",
    category: "Uniformes",
    description: "Camisa social de alta qualidade com bordado discreto do Rotaract. Tecido anti-rugas, corte slim fit.",
    images: ["/formal-dress-shirt-with-rotaract-embroidery.png", "/formal-dress-shirt-with-rotaract-embroidery.png"],
    isClothing: true,
  },
  {
    id: 10,
    name: "Blazer Distrito 4590",
    price: 299.9,
    image: "/foto.png",
    category: "Uniformes",
    description:
      "Blazer elegante com forro personalizado e bordado exclusivo do Distrito 4590. Corte moderno e tecido premium.",
    images: ["/foto.png", "/foto.png"],
  },
  {
    id: 11,
    name: "Gravata Oficial",
    price: 89.9,
    image: "/foto.png",
    category: "Uniformes",
    description: "Gravata oficial com padrão exclusivo do Rotaract. Seda pura, largura clássica de 8cm.",
    images: ["/foto.png", "/foto.png"],
  },
  {
    id: 12,
    name: "Colete Representativo",
    price: 179.9,
    image: "/foto.png",
    category: "Uniformes",
    description: "Colete representativo para eventos oficiais. Tecido nobre com bordados em fio dourado.",
    images: ["/foto.png", "/foto.png"],
  },
]

const featuredProduct = products[1]

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
        message: "Por favor, selecione um tamanho para este produto.",
      })
      return
    }

    addToCartContext({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size,
    })

    showToast({
      type: "success",
      title: "Produto adicionado",
      message: "Produto adicionado ao carrinho com sucesso!",
    })

    if (product.isClothing) {
      setSelectedSizes((prev) => ({ ...prev, [product.id]: "" }))
    }
  }

  const cartItemsCount = getCartItemsCount()

  const sections = [
    { title: "Camisetas Premium", category: "Camisetas" },
    { title: "Acessórios Exclusivos", category: "Acessórios" },
    { title: "Uniformes Oficiais", category: "Uniformes" },
  ]

  const scrollToSection = (category: string) => {
    const element = document.getElementById(category.toLowerCase())
    element?.scrollIntoView({ behavior: "smooth" })
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer messages={messages} onRemove={removeToast} />

      {/* Header Fixo */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/rotaract-logo.png"
                alt="Rotaract Distrito 4590"
                width={180}
                height={60}
                className="h-12 w-auto"
              />
            </Link>

            {/* Navigation - Desktop */}
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

              {/* Menu Mobile */}
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

          {/* Menu Mobile Dropdown */}
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

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-light text-black mb-8 text-balance tracking-tight">
              ROTARACT
              <span className="block text-[#d41367] font-extralight">DISTRITO 4590</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-12 text-pretty font-light leading-relaxed max-w-2xl mx-auto">
              Uma coleção exclusiva que celebra a excelência e o compromisso com o serviço. Cada peça é cuidadosamente
              criada para representar os valores do Rotaract.
            </p>
          </div>
        </div>
      </section>

      {/* Seções de Produtos */}
      {sections.map((section) => {
        const sectionProducts = products.filter((p) => p.category === section.category)

        return (
          <section key={section.category} id={section.category.toLowerCase()} className="py-20 px-6">
            <div className="container mx-auto">
              {section.category === "Camisetas" && (
                <div className="mb-24">
                  <Card className="max-w-6xl mx-auto group hover:shadow-2xl transition-all duration-500 border-0 shadow-lg">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-2 gap-0">
                        <div className="aspect-square overflow-hidden bg-gray-50">
                          <img
                            src={featuredProduct.image || "/placeholder.svg"}
                            alt={featuredProduct.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                        <div className="p-12 flex flex-col justify-center bg-white">
                          <Badge className="w-fit mb-6 bg-[#d41367] text-white font-light text-xs tracking-wider uppercase shadow-sm">
                            Mais Vendido
                          </Badge>
                          <h3 className="text-3xl md:text-4xl font-light mb-6 text-black tracking-tight">
                            {featuredProduct.name}
                          </h3>
                          <p className="text-gray-600 mb-8 text-pretty font-light leading-relaxed">
                            {featuredProduct.description}
                          </p>
                          <div className="flex items-center gap-6 mb-8">
                            <span className="text-4xl font-light text-black">
                              R$ {featuredProduct.price.toFixed(2).replace(".", ",")}
                            </span>
                            <Badge variant="outline" className="border-gray-300 text-gray-600 font-light">
                              Frete Grátis
                            </Badge>
                          </div>
                          {featuredProduct.isClothing && (
                            <div className="mb-6">
                              <Select
                                value={selectedSizes[featuredProduct.id] || ""}
                                onValueChange={(value) =>
                                  setSelectedSizes((prev) => ({ ...prev, [featuredProduct.id]: value }))
                                }
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
                            <Link href={`/product/${featuredProduct.id}`} className="flex-1">
                              <Button
                                variant="outline"
                                className="w-full border-black text-black hover:bg-black hover:text-white transition-all duration-300 font-light text-sm tracking-wide uppercase bg-transparent"
                              >
                                Ver Detalhes
                              </Button>
                            </Link>
                            <Button
                              className="flex-1 bg-[#d41367] hover:bg-[#b8115a] text-white font-light text-sm tracking-wide uppercase transition-all duration-300"
                              onClick={() => addToCart(featuredProduct, selectedSizes[featuredProduct.id])}
                            >
                              Adicionar ao Carrinho
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <h2 className="text-4xl md:text-5xl font-light text-center mb-16 text-black tracking-tight">
                {section.title}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {sectionProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="group hover:shadow-xl transition-all duration-500 border-0 shadow-md overflow-hidden"
                  >
                    <CardContent className="p-0 h-full flex flex-col">
                      <Link href={`/product/${product.id}`}>
                        <div className="aspect-square overflow-hidden bg-gray-50 cursor-pointer">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                          />
                        </div>
                      </Link>
                      <div className="p-8 bg-white flex-1 flex flex-col justify-between">
                        <div>
                          <Link href={`/product/${product.id}`}>
                            <h3 className="font-light text-lg mb-4 text-black hover:text-[#d41367] transition-colors cursor-pointer tracking-wide leading-tight line-clamp-2 min-h-[3.5rem]">
                              {product.name}
                            </h3>
                          </Link>
                          <p className="text-2xl font-light text-black mb-6 tracking-wide">
                            R$ {product.price.toFixed(2).replace(".", ",")}
                          </p>
                        </div>
                        {product.isClothing && (
                          <div className="mb-4">
                            <Select
                              value={selectedSizes[product.id] || ""}
                              onValueChange={(value) => setSelectedSizes((prev) => ({ ...prev, [product.id]: value }))}
                            >
                              <SelectTrigger className="w-full">
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
                          className="w-full bg-[#d41367] hover:bg-[#b8115a] text-white font-light text-sm tracking-wide uppercase transition-all duration-300 py-3"
                          onClick={() => addToCart(product, selectedSizes[product.id])}
                        >
                          Adicionar ao Carrinho
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
