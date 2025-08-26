"use client"

import { useState } from "react"
import { ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
  images: string[]
}

const products: Product[] = [
  // Seção Camisetas Premium
  {
    id: 1,
    name: "Camiseta Rotaract Premium",
    price: 89.9,
    image: "/premium-white-t-shirt-with-rotaract-logo.png",
    category: "Camisetas",
    description:
      "Camiseta premium 100% algodão com logo bordado do Rotaract. Tecido de alta qualidade, corte moderno e acabamento impecável. Ideal para eventos oficiais e uso casual.",
    images: ["/premium-white-t-shirt-with-rotaract-logo.png", "/premium-white-t-shirt-with-rotaract-logo.png"],
  },
  {
    id: 2,
    name: "Polo Distrito 4590",
    price: 129.9,
    image: "/elegant-polo-shirt-with-district-logo.png",
    category: "Camisetas",
    description:
      "Polo elegante com bordado exclusivo do Distrito 4590. Tecido piquet de primeira linha, gola reforçada e botões de qualidade superior.",
    images: ["/elegant-polo-shirt-with-district-logo.png", "/elegant-polo-shirt-with-district-logo.png"],
  },
  {
    id: 3,
    name: "Regata Esportiva",
    price: 69.9,
    image: "/sporty-tank-top-with-rotaract-branding.png",
    category: "Camisetas",
    description:
      "Regata esportiva com tecnologia dry-fit. Perfeita para atividades físicas e eventos esportivos do Rotaract.",
    images: ["/sporty-tank-top-with-rotaract-branding.png", "/sporty-tank-top-with-rotaract-branding.png"],
  },
  {
    id: 4,
    name: "Camiseta Vintage",
    price: 99.9,
    image: "/vintage-style-rotaract-t-shirt.png",
    category: "Camisetas",
    description:
      "Camiseta com design vintage exclusivo. Estampa retrô que celebra a história do Rotaract com estilo contemporâneo.",
    images: ["/vintage-style-rotaract-t-shirt.png", "/vintage-style-rotaract-t-shirt.png"],
  },

  // Seção Acessórios
  {
    id: 5,
    name: "Boné Rotaract Elite",
    price: 79.9,
    image: "/premium-cap-with-rotaract-emblem.png",
    category: "Acessórios",
    description: "Boné premium com bordado 3D do emblema Rotaract. Aba curva, ajuste traseiro e proteção UV.",
    images: ["/premium-cap-with-rotaract-emblem.png", "/premium-cap-with-rotaract-emblem.png"],
  },
  {
    id: 6,
    name: "Mochila Executiva",
    price: 199.9,
    image: "/executive-backpack-with-rotaract-logo.png",
    category: "Acessórios",
    description:
      "Mochila executiva com compartimento para laptop, múltiplos bolsos organizadores e logo discreto do Rotaract.",
    images: ["/executive-backpack-with-rotaract-logo.png", "/executive-backpack-with-rotaract-logo.png"],
  },
  {
    id: 7,
    name: "Caneca Premium",
    price: 39.9,
    image: "/premium-ceramic-mug-with-rotaract-design.png",
    category: "Acessórios",
    description:
      "Caneca de porcelana premium com design exclusivo do Rotaract. Capacidade de 350ml, resistente ao microondas.",
    images: ["/premium-ceramic-mug-with-rotaract-design.png", "/premium-ceramic-mug-with-rotaract-design.png"],
  },
  {
    id: 8,
    name: "Chaveiro Exclusivo",
    price: 19.9,
    image: "/exclusive-rotaract-keychain.png",
    category: "Acessórios",
    description: "Chaveiro em metal nobre com acabamento premium. Design exclusivo do Rotaract Distrito 4590.",
    images: ["/exclusive-rotaract-keychain.png", "/exclusive-rotaract-keychain.png"],
  },

  // Seção Uniformes
  {
    id: 9,
    name: "Camisa Social Rotaract",
    price: 159.9,
    image: "/formal-dress-shirt-with-rotaract-embroidery.png",
    category: "Uniformes",
    description: "Camisa social de alta qualidade com bordado discreto do Rotaract. Tecido anti-rugas, corte slim fit.",
    images: ["/formal-dress-shirt-with-rotaract-embroidery.png", "/formal-dress-shirt-with-rotaract-embroidery.png"],
  },
  {
    id: 10,
    name: "Blazer Distrito 4590",
    price: 299.9,
    image: "/elegant-blazer-with-district-branding.png",
    category: "Uniformes",
    description:
      "Blazer elegante com forro personalizado e bordado exclusivo do Distrito 4590. Corte moderno e tecido premium.",
    images: ["/elegant-blazer-with-district-branding.png", "/elegant-blazer-with-district-branding.png"],
  },
  {
    id: 11,
    name: "Gravata Oficial",
    price: 89.9,
    image: "/official-rotaract-tie.png",
    category: "Uniformes",
    description: "Gravata oficial com padrão exclusivo do Rotaract. Seda pura, largura clássica de 8cm.",
    images: ["/official-rotaract-tie.png", "/official-rotaract-tie.png"],
  },
  {
    id: 12,
    name: "Colete Representativo",
    price: 179.9,
    image: "/representative-vest-with-rotaract-logo.png",
    category: "Uniformes",
    description: "Colete representativo para eventos oficiais. Tecido nobre com bordados em fio dourado.",
    images: ["/representative-vest-with-rotaract-logo.png", "/representative-vest-with-rotaract-logo.png"],
  },
]

