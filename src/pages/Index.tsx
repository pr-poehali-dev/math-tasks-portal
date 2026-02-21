import { useState, useRef } from 'react';
import { tasks, categories, type Task } from '@/data/tasks';
import Icon from '@/components/ui/icon';

type Page = 'home' | 'categories' | 'tasks';

interface Stats {
  solved: number;
  errors: number;
  streak: number;
  points: number;
  solvedIds: Set<number>;
  errorIds: Set<number>;
}

const difficultyLabel = { easy: 'Лёгкая', medium: 'Средняя', hard: 'Сложная' };
const difficultyColor = {
  easy: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30',
  medium: 'text-amber-400 bg-amber-400/10 border-amber-400/30',
  hard: 'text-red-400 bg-red-400/10 border-red-400/30',
};

function StatCard({ label, value, icon, color }: { label: string; value: string | number; icon: string; color: string }) {
  return (
    <div className="rounded-2xl bg-white/5 border border-white/10 p-4 flex items-center gap-3 card-glow">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${color}`}>
        <Icon name={icon} size={20} />
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value}</div>
        <div className="text-xs text-white/50">{label}</div>
      </div>
    </div>
  );
}

function TaskCard({
  task,
  onSolve,
  isSolved,
  isError,
}: {
  task: Task;
  onSolve: (id: number, correct: boolean) => void;
  isSolved: boolean;
  isError: boolean;
}) {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState<'idle' | 'correct' | 'wrong'>(
    isSolved ? 'correct' : isError ? 'wrong' : 'idle'
  );
  const [showHint, setShowHint] = useState(false);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const checkAnswer = () => {
    const trimmed = value.trim();
    const correct =
      String(task.answer).toLowerCase() === trimmed.toLowerCase() ||
      Number(trimmed) === Number(task.answer);

    if (correct) {
      setStatus('correct');
      onSolve(task.id, true);
    } else {
      setStatus('wrong');
      setShake(true);
      setTimeout(() => setShake(false), 500);
      onSolve(task.id, false);
    }
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && status === 'idle') checkAnswer();
  };

  const reset = () => {
    setStatus('idle');
    setValue('');
    setShowHint(false);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const cat = categories.find(c => c.id === task.category)!;

  return (
    <div
      className={`rounded-2xl border p-5 transition-all duration-300 hover-scale animate-fade-in ${
        status === 'correct'
          ? 'border-emerald-500/40 bg-emerald-500/5 card-glow-success'
          : status === 'wrong'
          ? 'border-red-500/40 bg-red-500/5 card-glow-error'
          : 'border-white/10 bg-white/5 card-glow'
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{cat.emoji}</span>
          <span className="text-xs text-white/50 font-medium">{cat.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold px-2 py-0.5 rounded-full border ${difficultyColor[task.difficulty]}`}>
            {difficultyLabel[task.difficulty]}
          </span>
          <span className="text-xs font-bold text-violet-400">+{task.points} очков</span>
        </div>
      </div>

      <p className="text-white font-semibold text-base mb-4 leading-snug">{task.question}</p>

      {status === 'idle' && (
        <div className={shake ? 'animate-shake' : ''}>
          <div className="flex gap-2">
            <input
              ref={inputRef}
              className="input-math flex-1"
              placeholder="Введи ответ..."
              value={value}
              onChange={e => setValue(e.target.value)}
              onKeyDown={handleKey}
              type="number"
            />
            <button
              onClick={checkAnswer}
              disabled={!value.trim()}
              className="px-4 py-2 rounded-xl font-bold text-white gradient-primary transition-all hover:opacity-90 active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ✓
            </button>
          </div>
          {task.hint && (
            <button
              onClick={() => setShowHint(!showHint)}
              className="mt-2 text-xs text-white/40 hover:text-violet-400 transition-colors flex items-center gap-1"
            >
              <Icon name="Lightbulb" size={12} />
              {showHint ? 'Скрыть подсказку' : 'Показать подсказку'}
            </button>
          )}
          {showHint && task.hint && (
            <div className="mt-2 text-xs text-amber-300 bg-amber-400/10 border border-amber-400/20 rounded-xl px-3 py-2 animate-fade-in">
              💡 {task.hint}
            </div>
          )}
        </div>
      )}

      {status === 'correct' && (
        <div className="flex items-center justify-between animate-scale-in">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <Icon name="CheckCircle" size={18} />
            Верно! Ответ: {task.answer}
          </div>
          <button onClick={reset} className="text-xs text-white/40 hover:text-white transition-colors">
            Повторить
          </button>
        </div>
      )}

      {status === 'wrong' && (
        <div className="space-y-2 animate-scale-in">
          <div className="flex items-center gap-2 text-red-400 font-semibold text-sm">
            <Icon name="XCircle" size={16} />
            Неверно. Ты ввёл: {value}
          </div>
          <button
            onClick={reset}
            className="w-full py-2 rounded-xl text-sm font-semibold bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all"
          >
            Попробовать снова
          </button>
        </div>
      )}
    </div>
  );
}

export default function Index() {
  const [page, setPage] = useState<Page>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [stats, setStats] = useState<Stats>({
    solved: 0,
    errors: 0,
    streak: 0,
    points: 0,
    solvedIds: new Set(),
    errorIds: new Set(),
  });

  const handleSolve = (id: number, correct: boolean) => {
    setStats(prev => {
      if (correct && prev.solvedIds.has(id)) return prev;
      const task = tasks.find(t => t.id === id)!;
      const newSolvedIds = new Set(prev.solvedIds);
      const newErrorIds = new Set(prev.errorIds);

      if (correct) {
        newSolvedIds.add(id);
        newErrorIds.delete(id);
        return {
          ...prev,
          solved: newSolvedIds.size,
          streak: prev.streak + 1,
          points: prev.points + task.points,
          solvedIds: newSolvedIds,
          errorIds: newErrorIds,
        };
      } else {
        newErrorIds.add(id);
        return {
          ...prev,
          errors: prev.errors + 1,
          streak: 0,
          errorIds: newErrorIds,
        };
      }
    });
  };

  const filteredTasks = selectedCategory
    ? tasks.filter(t => t.category === selectedCategory)
    : tasks;

  const accuracy =
    stats.solved + stats.errors > 0
      ? Math.round((stats.solved / (stats.solved + stats.errors)) * 100)
      : 0;

  return (
    <div className="min-h-screen bg-background bg-grid text-white font-[Golos_Text]">
      {/* Ambient blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute -top-20 right-20 w-64 h-64 bg-pink-600/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      {/* Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/80 border-b border-white/10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => { setPage('home'); setSelectedCategory(null); }}
            className="flex items-center gap-2 font-black text-xl"
          >
            <span className="gradient-text">МатМастер</span>
            <span className="text-lg">🚀</span>
          </button>
          <div className="flex items-center gap-1">
            {([
              { id: 'home', label: 'Главная', icon: 'Home' },
              { id: 'categories', label: 'Категории', icon: 'Grid3X3' },
              { id: 'tasks', label: 'Задачи', icon: 'BookOpen' },
            ] as const).map(item => (
              <button
                key={item.id}
                onClick={() => { setPage(item.id); if (item.id !== 'tasks') setSelectedCategory(null); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                  page === item.id
                    ? 'gradient-primary text-white shadow-lg'
                    : 'text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon name={item.icon} size={15} />
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400 font-bold text-sm">⚡ {stats.points}</span>
            {stats.streak >= 3 && (
              <span className="text-orange-400 text-sm font-bold animate-bounce-in">🔥{stats.streak}</span>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 pb-20">

        {/* HOME */}
        {page === 'home' && (
          <div className="space-y-10 pt-10">
            {/* Hero */}
            <div className="text-center space-y-4 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-sm font-medium mb-2">
                <Icon name="Sparkles" size={14} />
                Прокачай математику
              </div>
              <h1 className="text-5xl sm:text-6xl font-black leading-tight">
                Решай задачи.<br />
                <span className="gradient-text">Растя над собой.</span>
              </h1>
              <p className="text-white/50 text-lg max-w-xl mx-auto">
                40 задач по 4 темам с мгновенной проверкой, подсказками и отслеживанием прогресса
              </p>
              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setPage('tasks')}
                  className="gradient-primary px-8 py-3.5 rounded-2xl font-bold text-white text-lg hover:opacity-90 active:scale-95 transition-all shadow-xl shadow-violet-500/20"
                >
                  Начать решать →
                </button>
                <button
                  onClick={() => setPage('categories')}
                  className="px-8 py-3.5 rounded-2xl font-bold text-white/80 border border-white/15 bg-white/5 hover:bg-white/10 transition-all"
                >
                  Выбрать тему
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 animate-fade-in">
              <StatCard label="Решено задач" value={stats.solved} icon="CheckCircle" color="bg-emerald-500/20 text-emerald-400" />
              <StatCard label="Ошибок" value={stats.errors} icon="XCircle" color="bg-red-500/20 text-red-400" />
              <StatCard label="Точность" value={`${accuracy}%`} icon="Target" color="bg-violet-500/20 text-violet-400" />
              <StatCard label="Серия" value={stats.streak} icon="Flame" color="bg-orange-500/20 text-orange-400" />
            </div>

            {/* Category quick access */}
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Темы</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categories.map(cat => {
                  const catTasks = tasks.filter(t => t.category === cat.id);
                  const solvedCount = catTasks.filter(t => stats.solvedIds.has(t.id)).length;
                  const pct = Math.round((solvedCount / catTasks.length) * 100);
                  return (
                    <button
                      key={cat.id}
                      onClick={() => { setPage('tasks'); setSelectedCategory(cat.id); }}
                      className="rounded-2xl border border-white/10 bg-white/5 p-4 text-left hover-scale transition-all card-glow group"
                    >
                      <div className="text-3xl mb-2">{cat.emoji}</div>
                      <div className="font-bold text-white text-sm">{cat.name}</div>
                      <div className="text-xs text-white/40 mt-1">{catTasks.length} задач</div>
                      <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${cat.gradient} transition-all duration-500`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="text-xs text-white/40 mt-1">{pct}% выполнено</div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* CATEGORIES */}
        {page === 'categories' && (
          <div className="pt-10 space-y-6 animate-fade-in">
            <div>
              <h1 className="text-3xl font-black gradient-text mb-1">Категории</h1>
              <p className="text-white/50">Выбери тему и решай задачи по ней</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {categories.map(cat => {
                const catTasks = tasks.filter(t => t.category === cat.id);
                const solvedCount = catTasks.filter(t => stats.solvedIds.has(t.id)).length;
                const errorCount = catTasks.filter(t => stats.errorIds.has(t.id)).length;
                const pct = Math.round((solvedCount / catTasks.length) * 100);
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setPage('tasks'); setSelectedCategory(cat.id); }}
                    className="rounded-2xl border border-white/10 bg-white/5 p-6 text-left hover-scale card-glow transition-all"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-2xl shadow-lg`}>
                        {cat.emoji}
                      </div>
                      <div>
                        <div className="font-bold text-white text-lg">{cat.name}</div>
                        <div className="text-xs text-white/40">{catTasks.length} задач</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-emerald-400">✓ {solvedCount} решено</span>
                      <span className="text-red-400">✗ {errorCount} ошибок</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${cat.gradient} transition-all duration-700`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="text-xs text-white/40 mt-1.5">{pct}% выполнено</div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* TASKS */}
        {page === 'tasks' && (
          <div className="pt-10 space-y-6 animate-fade-in">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <div>
                <h1 className="text-3xl font-black gradient-text mb-1">
                  {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : 'Все задачи'}
                </h1>
                <p className="text-white/50 text-sm">
                  {filteredTasks.filter(t => stats.solvedIds.has(t.id)).length} из {filteredTasks.length} решено
                </p>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-1.5 rounded-xl text-sm font-semibold border transition-all ${
                    !selectedCategory ? 'gradient-primary text-white border-transparent' : 'border-white/15 text-white/60 hover:text-white'
                  }`}
                >
                  Все
                </button>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-1.5 rounded-xl text-sm font-semibold border transition-all ${
                      selectedCategory === cat.id ? 'gradient-primary text-white border-transparent' : 'border-white/15 text-white/60 hover:text-white'
                    }`}
                  >
                    {cat.emoji} {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Progress bar */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center gap-4">
              <div className="flex-1 h-3 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full gradient-primary transition-all duration-700"
                  style={{
                    width: `${Math.round(
                      (filteredTasks.filter(t => stats.solvedIds.has(t.id)).length / filteredTasks.length) * 100
                    )}%`,
                  }}
                />
              </div>
              <span className="text-sm font-bold text-white/60 whitespace-nowrap">
                {Math.round(
                  (filteredTasks.filter(t => stats.solvedIds.has(t.id)).length / filteredTasks.length) * 100
                )}%
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredTasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onSolve={handleSolve}
                  isSolved={stats.solvedIds.has(task.id)}
                  isError={stats.errorIds.has(task.id) && !stats.solvedIds.has(task.id)}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}