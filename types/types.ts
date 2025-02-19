type Pokemon = {
    id: number
    name: string
    types: type[]
    sprites: sprites
    species: species
}

type sprites = {
    front: string
    back: string
}

type species = {
    name: string
    url: string
}

type type = {
    name: string
    url: string
}

export type { Pokemon, sprites, type }