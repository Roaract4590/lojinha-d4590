"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
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
  },
]

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

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

  const handleBuyNow = () => {
    const whatsappNumber = "5511999999999" 
    const message = `Olá! Gostaria de comprar:\n\n*${product.name}*\nQuantidade: ${quantity}\nPreço unitário: R$ ${product.price.toFixed(2).replace(".", ",")}\nTotal: R$ ${(product.price * quantity).toFixed(2).replace(".", ",")}\n\nPoderia me ajudar com o pedido?`

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const increaseQuantity = () => setQuantity((prev) => prev + 1)
  const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-gray-100 py-6 px-6">
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
          <div></div>
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

            <Button
              size="lg"
              className="w-full text-sm py-6 bg-[#d41367] hover:bg-[#b8115a] text-white font-light tracking-wide uppercase transition-all duration-300"
              onClick={handleBuyNow}
            >
              Comprar Agora - R$ {(product.price * quantity).toFixed(2).replace(".", ",")}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
