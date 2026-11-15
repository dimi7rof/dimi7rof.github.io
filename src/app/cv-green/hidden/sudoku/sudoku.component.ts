import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'sudoku',
  standalone: true,
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css'],
  imports: [CommonModule, FormsModule],
})
export class SudokuComponent {
  board: number[][] = [];
  difficulty: string = 'easy';
  results: Array<{ date: string; difficulty: string; time: number }> = [];
  startTime: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadResults();
    this.loadBoard();
    if (!this.board || this.board.length === 0) {
      this.newGame();
    }
    this.startTime = Date.now();
  }

  // Generate puzzle based on difficulty
  generateSudokuPuzzle(difficulty: string): number[][] {
    const solution = this.generateFullBoard();
    const puzzle = solution.map((row) => [...row]);
    let cellsToRemove =
      difficulty === 'easy' ? 35 : difficulty === 'medium' ? 45 : 55;
    while (cellsToRemove > 0) {
      const i = Math.floor(Math.random() * 9);
      const j = Math.floor(Math.random() * 9);
      if (puzzle[i][j] !== 0) {
        puzzle[i][j] = 0;
        cellsToRemove--;
      }
    }
    return puzzle;
  }

  onDifficultyChange() {
    this.newGame();
  }

  newGame() {
    this.board = this.generateSudokuPuzzle(this.difficulty);
    this.saveBoard();
    this.startTime = Date.now();
  }

  saveBoard() {
    localStorage.setItem('sudokuBoard', JSON.stringify(this.board));
    localStorage.setItem('sudokuDifficulty', this.difficulty);
  }

  loadBoard() {
    const board = localStorage.getItem('sudokuBoard');
    const difficulty = localStorage.getItem('sudokuDifficulty');
    if (board) {
      this.board = JSON.parse(board);
    }
    if (difficulty) {
      this.difficulty = difficulty;
    }
  }

  saveResult() {
    const time = Math.floor((Date.now() - this.startTime) / 1000);
    this.results.push({
      date: new Date().toISOString(),
      difficulty: this.difficulty,
      time,
    });
    localStorage.setItem('sudokuResults', JSON.stringify(this.results));
  }

  loadResults() {
    const results = localStorage.getItem('sudokuResults');
    if (results) {
      this.results = JSON.parse(results);
    }
  }

  // Backtracking Sudoku board generator
  generateFullBoard(): number[][] {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));
    this.fillBoard(board, 0, 0);
    return board;
  }

  fillBoard(board: number[][], row: number, col: number): boolean {
    if (row === 9) return true;
    const nextRow = col === 8 ? row + 1 : row;
    const nextCol = col === 8 ? 0 : col + 1;
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9].sort(() => Math.random() - 0.5);
    for (const num of nums) {
      if (this.isSafe(board, row, col, num)) {
        board[row][col] = num;
        if (this.fillBoard(board, nextRow, nextCol)) return true;
        board[row][col] = 0;
      }
    }
    return false;
  }

  isSafe(board: number[][], row: number, col: number, num: number): boolean {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num || board[x][col] === num) return false;
    }
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[startRow + i][startCol + j] === num) return false;
      }
    }
    return true;
  }

  isEditable(row: number, col: number): boolean {
    return this.board[row][col] === 0;
  }

  onInput(event: any, row: number, col: number) {
    const value = Number(event.target.value);
    if (value >= 1 && value <= 9) {
      this.board[row][col] = value;
      this.saveBoard();
      if (this.isCompleted()) {
        this.saveResult();
        alert('Congratulations! You solved the puzzle.');
      }
    } else {
      this.board[row][col] = 0;
      this.saveBoard();
    }
  }

  isCompleted(): boolean {
    // Check if all cells are filled and valid
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (
          this.board[i][j] === 0 ||
          !this.isSafe(this.board, i, j, this.board[i][j])
        ) {
          return false;
        }
      }
    }
    return true;
  }
  back() {
    this.router.navigate(['/']);
  }
}
