import React, { useRef, useEffect, useState } from 'react';

interface Bullet {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

interface Enemy {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

const InvaderGame: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number }>({
    width: window.innerWidth > 800 ? 800 : window.innerWidth * 0.95,
    height: window.innerHeight > 600 ? 600 : window.innerHeight * 0.8,
  });

  const [input, setInput] = useState<{ left: boolean; right: boolean; shoot: boolean }>({
    left: false,
    right: false,
    shoot: false,
  });

  const playerRef = useRef({
    x: canvasSize.width / 2,
    y: canvasSize.height - 80,
    width: 50,
    height: 30,
    speed: 300,
    bullets: [] as Bullet[],
  });

  const enemiesRef = useRef<Enemy[]>([]);
  const enemySpawnTimerRef = useRef<number>(0);
  const gameDurationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(performance.now());

  // 射撃の処理
  useEffect(() => {
    let shootInterval: ReturnType<typeof setInterval> | null = null;
    if (input.shoot && gameStarted && !gameOver) {
      shootInterval = setInterval(() => {
        playerRef.current.bullets.push({
          x: playerRef.current.x,
          y: playerRef.current.y - playerRef.current.height / 2,
          width: 5,
          height: 15,
          speed: 500,
        });
      }, 200);
    }
    return () => {
      if (shootInterval) {
        clearInterval(shootInterval);
      }
    };
  }, [input.shoot, gameStarted, gameOver]);

  // メインのゲームループ
  useEffect(() => {
    if (!gameStarted) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    let animationFrameId: number;
    let lastTime = performance.now();

    // キーボード操作のイベントリスナー
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') setInput(prev => ({ ...prev, left: true }));
      if (e.code === 'ArrowRight') setInput(prev => ({ ...prev, right: true }));
      if (e.code === 'Space') setInput(prev => ({ ...prev, shoot: true }));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'ArrowLeft') setInput(prev => ({ ...prev, left: false }));
      if (e.code === 'ArrowRight') setInput(prev => ({ ...prev, right: false }));
      if (e.code === 'Space') setInput(prev => ({ ...prev, shoot: false }));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // ゲームの更新処理
    const update = (delta: number) => {
      // プレイヤーの移動
      if (input.left) {
        playerRef.current.x -= playerRef.current.speed * delta;
        if (playerRef.current.x < playerRef.current.width / 2) {
          playerRef.current.x = playerRef.current.width / 2;
        }
      }
      if (input.right) {
        playerRef.current.x += playerRef.current.speed * delta;
        if (playerRef.current.x > width - playerRef.current.width / 2) {
          playerRef.current.x = width - playerRef.current.width / 2;
        }
      }

      // 弾の移動
      playerRef.current.bullets = playerRef.current.bullets
        .filter(bullet => bullet.y > 0)
        .map(bullet => ({
          ...bullet,
          y: bullet.y - bullet.speed * delta,
        }));

      // 敵の生成
      enemySpawnTimerRef.current += delta;
      if (enemySpawnTimerRef.current > 1.5 && enemiesRef.current.length < 10) {
        const enemy: Enemy = {
          x: Math.random() * (width - 40) + 20,
          y: -40,
          width: 40,
          height: 30,
          speed: Math.random() * 50 + 50,
        };
        enemiesRef.current.push(enemy);
        enemySpawnTimerRef.current = 0;
      }

      // 敵の移動
      enemiesRef.current = enemiesRef.current
        .filter(enemy => enemy.y < height)
        .map(enemy => ({
          ...enemy,
          y: enemy.y + enemy.speed * delta,
        }));

      // 敵が下端に到達したらゲームオーバー
      enemiesRef.current.forEach(enemy => {
        if (enemy.y + enemy.height / 2 >= height) {
          setGameOver(true);
        }
      });

      // 弾と敵の衝突判定
      playerRef.current.bullets.forEach(bullet => {
        enemiesRef.current.forEach((enemy, index) => {
          if (
            bullet.x < enemy.x + enemy.width &&
            bullet.x + bullet.width > enemy.x &&
            bullet.y < enemy.y + enemy.height &&
            bullet.y + bullet.height > enemy.y
          ) {
            // 敵を削除
            enemiesRef.current.splice(index, 1);
            // 弾を削除
            bullet.y = -10;
          }
        });
      });

      // プレイヤーと敵の衝突判定
      enemiesRef.current.forEach(enemy => {
        if (
          playerRef.current.x < enemy.x + enemy.width &&
          playerRef.current.x + playerRef.current.width > enemy.x &&
          playerRef.current.y < enemy.y + enemy.height &&
          playerRef.current.y + playerRef.current.height > enemy.y
        ) {
          setGameOver(true);
        }
      });
    };

    // 描画処理
    const draw = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // 宇宙背景の描画（星）
      drawStars(ctx, width, height);

      // プレイヤーの描画（スペースシップ）
      drawPlayer(ctx, playerRef.current.x, playerRef.current.y, playerRef.current.width, playerRef.current.height);

      // 弾の描画（レーザー）
      ctx.fillStyle = 'yellow';
      playerRef.current.bullets.forEach(bullet => {
        ctx.fillRect(
          bullet.x - bullet.width / 2,
          bullet.y - bullet.height,
          bullet.width,
          bullet.height
        );
      });

      // 敵の描画（スペースシップ）
      ctx.fillStyle = 'red';
      enemiesRef.current.forEach(enemy => {
        drawEnemy(ctx, enemy.x, enemy.y, enemy.width, enemy.height);
      });
    };

