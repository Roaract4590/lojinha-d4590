"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Plus, Minus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
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
  {
    id: 1,
    name: "Camiseta Rotaract Premium",
    price: 89.9,
    image: "/foto.png",
    category: "Camisetas",
    description:
      "Camiseta premium 100% algodão com logo bordado do Rotaract. Tecido de alta qualidade, corte moderno e acabamento impecável. Ideal para eventos oficiais e uso casual. Disponível em várias cores e tamanhos.",
    images: ["/foto.png", "/foto.png"],
    isClothing: true,
  },
  {
    id: 2,
    name: "Polo Distrito 4590",
    price: 129.9,
    image: "/foto.png",
    category: "Camisetas",
    description:
      "Polo elegante com bordado exclusivo do Distrito 4590. Tecido piquet de primeira linha, gola reforçada e botões de qualidade superior. Perfeita para reuniões e eventos formais.",
    images: ["/foto.png", "/foto.png"],
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
    image: "/foto.png",
    category: "Acessórios",
    description: "Chaveiro em metal nobre com acabamento premium. Design exclusivo do Rotaract Distrito 4590.",
    images: ["/foto.png", "/foto.png"],
  },
  {
    id: 9,
    name: "Camisa Social Rotaract",
    price: 159.9,
    image: "/foto.png",
    category: "Uniformes",
    description: "Camisa social de alta qualidade com bordado discreto do Rotaract. Tecido anti-rugas, corte slim fit.",
    images: ["/foto.png", "/foto.png"],
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

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSizes, setSelectedSizes] = useState<string[]>([])
  const { openCart, addToCart: addToCartContext, getCartItemsCount } = useCart()
  const { messages, showToast, removeToast } = useToast()

  const productId = Number.parseInt(params.id as string)
  const product = products.find((p) => p.id === productId)

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-light mb-6 text-black">Produto não encontrado</h1>
          <Link href="/">
            <Button className="bg-[#d41367] hover:bg-[#b8115a] text-white font-light text-sm tracking-wide uppercase">
              Voltar à loja
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  const addToCart = () => {
    if (product.isClothing && selectedSizes.length !== quantity) {
      showToast({
        type: "warning",
        title: "Tamanhos obrigatórios",
        message: "Por favor, selecione o tamanho para cada item.",
      })
      return
    }

    if (product.isClothing) {
      selectedSizes.forEach((size) => {
        addToCartContext({
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          size,
        })
      })
    } else {
      addToCartContext(
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
        },
        quantity,
      )
    }

    showToast({
      type: "success",
      title: "Produto adicionado",
      message: "Produto adicionado ao carrinho com sucesso!",
    })

    setQuantity(1)
    setSelectedSizes([])
  }

  const increaseQuantity = () => {
    const newQuantity = quantity + 1
    setQuantity(newQuantity)

    if (product.isClothing) {
      setSelectedSizes((prev) => [...prev, ""])
    }
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1
      setQuantity(newQuantity)

      if (product.isClothing) {
        setSelectedSizes((prev) => prev.slice(0, -1))
      }
    }
  }

  const updateSize = (index: number, size: string) => {
    setSelectedSizes((prev) => {
      const newSizes = [...prev]
      newSizes[index] = size
      return newSizes
    })
  }

  const cartItemsCount = getCartItemsCount()

  return (
    <div className="min-h-screen bg-white">
      <ToastContainer messages={messages} onRemove={removeToast} />

      <header className="sticky top-0 z-40 bg-white border-b border-gray-100 py-6 px-6">
        <div className="container mx-auto flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="hover:bg-gray-50 text-black font-light text-sm tracking-wide uppercase"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <Link href="/" className="flex items-center">
            <Image
              src="/rotaract-logo.png"
              alt="Rotaract Distrito 4590"
              width={150}
              height={50}
              className="h-10 w-auto"
            />
          </Link>
          <Button variant="ghost" size="sm" className="relative hover:bg-gray-50" onClick={openCart}>
            <ShoppingCart className="w-5 h-5 text-black" />
            {cartItemsCount > 0 && (
              <Badge className="absolute -top-2 -right-2 bg-[#d41367] text-white text-xs min-w-[20px] h-5 flex items-center justify-center rounded-full">
                {cartItemsCount}
              </Badge>
            )}
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
          <div className="space-y-6">
            <div className="aspect-square overflow-hidden bg-gray-50">
              <img
                src={product.images[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden transition-all duration-300 ${
                    selectedImage === index ? "ring-2 ring-[#d41367]" : "hover:ring-1 hover:ring-gray-300"
                  }`}
                >
                  <img
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover bg-gray-50"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <Badge className="mb-4 bg-gray-100 text-gray-600 font-light text-xs tracking-wider uppercase">
                {product.category}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-light text-black mb-6 tracking-tight">{product.name}</h1>
              <div className="flex items-center gap-6 mb-8">
                <span className="text-4xl font-light text-black">R$ {product.price.toFixed(2).replace(".", ",")}</span>
                <Badge variant="outline" className="border-gray-300 text-gray-600 font-light">
                  Frete Grátis
                </Badge>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-light tracking-wide uppercase text-gray-600">Quantidade</label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decreaseQuantity}
                  className="border-gray-300 hover:bg-gray-50 w-10 h-10 p-0 bg-transparent"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-xl font-light w-12 text-center text-black">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={increaseQuantity}
                  className="border-gray-300 hover:bg-gray-50 w-10 h-10 p-0 bg-transparent"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {product.isClothing && (
              <div className="space-y-4">
                <label className="text-sm font-light tracking-wide uppercase text-gray-600">
                  Tamanhos {quantity > 1 && `(${quantity} itens)`}
                </label>
                <div className="space-y-3">
                  {Array.from({ length: quantity }, (_, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <span className="text-sm text-gray-500 w-16">Item {index + 1}:</span>
                      <Select value={selectedSizes[index] || ""} onValueChange={(value) => updateSize(index, value)}>
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
              className="w-full text-sm py-6 bg-[#d41367] hover:bg-[#b8115a] text-white font-light tracking-wide uppercase transition-all duration-300"
              onClick={addToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Adicionar ao Carrinho - R$ {(product.price * quantity).toFixed(2).replace(".", ",")}
            </Button>

            <div className="space-y-6 pt-8 border-t border-gray-100">
              <h3 className="text-2xl font-light text-black tracking-tight">Descrição do Produto</h3>
              <p className="text-gray-600 leading-relaxed font-light text-lg">{product.description}</p>

              <div className="space-y-4">
                <h4 className="font-light text-lg text-black tracking-wide">Características:</h4>
                <ul className="text-gray-600 space-y-2 font-light">
                  <li>• Material de alta qualidade</li>
                  <li>• Bordado oficial do Rotaract</li>
                  <li>• Disponível em vários tamanhos</li>
                  <li>• Garantia de 30 dias</li>
                </ul>
              </div>
              <img src="/tm1.png" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
