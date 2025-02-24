// Temporary type
type PokemonTableValues = {
    game_index: number;
    name: string;
    primary_type: string;
    secondary_type: string;
    front_sprite: string;
    back_sprite: string;
    hp_stat: number;
    attack_stat: number;
    defense_stat: number;
    special_attack_stat: number;
    special_defense_stat: number;
    speed_stat: number;
    is_shiny: boolean;
}

type Pokemon = {
    game_index: number
    name: string
    types: PokemonType
    front_sprite: string;
    back_sprite: string;
    species: Species
    moves: Move[]
    stats: Stat[]
    is_shiny: boolean;
}

type Move = {
    name: string
    url: string
}

type Sprites = {
    front: string
    back: string
}

type Species = {
    name: string
    url: string
}

type PokemonType = {
    primary_type: string;
    secondary_type?: string;
}

type Stat = {
    base_stat: number
    effort: number
    stat: {
        name: string
        url: string
    }
}

export type { Pokemon, PokemonTableValues, Sprites, PokemonType, Stat, Move }