# Hra Snake README

## Přehled
Tento projekt je jednoduchá hra Snake implementovaná v JavaScriptu pomocí HTML5 canvas. Hra umožňuje hráči ovládat hada, aby jedl jablka, rostl delší a vyhnul se srážce se zdmi nebo sám se sebou. Skóre je sledováno a může být uloženo na server.

## Funkce
- Pohyb hada v reálném čase.
- Generování jablek a detekce kolizí.
- Sledování a zobrazení skóre.
- Ukládání vysokých skóre na server.
- Nastavitelná rychlost hry na základě skóre.
- Funkce restartování.

## Předpoklady
- Webový server pro poskytování HTML a JavaScriptových souborů.
- API endpoint pro ukládání a načítání vysokých skóre.

## Instalace
1. Naklonujte repozitář nebo stáhněte projektové soubory.
2. Ujistěte se, že máte spuštěný webový server. Pro lokální vývoj můžete použít jednoduché servery jako `http-server`.
3. Na svém webovém serveru naservírujte HTML soubor.

## Použití
1. Otevřete hru ve webovém prohlížeči navigací k naservírovanému HTML souboru.
2. Zadejte své jméno do vstupního pole.
3. Klikněte na tlačítko "Start" pro zahájení hry.
4. Ovládejte hada pomocí šipek nebo kláves `W`, `A`, `S`, `D`:
   - `Šipka nahoru` nebo `W`: Pohyb nahoru
   - `Šipka dolů` nebo `S`: Pohyb dolů
   - `Šipka vlevo` nebo `A`: Pohyb vlevo
   - `Šipka vpravo` nebo `D`: Pohyb vpravo
5. Hra končí, když se had srazí se zdí nebo sám se sebou.
6. Vaše skóre je po ukončení hry uloženo na server.
7. Klikněte na tlačítko "Restart" pro opětovné hraní.

## Herní Mechanika
- Had začíná s délkou 2.
- Jedením jablka se had prodlužuje a skóre se zvyšuje.
- Rychlost hry se zvyšuje se zvyšujícím se skóre:
  - Skóre > 5: Rychlost = 9
  - Skóre > 10: Rychlost = 11

## Struktura Kódu
- **HTML Elementy**
  - `canvas`: Plátno, kde se hra vykresluje.
  - `playerNameInput`: Vstupní pole pro zadání jména hráče.
  - `startButton`: Tlačítko pro zahájení hry.
  - `restartButton`: Tlačítko pro restartování hry.
  - `highScoreList`: Tabulka pro zobrazení vysokých skóre.

- **JavaScript Proměnné a Funkce**
  - `SnakePart`: Třída pro reprezentaci části hada.
  - `speed`: Rychlost hry.
  - `tileCount`, `tileSize`: Počet a velikost dlaždic na herní ploše.
  - `headX`, `headY`: Pozice hlavy hada.
  - `snakeParts`: Pole částí hada.
  - `tailLength`: Délka ocasu hada.
  - `appleX`, `appleY`: Pozice jablka.
  - `inputsXVelocity`, `inputsYVelocity`: Vstupní rychlosti pohybu hada.
  - `xVelocity`, `yVelocity`: Rychlosti pohybu hada.
  - `score`: Skóre hráče.
  - `playerName`: Jméno hráče.
  - `gulpSound`: Zvuk při sebrání jablka.

- **Hlavní Funkce**
  - `drawGame()`: Hlavní funkce pro vykreslování hry.
  - `isGameOver()`: Kontrola, zda hra skončila.
  - `saveScore(score)`: Uložení skóre na server.
  - `drawScore()`: Vykreslení skóre na plátně.
  - `clearScreen()`: Vyčištění plátna.
  - `drawSnake()`: Vykreslení hada.
  - `changeSnakePosition()`: Změna pozice hada.
  - `drawApple()`: Vykreslení jablka.
  - `checkAppleCollision()`: Kontrola kolize hada s jablkem.
  - `keyDown(event)`: Ovládání pohybu hada pomocí klávesnice.
  - `loadHighScores()`: Načtení vysokých skóre ze serveru.
  - `restartGame()`: Restartování hry.
.

