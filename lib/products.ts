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
    price: 20,
    image: "/produtos/caneca.jpg",
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

  // PIN
  {
    id: 4,
    name: "Pin",
    price: 20,
    image: "/produtos/pin.jpg",
    category: "Acessórios",
    description:
      "Tirante 25mm com mosquetão metálico. Confortável para crachá, chaves e eventos.",
    images: ["/produtos/pin.jpg"],
    detailHtml: `
      <h3 class="text-xl sm:text-2xl font-light text-black tracking-tight">Descrição do Produto</h3>
      <ul class="text-gray-600 space-y-2 font-light list-disc pl-5">
        <li>Largura: 25mm</li>
        <li>Comprimento total: ~90cm</li>
        <li>Mosquetão metálico</li>
      </ul>
    `,
  },


  // TIRANTES
  {
    id: 4,
    name: "Tirante 25mm",
    price: 14,
    image: "/produtos/tirante.jpg",
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


  // ADESIVOS
  {
    id: 6,
    name: "Adesivos vinil 5x5cm",
    price: 1.50,
    image: "/produtos/adesivo-5x5.jpg",
    category: "Acessórios",
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
    id: 8,
    name: "Caneca + tirante",
    price: 30,
    image: "/produtos/kit-600-tirante.jpg",
    category: "Kits/Combos",
    description:
      "Kit com Caneca e tirante. Presente funcional e versátil.",
    images: ["/produtos/kit-600-tirante.jpg"],
    detailHtml: `
      <h3 class="text-xl sm:text-2xl font-light text-black tracking-tight">O Kit Inclui</h3>
      <ul class="text-gray-600 space-y-2 font-light list-disc pl-5">
        <li>1x Caneca </li>
        <li>1x Tirante</li>
      </ul>
    `,
  },
  {
    id: 9,
    name: "Caneca  + Tirante + Pin",
    price: 45,
    image: "/kit/kit1.png",
    category: "Kits/Combos",
    description:
      "Kit com Caneca, tirante e pin para máxima capacidade e praticidade.",
    images: ["/kit/kit1.png"],
    detailHtml: `
      <h3 class="text-xl sm:text-2xl font-light text-black tracking-tight">O Kit Inclui</h3>
      <ul class="text-gray-600 space-y-2 font-light list-disc pl-5">
        <li>1x Caneca </li>
        <li>1x Tirante</li>
        <li>1x Pin</li>
      </ul>
    `,
  },

  // CAMISETAS
  {
    id: 11,
    name: "Camiseta Preta",
    price: 60,
    image: "/produtos/camiseta-preta.png",
    category: "Camisetas",
    description:
      "Camiseta preta 100% algodão, confortável e versátil para o dia a dia.",
    images: ["/produtos/camiseta-preta.png", "/tm1.png"],
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
]
