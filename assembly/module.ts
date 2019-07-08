export function add(a: i32, b: i32): i32 {
    let count: i32 = 0;
    while (count < b) {
        a += count;
        count++;
    }
    return a;
}