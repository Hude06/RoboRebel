export class LevelManager {
  constructor() {
    this.levels = [];
    this.currentLevelIndex = 0;
  }

  addLevel(level) {
    this.levels.push(level);
  }

  getCurrentLevel() {
    return this.levels[this.currentLevelIndex];
  }

  goToNextLevel() {
    if (this.currentLevelIndex < this.levels.length - 1) {
      this.currentLevelIndex++;
    } else {
      // Handle game completion or other logic
    }
  }
}