    // 星の描画関数
    const drawStars = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.fillStyle = 'white';
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 1.5;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // プレイヤーの描画関数
    const drawPlayer = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
      ctx.fillStyle = 'cyan';
      ctx.beginPath();
      ctx.moveTo(x, y - height / 2);
      ctx.lineTo(x - width / 2, y + height / 2);
      ctx.lineTo(x + width / 2, y + height / 2);
      ctx.closePath();
      ctx.fill();
    };

    // 敵の描画関数
    const drawEnemy = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number) => {
      ctx.fillStyle = 'magenta';
      ctx.beginPath();
      ctx.moveTo(x, y + height / 2);
      ctx.lineTo(x - width / 2, y - height / 2);
      ctx.lineTo(x + width / 2, y - height / 2);
      ctx.closePath();
      ctx.fill();
    };

    // ゲームループ
    const gameLoop = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      update(delta);
      draw();

      if (!gameOver) {
        animationFrameId = requestAnimationFrame(gameLoop);
      }
    };

    animationFrameId = requestAnimationFrame(gameLoop);

    // 20秒後にゲームオーバー
    gameDurationRef.current = window.setTimeout(() => {
      setGameOver(true);
    }, 20000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (gameDurationRef.current !== null) {
        clearTimeout(gameDurationRef.current);
      }
    };
  }, [gameOver, input, gameStarted, canvasSize.width, canvasSize.height]);

  // リサイズハンドラー
  useEffect(() => {
    const handleResize = () => {
      setCanvasSize({
        width: window.innerWidth > 800 ? 800 : window.innerWidth * 0.95,
        height: window.innerHeight > 600 ? 600 : window.innerHeight * 0.8,
      });
      // プレイヤー位置をリセット
      playerRef.current.x = window.innerWidth > 800 ? 800 / 2 : (window.innerWidth * 0.95) / 2;
      playerRef.current.y = (window.innerHeight > 600 ? 600 : window.innerHeight * 0.8) - 80;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault();
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    enemiesRef.current = [];
    playerRef.current.bullets = [];
    playerRef.current.x = canvasSize.width / 2;
    playerRef.current.y = canvasSize.height - 80;
    startTimeRef.current = performance.now();
    // リセット星を描画するためにも背景をリセット
  };

  const resetGame = () => {
    setGameOver(false);
    setGameStarted(false);
    enemiesRef.current = [];
    playerRef.current.bullets = [];
    playerRef.current.x = canvasSize.width / 2;
    playerRef.current.y = canvasSize.height - 80;
  };

  return (
    <div 
      className="game-container relative flex flex-col items-center bg-black min-h-screen" 
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <canvas
        ref={canvasRef}
        width={canvasSize.width}
        height={canvasSize.height}
        style={{ 
          backgroundColor: '#000',
          display: 'block',
          touchAction: 'none' // タッチ操作の制御を無効化
        }}
      />
      {!gameStarted && !gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center select-none z-50">
          <button
            onClick={startGame}
            className="px-8 py-4 bg-green-500 text-white rounded-lg text-2xl hover:bg-green-600 transition-colors active:bg-green-700"
            style={{ touchAction: 'manipulation' }}
          >
            ゲーム開始
          </button>
        </div>
      )}
      {gameOver && (
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center select-none z-50">
          <div className="text-center">
            <h2 className="text-4xl text-white mb-6">ゲームオーバー</h2>
            <button
              onClick={resetGame}
              className="px-8 py-4 bg-red-500 text-white rounded-lg text-2xl hover:bg-red-600 transition-colors active:bg-red-700"
              style={{ touchAction: 'manipulation' }}
            >
              再挑戦
            </button>
          </div>
        </div>
      )}
      {gameStarted && (
        <>
          <div className="controls mt-2 bg-black bg-opacity-25 p-2 rounded-lg select-none">
            <div className="flex justify-center space-x-8"> {/* ボタン間隔を広げる */}
              <button
                id="left-button"
                className={`control-button w-16 h-16 bg-blue-600 bg-opacity-75 rounded-full flex items-center justify-center text-white text-2xl active:bg-opacity-100 ${
                  input.left ? 'bg-opacity-100' : ''
                }`}
                onTouchStart={(e) => {
                  e.preventDefault();
                  setInput(prev => ({ ...prev, left: true }));
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  setInput(prev => ({ ...prev, left: false }));
                }}
                disabled={!gameStarted || gameOver}
              >
                ←
              </button>
              <button
                id="shoot-button"
                className={`control-button w-16 h-16 bg-red-600 bg-opacity-75 rounded-full flex items-center justify-center text-white text-2xl active:bg-opacity-100 ${
                  input.shoot ? 'bg-opacity-100' : ''
                }`}
                onTouchStart={(e) => {
                  e.preventDefault();
                  setInput(prev => ({ ...prev, shoot: true }));
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  setInput(prev => ({ ...prev, shoot: false }));
                }}
                disabled={!gameStarted || gameOver}
              >
                ●
              </button>
              <button
                id="right-button"
                className={`control-button w-16 h-16 bg-blue-600 bg-opacity-75 rounded-full flex items-center justify-center text-white text-2xl active:bg-opacity-100 ${
                  input.right ? 'bg-opacity-100' : ''
                }`}
                onTouchStart={(e) => {
                  e.preventDefault();
                  setInput(prev => ({ ...prev, right: true }));
                }}
                onTouchEnd={(e) => {
                  e.preventDefault();
                  setInput(prev => ({ ...prev, right: false }));
                }}
                disabled={!gameStarted || gameOver}
              >
                →
              </button>
            </div>
          </div>
          <div className="absolute top-4 right-4 text-white text-lg select-none">
            残り時間: {Math.max(0, 20 - Math.floor((performance.now() - startTimeRef.current) / 1000))}秒
          </div>
        </>
      )}
    </div>
  );
};

// スペーステーマ用のスタイルはTailwind CSSを使用しています。
// 必要に応じて、追加のスタイルや画像を使用してUIをさらに強化してください。

export default InvaderGame;