const featuredProduct = products[1] // Polo Distrito 4590

export default function RotaractLandingPage() {
  const [cart, setCart] = useState<Product[]>([])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleBuyNow = (product: Product) => {
    if (!isLoggedIn) {
      // Redirecionar para login
      window.location.href = `/login?redirect=/product/${product.id}`
    } else {
      addToCart(product)
      // Redirecionar para carrinho
      window.location.href = "/cart"
    }
  }

  const addToCart = (product: Product) => {
    setCart([...cart, product])
  }

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
    <div className="min-h-screen bg-background">
      {/* Header Fixo */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">R</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="font-bold text-lg text-foreground">Rotaract</h1>
                <p className="text-xs text-muted-foreground">Distrito 4590</p>
              </div>
            </Link>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              {sections.map((section) => (
                <button
                  key={section.category}
                  onClick={() => scrollToSection(section.category)}
                  className="text-foreground hover:text-primary transition-colors font-medium"
                >
                  {section.title}
                </button>
              ))}
            </nav>

            {/* Cart e Menu Mobile */}
            <div className="flex items-center space-x-4">
              <Link href="/cart">
                <Button variant="outline" size="sm" className="relative bg-transparent">
                  <ShoppingCart className="w-4 h-4" />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center text-xs">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </Link>

              {isLoggedIn ? (
                <Link href="/account">
                  <Button variant="ghost" size="sm">
                    Minha Conta
                  </Button>
                </Link>
              ) : (
                <Link href="/login">
                  <Button variant="ghost" size="sm">
                    Entrar
                  </Button>
                </Link>
              )}

              {/* Menu Mobile */}
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          {/* Menu Mobile Dropdown */}
          {isMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
              {sections.map((section) => (
                <button
                  key={section.category}
                  onClick={() => scrollToSection(section.category)}
                  className="block w-full text-left py-2 text-foreground hover:text-primary transition-colors font-medium"
                >
                  {section.title}
                </button>
              ))}
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
              Coleção Exclusiva
              <span className="text-primary block">Rotaract Distrito 4590</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty">
              Produtos premium que representam os valores e a elegância do Rotaract. Qualidade superior para
              rotaractianos que fazem a diferença.
            </p>
           
          </div>
        </div>
      </section>

      {/* Seções de Produtos */}
      {sections.map((section) => {
        const sectionProducts = products.filter((p) => p.category === section.category)

        return (
          <section key={section.category} id={section.category.toLowerCase()} className="py-16 px-4">
            <div className="container mx-auto">
              {section.category === "Camisetas" && (
                <div className="mb-16">
    
                  <Card className="max-w-4xl mx-auto group hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-2 gap-0">
                        <div className="aspect-square overflow-hidden">
                          <img
                            src={featuredProduct.image || "/placeholder.svg"}
                            alt={featuredProduct.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-8 flex flex-col justify-center">
                          <Badge className="w-fit mb-4">Mais Vendido</Badge>
                          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
                            {featuredProduct.name}
                          </h3>
                          <p className="text-muted-foreground mb-6 text-pretty">{featuredProduct.description}</p>
                          <div className="flex items-center gap-4 mb-6">
                            <span className="text-3xl font-bold text-primary">
                              R$ {featuredProduct.price.toFixed(2).replace(".", ",")}
                            </span>
                            <Badge variant="secondary">Frete Grátis</Badge>
                          </div>
                          <div className="flex gap-4">
                            <Link href={`/product/${featuredProduct.id}`} className="flex-1">
                              <Button variant="outline" className="w-full bg-transparent">
                                Ver Detalhes
                              </Button>
                            </Link>
                            <Button className="flex-1" onClick={() => handleBuyNow(featuredProduct)}>
                              Comprar Agora
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-foreground">{section.title}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                {sectionProducts.map((product) => (
                  <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <CardContent className="p-0">
                      <Link href={`/product/${product.id}`}>
                        <div className="aspect-[3/4] overflow-hidden rounded-t-lg cursor-pointer">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                      </Link>
                      <div className="p-6">
                        <Link href={`/product/${product.id}`}>
                          <h3 className="font-bold text-lg mb-2 text-foreground text-balance hover:text-primary transition-colors cursor-pointer">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-2xl font-bold text-primary mb-4">
                          R$ {product.price.toFixed(2).replace(".", ",")}
                        </p>
                        <Button className="w-full" onClick={() => handleBuyNow(product)}>
                          Comprar Agora
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

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">R</span>
            </div>
            <div>
              <h3 className="font-bold text-xl">Rotaract Distrito 4590</h3>
              <p className="text-sm opacity-80">Servir para Transformar</p>
            </div>
          </div>
          <p className="text-sm opacity-80 mb-4">© 2024 Rotaract Distrito 4590. Todos os direitos reservados.</p>
          <p className="text-xs opacity-60">Produtos oficiais do Rotaract International - Distrito 4590</p>
        </div>
      </footer>
    </div>
  )
}
