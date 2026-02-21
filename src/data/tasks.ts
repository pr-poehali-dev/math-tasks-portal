export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Task {
  id: number;
  category: string;
  question: string;
  answer: number | string;
  hint?: string;
  difficulty: Difficulty;
  points: number;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  color: string;
  gradient: string;
}

export const categories: Category[] = [
  {
    id: 'arithmetic',
    name: 'Арифметика',
    emoji: '🔢',
    color: '#A78BFA',
    gradient: 'from-violet-500 to-purple-700',
  },
  {
    id: 'algebra',
    name: 'Алгебра',
    emoji: '📐',
    color: '#F472B6',
    gradient: 'from-pink-500 to-rose-700',
  },
  {
    id: 'geometry',
    name: 'Геометрия',
    emoji: '📏',
    color: '#38BDF8',
    gradient: 'from-sky-400 to-blue-700',
  },
  {
    id: 'logic',
    name: 'Логика',
    emoji: '🧠',
    color: '#34D399',
    gradient: 'from-emerald-400 to-teal-700',
  },
];

export const tasks: Task[] = [
  // Арифметика — лёгкие
  { id: 1, category: 'arithmetic', question: '48 + 37 = ?', answer: 85, difficulty: 'easy', points: 10, hint: 'Складывай по частям: 48+30=78, 78+7=?' },
  { id: 2, category: 'arithmetic', question: '125 − 68 = ?', answer: 57, difficulty: 'easy', points: 10, hint: 'Вычти сначала 60, потом 8' },
  { id: 3, category: 'arithmetic', question: '7 × 9 = ?', answer: 63, difficulty: 'easy', points: 10, hint: 'Таблица умножения на 7' },
  { id: 4, category: 'arithmetic', question: '144 ÷ 12 = ?', answer: 12, difficulty: 'easy', points: 10, hint: 'Сколько раз 12 помещается в 144?' },
  { id: 5, category: 'arithmetic', question: '256 + 344 = ?', answer: 600, difficulty: 'easy', points: 10 },
  { id: 6, category: 'arithmetic', question: '15² = ?', answer: 225, difficulty: 'medium', points: 20, hint: '15×15 = 15×10 + 15×5' },
  { id: 7, category: 'arithmetic', question: '√169 = ?', answer: 13, difficulty: 'medium', points: 20, hint: 'Какое число умноженное само на себя даёт 169?' },
  { id: 8, category: 'arithmetic', question: '2³ × 5² = ?', answer: 200, difficulty: 'medium', points: 20, hint: '2³=8, 5²=25, теперь умножь' },
  { id: 9, category: 'arithmetic', question: '1000 − 347 = ?', answer: 653, difficulty: 'easy', points: 10 },
  { id: 10, category: 'arithmetic', question: '36 × 25 = ?', answer: 900, difficulty: 'medium', points: 20, hint: '36 × 25 = 36 × 100 ÷ 4' },

  // Алгебра
  { id: 11, category: 'algebra', question: 'Реши уравнение: x + 15 = 42', answer: 27, difficulty: 'easy', points: 10, hint: 'x = 42 − 15' },
  { id: 12, category: 'algebra', question: 'Реши: 3x = 72', answer: 24, difficulty: 'easy', points: 10, hint: 'x = 72 ÷ 3' },
  { id: 13, category: 'algebra', question: 'Реши: 2x + 7 = 31', answer: 12, difficulty: 'medium', points: 20, hint: '2x = 31−7, затем дели на 2' },
  { id: 14, category: 'algebra', question: 'Реши: 5x − 3 = 22', answer: 5, difficulty: 'medium', points: 20, hint: '5x = 22+3' },
  { id: 15, category: 'algebra', question: 'Если f(x) = 2x² − 3, то f(4) = ?', answer: 29, difficulty: 'hard', points: 30, hint: '2×16 − 3 = ?' },
  { id: 16, category: 'algebra', question: 'Реши: x² = 81', answer: 9, difficulty: 'medium', points: 20, hint: 'Введи положительный корень' },
  { id: 17, category: 'algebra', question: 'Реши: (x + 3)(x − 3) = 7, если x > 0', answer: 4, difficulty: 'hard', points: 30, hint: 'x²−9=7, x²=16' },
  { id: 18, category: 'algebra', question: 'Реши: 4x + 2 = 3x + 10', answer: 8, difficulty: 'medium', points: 20 },
  { id: 19, category: 'algebra', question: 'Найди сумму корней: x² − 7x + 10 = 0', answer: 7, difficulty: 'hard', points: 30, hint: 'По формуле Виета: сумма = b/a с обратным знаком' },
  { id: 20, category: 'algebra', question: 'Реши: 6x − 14 = 4x + 2', answer: 8, difficulty: 'medium', points: 20 },

  // Геометрия
  { id: 21, category: 'geometry', question: 'Периметр квадрата со стороной 13 см = ?', answer: 52, difficulty: 'easy', points: 10, hint: 'P = 4 × a' },
  { id: 22, category: 'geometry', question: 'Площадь прямоугольника 8 × 12 = ?', answer: 96, difficulty: 'easy', points: 10, hint: 'S = a × b' },
  { id: 23, category: 'geometry', question: 'Площадь круга r=5 (π≈3). Ответ: ?', answer: 75, difficulty: 'medium', points: 20, hint: 'S = π × r² = 3 × 25' },
  { id: 24, category: 'geometry', question: 'Гипотенуза прямоугольного треугольника с катетами 3 и 4 = ?', answer: 5, difficulty: 'easy', points: 10, hint: 'Теорема Пифагора: c² = 3² + 4²' },
  { id: 25, category: 'geometry', question: 'Сумма углов треугольника в градусах = ?', answer: 180, difficulty: 'easy', points: 10 },
  { id: 26, category: 'geometry', question: 'Площадь треугольника: основание 10, высота 6 = ?', answer: 30, difficulty: 'easy', points: 10, hint: 'S = (a × h) ÷ 2' },
  { id: 27, category: 'geometry', question: 'Периметр треугольника со сторонами 7, 8, 9 = ?', answer: 24, difficulty: 'easy', points: 10 },
  { id: 28, category: 'geometry', question: 'Объём куба со стороной 4 = ?', answer: 64, difficulty: 'medium', points: 20, hint: 'V = a³ = 4×4×4' },
  { id: 29, category: 'geometry', question: 'Диагональ квадрата со стороной 7 (≈ 10 без дробей). Введи: d² = ?', answer: 98, difficulty: 'hard', points: 30, hint: 'd² = 7² + 7²' },
  { id: 30, category: 'geometry', question: 'Площадь параллелограмма: a=9, h=6 = ?', answer: 54, difficulty: 'medium', points: 20 },

  // Логика
  { id: 31, category: 'logic', question: 'Следующее число в ряду: 2, 4, 8, 16, _?', answer: 32, difficulty: 'easy', points: 10, hint: 'Каждое число умножается на 2' },
  { id: 32, category: 'logic', question: 'Следующее число: 1, 1, 2, 3, 5, 8, _?', answer: 13, difficulty: 'easy', points: 10, hint: 'Ряд Фибоначчи: каждое число = сумма двух предыдущих' },
  { id: 33, category: 'logic', question: '5 кур несут 5 яиц за 5 дней. Сколько яиц снесут 10 кур за 10 дней?', answer: 20, difficulty: 'medium', points: 20, hint: '1 курица несёт 1 яйцо за 5 дней' },
  { id: 34, category: 'logic', question: 'Следующее число: 3, 6, 11, 18, 27, _?', answer: 38, difficulty: 'medium', points: 20, hint: 'Разности: 3, 5, 7, 9, ...' },
  { id: 35, category: 'logic', question: 'Если сегодня среда, какой день через 100 дней? (1=пн, 2=вт, 3=ср...)', answer: 6, difficulty: 'hard', points: 30, hint: '(3 + 100 - 1) mod 7 + 1 = ?' },
  { id: 36, category: 'logic', question: 'Следующее число: 100, 50, 25, 12.5... Введи 12.5 × 0.5 × 10 = ?', answer: 625, difficulty: 'hard', points: 30, hint: '6.25 × 100' },
  { id: 37, category: 'logic', question: 'Сколько минут в 3 часах 45 минутах?', answer: 225, difficulty: 'easy', points: 10 },
  { id: 38, category: 'logic', question: 'Следующее число: 1, 4, 9, 16, 25, _?', answer: 36, difficulty: 'easy', points: 10, hint: 'Это квадраты чисел' },
  { id: 39, category: 'logic', question: 'Ряд: 2, 6, 18, 54, _?', answer: 162, difficulty: 'medium', points: 20, hint: 'Умножай на 3' },
  { id: 40, category: 'logic', question: 'Число чётных чисел от 1 до 100 = ?', answer: 50, difficulty: 'easy', points: 10 },
];
