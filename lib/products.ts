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
  // CANECAS (unitárias)
  {
    id: 1,
    name: "Caneca 500mL",
    price: 0,
    image: "/produtos/caneca-500.jpg",
    category: "Acessórios",
    description:
      "Caneca 500mL em material resistente, ideal para uso diário. Acabamento brilhante e impressão de alta definição.",
    images: ["/produtos/caneca-500.jpg"],
    isBestSeller: false,
    detailHtml: `
      <h3 class="text-xl sm:text-2xl font-light text-black tracking-tight">Descrição do Produto</h3>
      <ul class="text-gray-600 space-y-2 font-light list-disc pl-5">
        <li>Capacidade: 500mL</li>
        <li>Acabamento brilhante</li>
        <li>Impressão durável</li>
      </ul>
    `,
  },
  {
    id: 2,
    name: "Caneca 600mL",
    price: 0,
    image: "/produtos/caneca-600.jpg",
    category: "Acessórios",
    description:
      "Caneca 600mL com parede espessa e pegada confortável. Perfeita para bebidas quentes ou frias.",
    images: ["/produtos/caneca-600.jpg"],
    detailHtml: `
      <h3 class="text-xl sm:text-2xl font-light text-black tracking-tight">Descrição do Produto</h3>
      <ul class="text-gray-600 space-y-2 font-light list-disc pl-5">
        <li>Capacidade: 600mL</li>
        <li>Parede espessa e resistente</li>
        <li>Fácil de higienizar</li>
      </ul>
    `,
  },
  {
    id: 3,
    name: "Caneca 850mL",
    price: 0,
    image: "/produtos/caneca-850.jpg",
    category: "Acessórios",
    description:
      "Caneca 850mL para quem gosta de grande capacidade. Ideal para longas jornadas.",
    images: ["/produtos/caneca-850.jpg"],
    detailHtml: `
      <h3 class="text-xl sm:text-2xl font-light text-black tracking-tight">Descrição do Produto</h3>
      <ul class="text-gray-600 space-y-2 font-light list-disc pl-5">
        <li>Capacidade: 850mL</li>
        <li>Alta resistência</li>
        <li>Acabamento premium</li>
      </ul>
    `,
  },

  // TIRANTES
  {
    id: 4,
    name: "Tirante 25mm",
    price: 0,
    image: "/produtos/tirante-25mm.jpg",
    category: "Acessórios",
    description:
      "Tirante 25mm com mosquetão metálico. Confortável para crachá, chaves e eventos.",
    images: ["/produtos/tirante-25mm.jpg"],
    detailHtml: `
      <h3 class="text-xl sm:text-2xl font-light text-black tracking-tight">Descrição do Produto</h3>
      <ul class="text-gray-600 space-y-2 font-light list-disc pl-5">
        <li>Largura: 25mm</li>
        <li>Comprimento total: ~90cm</li>
        <li>Mosquetão metálico</li>
      </ul>
    `,
  },
  {
    id: 5,
    name: "Tirante 40mm",
    price: 0,
    image: "/produtos/tirante-40mm.jpg",
    category: "Acessórios",
    description:
      "Tirante 40mm robusto com maior área de estampa e conforto no uso prolongado.",
    images: ["/produtos/tirante-40mm.jpg"],
    detailHtml: `
      <h3 class="text-xl sm:text-2xl font-light text-black tracking-tight">Descrição do Produto</h3>
      <ul class="text-gray-600 space-y-2 font-light list-disc pl-5">
        <li>Largura: 40mm</li>
        <li>Comprimento total: ~90cm</li>
        <li>Mosquetão reforçado</li>
      </ul>
    `,
  },

  // ADESIVOS
  {
    id: 6,
    name: "Adesivos vinil 5x5cm",
    price: 0,
    image: "/produtos/adesivo-5x5.jpg",
    category: "Adesivos",
    description:
      "Adesivos em vinil 5x5cm com recorte preciso e resistência à água e à luz.",
    images: ["/produtos/adesivo-5x5.jpg"],
    detailHtml: `
      <h3 class="text-xl sm:text-2xl font-light text-black tracking-tight">Descrição do Produto</h3>
      <ul class="text-gray-600 space-y-2 font-light list-disc pl-5">
        <li>Tamanho: 5x5cm</li>
        <li>Vinil resistente à água</li>
        <li>Adesivo de alta fixação</li>
      </ul>
    `,
  },

  // COMBOS
  {
    id: 7,
    name: "Caneca 500mL + tirante",
    price: 0,
    image: "/produtos/kit-500-tirante.jpg",
    category: "Kits/Combos",
    description:
      "Kit com Caneca 500mL e tirante. Prático para o dia a dia e eventos.",
    images: ["/produtos/kit-500-tirante.jpg"],
    isBestSeller: true,
    detailHtml: `
      <h3 class="text-xl sm:text-2xl font-light text-black tracking-tight">O Kit Inclui</h3>
      <ul class="text-gray-600 space-y-2 font-light list-disc pl-5">
        <li>1x Caneca 500mL</li>
        <li>1x Tirante (25mm ou 40mm)</li>
      </ul>
    `,
  },
  {
    id: 8,
    name: "Caneca 600mL + tirante",
    price: 0,
    image: "/produtos/kit-600-tirante.jpg",
    category: "Kits/Combos",
    description:
      "Kit com Caneca 600mL e tirante. Presente funcional e versátil.",
    images: ["/produtos/kit-600-tirante.jpg"],
    detailHtml: `
      <h3 class="text-xl sm:text-2xl font-light text-black tracking-tight">O Kit Inclui</h3>
      <ul class="text-gray-600 space-y-2 font-light list-disc pl-5">
        <li>1x Caneca 600mL</li>
        <li>1x Tirante (25mm ou 40mm)</li>
      </ul>
    `,
  },
  {
    id: 9,
    name: "Caneca 850mL + tirante",
    price: 0,
    image: "/produtos/kit-850-tirante.jpg",
    category: "Kits/Combos",
    description:
      "Kit com Caneca 850mL e tirante para máxima capacidade e praticidade.",
    images: ["/produtos/kit-850-tirante.jpg"],
    detailHtml: `
      <h3 class="text-xl sm:text-2xl font-light text-black tracking-tight">O Kit Inclui</h3>
      <ul class="text-gray-600 space-y-2 font-light list-disc pl-5">
        <li>1x Caneca 850mL</li>
        <li>1x Tirante (25mm ou 40mm)</li>
      </ul>
    `,
  },

  // CAMISETAS
  {
    id: 10,
    name: "Camiseta Preta e Branca",
    price: 0,
    image: "/produtos/camiseta-preta-branca.jpg",
    category: "Camisetas",
    description:
      "Camiseta bicolor (preta e branca), 100% algodão, modelagem unissex.",
    images: ["/produtos/camiseta-preta-branca.jpg", "/tm1.png"],
    isClothing: true,
    requiresSize: true,
    detailHtml: `
      <h3 class="text-xl sm:text-2xl font-light text-black tracking-tight">Descrição do Produto</h3>
      <p class="text-gray-600 leading-relaxed font-light text-base sm:text-lg">
        Malha 100% algodão (30.1), macia e respirável. Corte moderno com ótimo caimento.
      </p>
      <div class="space-y-3">
        <h4 class="font-light text-lg text-black tracking-wide">Cuidados</h4>
        <ul class="text-gray-600 space-y-2 font-light list-disc pl-5">
          <li>Lavar do avesso em ciclo delicado</li>
          <li>Secar à sombra</li>
          <li>Passar do avesso</li>
        </ul>
      </div>
      <img src="/tm1.png" alt="Guia de medidas" class="mt-4 rounded" />
    `,
  },
  {
    id: 11,
    name: "Camiseta Preta",
    price: 0,
    image: "/produtos/camiseta-preta.jpg",
    category: "Camisetas",
    description:
      "Camiseta preta 100% algodão, confortável e versátil para o dia a dia.",
    images: ["/produtos/camiseta-preta.jpg", "/tm1.png"],
    isClothing: true,
    isBestSeller: true,
    requiresSize: true,
    detailHtml: `
      <h3 class="text-xl sm:text-2xl font-light text-black tracking-tight">Descrição do Produto</h3>
      <ul class="text-gray-600 space-y-2 font-light list-disc pl-5">
        <li>Tecido: 100% algodão</li>
        <li>Modelagem unissex</li>
        <li>Acabamento premium</li>
      </ul>
      <img src="/tm1.png" alt="Guia de medidas" class="mt-4 rounded" />
    `,
  },
  {
    id: 12,
    name: "Camiseta Rosa",
    price: 0,
    image: "/produtos/camiseta-rosa.jpg",
    category: "Camisetas",
    description:
      "Camiseta rosa 100% algodão, toque macio e ótimo caimento.",
    images: ["/produtos/camiseta-rosa.jpg", "/tm1.png"],
    isClothing: true,
    requiresSize: true,
    detailHtml: `
      <h3 class="text-xl sm:text-2xl font-light text-black tracking-tight">Descrição do Produto</h3>
      <ul class="text-gray-600 space-y-2 font-light list-disc pl-5">
        <li>Tecido: 100% algodão</li>
        <li>Toque macio</li>
        <li>Costuras reforçadas</li>
      </ul>
      <img src="/tm1.png" alt="Guia de medidas" class="mt-4 rounded" />
    `,
  },
  {
    id: 13,
    name: "Camiseta Rosa e Preta",
    price: 0,
    image: "/produtos/camiseta-rosa-preta.jpg",
    category: "Camisetas",
    description:
      "Camiseta bicolor (rosa e preta) com modelagem unissex e acabamento premium.",
    images: ["/produtos/camiseta-rosa-preta.jpg", "/tm1.png"],
    isClothing: true,
    requiresSize: true,
    detailHtml: `
      <h3 class="text-xl sm:text-2xl font-light text-black tracking-tight">Descrição do Produto</h3>
      <ul class="text-gray-600 space-y-2 font-light list-disc pl-5">
        <li>Tecido: 100% algodão</li>
        <li>Modelagem unissex</li>
        <li>Ótimo caimento</li>
      </ul>
      <img src="/tm1.png" alt="Guia de medidas" class="mt-4 rounded" />
    `,
  },
]
