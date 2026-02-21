/**
 * Retourne les points attribués selon la position à l'arrivée,
 * sur la base du système officiel IBU (à partir de 2022/2023).
 * @param {number} position - La position finale (1 = 1ère place, 2 = 2ème, etc.)
 * @returns {number} Les points attribués pour cette position (0 si hors classement points)
 */
export function getCompetitionPoints(position: number): number {
  const pointsTable = [
    90,  // 1
    75,  // 2
    60,  // 3
    50,  // 4
    45,  // 5
    40,  // 6
    36,  // 7
    34,  // 8
    32,  // 9
    31,  // 10
    30,  // 11
    29,  // 12
    28,  // 13
    27,  // 14
    26,  // 15
    25,  // 16
    24,  // 17
    23,  // 18
    22,  // 19
    21,  // 20
    20,  // 21
    19,  // 22
    18,  // 23
    17,  // 24
    16,  // 25
    15,  // 26
    14,  // 27
    13,  // 28
    12,  // 29
    11,  // 30
    10,  // 31
    9,   // 32
    8,   // 33
    7,   // 34
    6,   // 35
    5,   // 36
    4,   // 37
    3,   // 38
    2,   // 39
    1,   // 40
  ];
  if (position < 1 || position > 40) return 0;
  return pointsTable[position - 1];
}
