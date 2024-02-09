//interpolation to find x_points  between two points
export function lerp(a: number, b: number, t: number) {
    return a + (b - a) * t;
}