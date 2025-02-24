type Pokemon = {
    id: number
    game_index: number
    name: string
    types: type[]
    sprites: sprites
    species: species
    moves: move[]
    stats: stat[]
}

type move = {
    name: string
    url: string
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
    slot: number
    type: {
        name: string
        url: string
    }
}

type stat = {
    base_stat: number
    effort: number
    stat: {
        name: string
        url: string
    }
}

export type { Pokemon, sprites, type, stat, move }