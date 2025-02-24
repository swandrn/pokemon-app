/**
 * Format the API response before inserting in SQLite
 */
export const formatFromAPI = (json) => {
    return {
        game_index: json['id'],
        name: json['name'],
        primary_type: json['types'][0]['type']['name'],
        secondary_type: json['types'][1]['type']['name'] ? json['types'][1]['type']['name'] : null,
        front_sprite: json['sprites']['front_default'],
        back_sprite: json['sprites']['back_default'],
        hp_stat: json['stats'][0]['base_stat'],
        attack_stat: json['stats'][1]['base_stat'],
        defense_stat: json['stats'][2]['base_stat'],
        special_attack_stat: json['stats'][3]['base_stat'],
        special_defense_stat: json['stats'][4]['base_stat'],
        speed_stat: json['stats'][5]['base_stat'],
    }
}