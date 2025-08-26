"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ShoppingCart, ArrowLeft, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
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
  {
    id: 1,
    name: "Camiseta Rotaract Premium",
    price: 89.9,
    image: "/premium-white-t-shirt-with-rotaract-logo.png",
    category: "Camisetas",
    description:
      "Camiseta premium 100% algodão com logo bordado do Rotaract. Tecido de alta qualidade, corte moderno e acabamento impecável. Ideal para eventos oficiais e uso casual. Disponível em várias cores e tamanhos.",
    images: ["/premium-white-t-shirt-with-rotaract-logo.png", "/premium-white-t-shirt-with-rotaract-logo.png"],
  },
  {
    id: 2,
    name: "Polo Distrito 4590",
    price: 129.9,
    image: "/elegant-polo-shirt-with-district-logo.png",
    category: "Camisetas",
    description:
      "Polo elegante com bordado exclusivo do Distrito 4590. Tecido piquet de primeira linha, gola reforçada e botões de qualidade superior. Perfeita para reuniões e eventos formais.",
    images: ["/elegant-polo-shirt-with-district-logo.png", "/elegant-polo-shirt-with-district-logo.png"],
  },
  // ... outros produtos
]

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const productId = Number.parseInt(params.id as string)
  const product = products.find((p) => p.id === productId)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <Link href="/">
            <Button>Voltar à loja</Button>
          </Link>
        </div>
      </div>
    )
  }

  const handleBuyNow = () => {
    if (!isLoggedIn) {
      router.push(`/login?redirect=/product/${product.id}`)
    } else {
      // Adicionar ao carrinho e ir para checkout
      router.push("/cart")
    }
  }

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  return (
    <div className="min-h-screen bg-background">
      {/* Header simples */}
      <header className="border-b border-border py-4 px-4">
        <div className="container mx-auto flex items-center justify-between">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">R</span>
            </div>
            <span className="font-bold">Rotaract 4590</span>
          </Link>
          <Link href="/cart">
            <Button variant="outline" size="sm">
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Galeria de Imagens - Esquerda */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg border">
              <img
                src={product.images[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Informações do Produto - Direita */}
          <div className="space-y-6">
            <div>
              <Badge className="mb-2">{product.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-primary">R$ {product.price.toFixed(2).replace(".", ",")}</span>
                <Badge variant="secondary">Frete Grátis</Badge>
              </div>
            </div>

            {/* Quantidade */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Quantidade</label>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm" onClick={decreaseQuantity}>
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <Button variant="outline" size="sm" onClick={increaseQuantity}>
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Botão Comprar */}
            <Button size="lg" className="w-full text-lg py-6" onClick={handleBuyNow}>
              Comprar Agora - R$ {(product.price * quantity).toFixed(2).replace(".", ",")}
            </Button>

            {/* Descrição */}
            <div className="space-y-4 pt-6 border-t">
              <h3 className="text-xl font-bold">Descrição do Produto</h3>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>

              <div className="space-y-2">
                <h4 className="font-semibold">Características:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Material de alta qualidade</li>
                  <li>• Bordado oficial do Rotaract</li>
                  <li>• Disponível em vários tamanhos</li>
                  <li>• Garantia de 30 dias</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
