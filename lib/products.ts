// lib/products.ts

export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
  images: string[]
  isBestSeller?: boolean
  isClothing?: boolean
  requiresSize?: boolean
  detailHtml?: string
}

export const products: Product[] = [
  {
    id: 1,
    name: "Camiseta Rotaract Premium",
    price: 999.9,
    image: "/foto.png",
    category: "Camisetas",
    description:
      "Camiseta premium 100% algodão com logo bordado do Rotaract. Tecido de alta qualidade, corte moderno e acabamento impecável. Ideal para eventos oficiais e uso casual.",
    images: ["/foto.png", "/foto.png"],
    isBestSeller: false,
    isClothing: true,
    requiresSize: true,
    detailHtml: `
      <h3 class="text-xl sm:text-2xl font-light text-black tracking-tight">Descrição do Produto</h3>
      <p class="text-gray-600 leading-relaxed font-light text-base sm:text-lg">
        Tecido 100% algodão fio penteado (malha 30.1), toque macio e respirável. Corte moderno com ótimo caimento.
      </p>
      <div class="space-y-3">
        <h4 class="font-light text-lg text-black tracking-wide">Características</h4>
        <ul class="text-gray-600 space-y-2 font-light list-disc pl-5">
          <li>Bordado oficial Rotaract</li>
          <li>Modelagem unissex</li>
          <li>Não desbota com lavagens</li>
        </ul>
      </div>
      <div class="space-y-3 mt-4">
        <h4 class="font-light text-lg text-black tracking-wide">Cuidados</h4>
        <ul class="text-gray-600 space-y-2 font-light list-disc pl-5">
          <li>Lavar à mão ou em ciclo delicado</li>
          <li>Secar à sombra</li>
          <li>Passar do avesso</li>
        </ul>
      </div>
      <img src="/tm1.png" alt="Guia de medidas" class="mt-4 rounded" />
    `,
  },
  {
    id: 2,
    name: "Polo Distrito 4590",
    price: 999.9,
    image: "/foto.png",
    category: "Camisetas",
    description:
      "Polo elegante com bordado exclusivo do Distrito 4590. Tecido piquet de primeira linha, gola reforçada e botões de qualidade superior.",
    images: ["/foto.png", "/foto.png"],
    isClothing: true,
    requiresSize: true,
    detailHtml: `
      <h3 class="text-xl sm:text-2xl font-light text-black tracking-tight">Descrição do Produto</h3>
      <p class="text-gray-600 leading-relaxed font-light text-base sm:text-lg">
        Polo em malha piquet premium, com gola e punhos canelados e plaqueta com 2 botões. Bordado do Distrito 4590 no peito.
      </p>
      <div class="space-y-3">
        <h4 class="font-light text-lg text-black tracking-wide">Destaques</h4>
        <ul class="text-gray-600 space-y-2 font-light list-disc pl-5">
          <li>Conforto térmico e alta durabilidade</li>
          <li>Acabamento profissional</li>
          <li>Perfeita para eventos e reuniões</li>
        </ul>
      </div>
      <img src="/tm1.png" alt="Guia de medidas polo" class="mt-4 rounded" />
    `,
  },
  {
    id: 5,
    name: "Caneca do Todo Poderoso, 800ml, cor rosa",
    price: 999.9,
    image: "/produtos/caneca.jpg",
    category: "Acessórios",
    description:
      "Caneca de alta capacidade em material resistente, ideal para uso diário e presentes especiais.",
    images: ["/produtos/caneca.jpg", "/foto.png"],
    detailHtml: `
      <h3 class="text-xl sm:text-2xl font-light text-black tracking-tight">Descrição do Produto</h3>
      <p class="text-gray-600 leading-relaxed font-light text-base sm:text-lg">
        Caneca 800ml com acabamento brilhante e impressão de alta definição. Ergonomia confortável e base estável.
      </p>
      <ul class="text-gray-600 space-y-2 font-light list-disc pl-5">
        <li>Capacidade: 800ml</li>
        <li>Não Compatível com micro-ondas</li>
        <li>Lavável em lava-louças</li>
      </ul>
    `,
  },
  {
    id: 6,
    name: "Tirante do Todo Poderoso, cor rosa",
    price: 999.9,
    image: "/produtos/tirante.jpg",
    category: "Acessórios",
    description:
      "Tirante robusto com mosquetão metálico e acabamento premium. Ideal para eventos, crachás e chaves.",
    images: ["/produtos/tirante.jpg", "/foto.png"],
    isBestSeller: false,
    detailHtml: `
      <h3 class="text-xl sm:text-2xl font-light text-black tracking-tight">Descrição do Produto</h3>
      <p class="text-gray-600 leading-relaxed font-light text-base sm:text-lg">
        Fita macia e resistente, com estampa durável. Mosquetão em metal escovado para maior segurança.
      </p>
      <ul class="text-gray-600 space-y-2 font-light list-disc pl-5">
        <li>Largura: 20mm</li>
        <li>Comprimento total: 90cm</li>
        <li>Fecho seguro e confortável</li>
      </ul>
    `,
  },
  {
    id: 7,
    name: "Pin Torzinho",
    price: 999.9,
    image: "/produtos/pin.jpg",
    category: "Acessórios",
    isBestSeller: true,
    description:
      "Pin metálico esmaltado com fixação traseira. Ideal para lapelas, mochilas e bonés.",
    images: ["/produtos/pin.jpg", "/foto.png", "/foto.png", "/foto.png", "/foto.png","/foto.png", "/foto.png", "/foto.png"],
    detailHtml: `
      <h3 class="text-xl sm:text-2xl font-light text-black tracking-tight">Descrição do Produto</h3>
      <p class="text-gray-600 leading-relaxed font-light text-base sm:text-lg">
        Acabamento em metal com banho protetivo, cores vivas e fecho borboleta traseiro.
      </p>
      <ul class="text-gray-600 space-y-2 font-light list-disc pl-5">
        <li>Tamanho aprox.: 25mm</li>
        <li>Alto relevo esmaltado</li>
        <li>Acompanha tarraxa</li>
      </ul>
    `,
  },
]
