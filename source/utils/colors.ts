import { log } from "./log.js";

function resolve_hex_color(color_string: string): [number, number, number] {
    return Array(0, 0, 0).map((v, i) =>
        parseInt(color_string.replace('#', '').slice(2*i, 2*i + 2), 16)
    ) as [number, number, number];
}

function make_hex_color(color_array: [number, number, number]): string {
    return '#' + color_array.map(v => v.toString(16).padStart(2, '0')).join('');
}

const ravg = (x1: number, x2: number): number => Math.round((x1 + x2) / 2);

export function average_color(first_color: string, second_color: string) {
    const [r1, g1, b1] = resolve_hex_color(first_color);
    log('first', resolve_hex_color(first_color))
    const [r2, g2, b2] = resolve_hex_color(second_color);
    const res = make_hex_color([ravg(r1, r2), ravg(g1, g2), ravg(b1, b2)])
    log(res);
    return res;
}

export function gradient_array(first_color: string, second_color: string, length: number): string[] {
    if (length == 2) return [first_color, second_color];
    if (length == 3) return [first_color, average_color(first_color, second_color), second_color];
    
    if (length % 2 === 0) { // Even length
        var res = gradient_array(first_color, average_color(first_color, second_color), length / 2);
        res.push(...gradient_array(average_color(first_color, second_color), second_color, length / 2));
        return res;
    }
    else { // Odd length
        var res = gradient_array(first_color, average_color(first_color, second_color), Math.ceil(length / 2));
        res.push(...gradient_array(average_color(first_color, second_color), second_color, Math.ceil(length / 2)).slice(1))
        return res;
    }
}
