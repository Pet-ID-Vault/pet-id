export function asBytes32(str) {
  const hex = Array.from(new TextEncoder().encode(str))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  return '0x' + hex.padEnd(64, '0').slice(0, 64);
}

export function asUint256(str) {
  const hex = Array.from(new TextEncoder().encode(str))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
  return '0x' + hex.padStart(64, '0').slice(0, 64);
}