/**
 * Format the API response before inserting in SQLite
 */
export const formatFromAPI = (json) => {
    return {
        game_index: json['game_index'],
        name: json['name'],
        primary_type: json['types']['primary_type'],
        secondary_type: json['types']['secondary_type'],
        front_sprite: json['front_sprite'],
        back_sprite: json['back_sprite'],
        hp_stat: json['stats'][0]['base_stat'],
        attack_stat: json['stats'][1]['base_stat'],
        defense_stat: json['stats'][2]['base_stat'],
        special_attack_stat: json['stats'][3]['base_stat'],
        special_defense_stat: json['stats'][4]['base_stat'],
        speed_stat: json['stats'][5]['base_stat'],
        is_shiny: json['is_shiny'],
    }
}