export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'workout' | 'strength' | 'endurance' | 'consistency' | 'social' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  points: number;
  isUnlocked: boolean;
  unlockedAt?: Date;
  progress: number;
  maxProgress: number;
  requirements: AchievementRequirement[];
}

export interface AchievementRequirement {
  type: 'workouts_completed' | 'streak_days' | 'total_calories' | 'weight_lifted' | 'distance_covered' | 'social_interactions';
  value: number;
  current: number;
}

export interface Mission {
  id: string;
  name: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly' | 'special';
  category: 'workout' | 'nutrition' | 'social' | 'exploration';
  reward: {
    points: number;
    coins: number;
    experience: number;
    items?: string[];
  };
  progress: number;
  maxProgress: number;
  isCompleted: boolean;
  expiresAt: Date;
  requirements: MissionRequirement[];
}

export interface MissionRequirement {
  type: 'complete_workouts' | 'burn_calories' | 'log_meals' | 'invite_friends' | 'share_progress';
  value: number;
  current: number;
}

export interface Level {
  level: number;
  name: string;
  experienceRequired: number;
  rewards: {
    coins: number;
    items: string[];
    badges: string[];
  };
  isUnlocked: boolean;
}

export interface UserStats {
  level: number;
  experience: number;
  coins: number;
  totalPoints: number;
  achievementsUnlocked: number;
  missionsCompleted: number;
  currentStreak: number;
  longestStreak: number;
  totalWorkouts: number;
  totalCalories: number;
  totalDistance: number;
  totalWeightLifted: number;
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar: string;
  level: number;
  points: number;
  achievements: number;
  streak: number;
  rank: number;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  type: 'challenge' | 'tournament' | 'seasonal' | 'community';
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  participants: number;
  maxParticipants: number;
  rewards: {
    points: number;
    coins: number;
    items: string[];
    badges: string[];
  };
  leaderboard: LeaderboardEntry[];
}

class GamificationService {
  private achievements: Map<string, Achievement> = new Map();
  private missions: Map<string, Mission> = new Map();
  private levels: Level[] = [];
  private events: Map<string, Event> = new Map();
  private userStats: UserStats;
  private leaderboard: LeaderboardEntry[] = [];

  constructor() {
    this.initializeAchievements();
    this.initializeMissions();
    this.initializeLevels();
    this.initializeEvents();
    this.loadUserStats();
    this.generateLeaderboard();
  }

  private initializeAchievements() {
    const achievements: Achievement[] = [
      {
        id: 'first_workout',
        name: 'Primer Entrenamiento',
        description: 'Completa tu primer entrenamiento',
        icon: '🏋️',
        category: 'workout',
        rarity: 'common',
        points: 10,
        isUnlocked: false,
        progress: 0,
        maxProgress: 1,
        requirements: [
          { type: 'workouts_completed', value: 1, current: 0 }
        ]
      },
      {
        id: 'week_warrior',
        name: 'Guerrero Semanal',
        description: 'Entrena 7 días seguidos',
        icon: '🔥',
        category: 'consistency',
        rarity: 'rare',
        points: 50,
        isUnlocked: false,
        progress: 0,
        maxProgress: 7,
        requirements: [
          { type: 'streak_days', value: 7, current: 0 }
        ]
      },
      {
        id: 'calorie_crusher',
        name: 'Destructor de Calorías',
        description: 'Quema 10,000 calorías en total',
        icon: '💪',
        category: 'endurance',
        rarity: 'epic',
        points: 100,
        isUnlocked: false,
        progress: 0,
        maxProgress: 10000,
        requirements: [
          { type: 'total_calories', value: 10000, current: 0 }
        ]
      },
      {
        id: 'strength_master',
        name: 'Maestro de la Fuerza',
        description: 'Levanta 100,000 kg en total',
        icon: '🏆',
        category: 'strength',
        rarity: 'legendary',
        points: 200,
        isUnlocked: false,
        progress: 0,
        maxProgress: 100000,
        requirements: [
          { type: 'weight_lifted', value: 100000, current: 0 }
        ]
      },
      {
        id: 'social_butterfly',
        name: 'Mariposa Social',
        description: 'Invita a 10 amigos',
        icon: '🦋',
        category: 'social',
        rarity: 'rare',
        points: 75,
        isUnlocked: false,
        progress: 0,
        maxProgress: 10,
        requirements: [
          { type: 'social_interactions', value: 10, current: 0 }
        ]
      },
      {
        id: 'distance_runner',
        name: 'Corredor de Distancia',
        description: 'Corre 100 km en total',
        icon: '🏃',
        category: 'endurance',
        rarity: 'epic',
        points: 150,
        isUnlocked: false,
        progress: 0,
        maxProgress: 100,
        requirements: [
          { type: 'distance_covered', value: 100, current: 0 }
        ]
      }
    ];

    achievements.forEach(achievement => this.achievements.set(achievement.id, achievement));
  }

  private initializeMissions() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);

    const missions: Mission[] = [
      {
        id: 'daily_workout',
        name: 'Entrenamiento Diario',
        description: 'Completa un entrenamiento hoy',
        type: 'daily',
        category: 'workout',
        reward: { points: 20, coins: 10, experience: 50 },
        progress: 0,
        maxProgress: 1,
        isCompleted: false,
        expiresAt: tomorrow,
        requirements: [
          { type: 'complete_workouts', value: 1, current: 0 }
        ]
      },
      {
        id: 'weekly_calories',
        name: 'Quemador Semanal',
        description: 'Quema 2,000 calorías esta semana',
        type: 'weekly',
        category: 'workout',
        reward: { points: 100, coins: 50, experience: 200 },
        progress: 0,
        maxProgress: 2000,
        isCompleted: false,
        expiresAt: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
        requirements: [
          { type: 'burn_calories', value: 2000, current: 0 }
        ]
      },
      {
        id: 'nutrition_logger',
        name: 'Registrador de Nutrición',
        description: 'Registra 3 comidas hoy',
        type: 'daily',
        category: 'nutrition',
        reward: { points: 15, coins: 5, experience: 30 },
        progress: 0,
        maxProgress: 3,
        isCompleted: false,
        expiresAt: tomorrow,
        requirements: [
          { type: 'log_meals', value: 3, current: 0 }
        ]
      },
      {
        id: 'social_sharer',
        name: 'Compartidor Social',
        description: 'Comparte tu progreso 2 veces',
        type: 'weekly',
        category: 'social',
        reward: { points: 30, coins: 15, experience: 75 },
        progress: 0,
        maxProgress: 2,
        isCompleted: false,
        expiresAt: new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000),
        requirements: [
          { type: 'share_progress', value: 2, current: 0 }
        ]
      }
    ];

    missions.forEach(mission => this.missions.set(mission.id, mission));
  }

  private initializeLevels() {
    this.levels = Array.from({ length: 50 }, (_, i) => ({
      level: i + 1,
      name: this.getLevelName(i + 1),
      experienceRequired: (i + 1) * 1000,
      rewards: {
        coins: (i + 1) * 10,
        items: this.getLevelItems(i + 1),
        badges: this.getLevelBadges(i + 1)
      },
      isUnlocked: false
    }));
  }

  private getLevelName(level: number): string {
    const names = [
      'Novato', 'Principiante', 'Aprendiz', 'Entusiasta', 'Dedicado',
      'Comprometido', 'Motivado', 'Energético', 'Determinado', 'Fuerte',
      'Resistente', 'Veloz', 'Ágil', 'Flexible', 'Equilibrado',
      'Centrado', 'Focado', 'Disciplinado', 'Consistente', 'Perseverante',
      'Inquebrantable', 'Indomable', 'Imparable', 'Invicto', 'Legendario',
      'Mítico', 'Épico', 'Supremo', 'Maestro', 'Campeón',
      'Gigante', 'Titán', 'Héroe', 'Guerrero', 'Paladín',
      'Caballero', 'Mago', 'Arquero', 'Asesino', 'Monje',
      'Druida', 'Chamán', 'Brujo', 'Necromante', 'Demonio',
      'Ángel', 'Dios', 'Titan', 'Primordial', 'Infinito'
    ];
    return names[Math.min(level - 1, names.length - 1)];
  }

  private getLevelItems(level: number): string[] {
    const items: string[] = [];
    if (level % 5 === 0) items.push('Caja de Recompensas');
    if (level % 10 === 0) items.push('Caja Épica');
    if (level % 25 === 0) items.push('Caja Legendaria');
    return items;
  }

  private getLevelBadges(level: number): string[] {
    const badges: string[] = [];
    if (level >= 10) badges.push('Bronce');
    if (level >= 25) badges.push('Plata');
    if (level >= 50) badges.push('Oro');
    if (level >= 100) badges.push('Diamante');
    return badges;
  }

  private initializeEvents() {
    const events: Event[] = [
      {
        id: 'summer_challenge',
        name: 'Desafío de Verano',
        description: 'Completa 30 entrenamientos en 30 días',
        type: 'challenge',
        startDate: new Date(),
        endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isActive: true,
        participants: 1250,
        maxParticipants: 5000,
        rewards: {
          points: 500,
          coins: 250,
          items: ['Camiseta Exclusiva', 'Medalla de Verano'],
          badges: ['Verano 2024']
        },
        leaderboard: []
      },
      {
        id: 'strength_tournament',
        name: 'Torneo de Fuerza',
        description: 'Compite por el mayor peso total levantado',
        type: 'tournament',
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        isActive: true,
        participants: 850,
        maxParticipants: 1000,
        rewards: {
          points: 300,
          coins: 150,
          items: ['Cinturón de Peso', 'Trofeo de Fuerza'],
          badges: ['Rey de la Fuerza']
        },
        leaderboard: []
      }
    ];

    events.forEach(event => this.events.set(event.id, event));
  }

  private loadUserStats() {
    try {
      const stored = localStorage.getItem('userGamificationStats');
      if (stored) {
        this.userStats = JSON.parse(stored);
      } else {
        this.userStats = {
          level: 1,
          experience: 0,
          coins: 100,
          totalPoints: 0,
          achievementsUnlocked: 0,
          missionsCompleted: 0,
          currentStreak: 0,
          longestStreak: 0,
          totalWorkouts: 0,
          totalCalories: 0,
          totalDistance: 0,
          totalWeightLifted: 0
        };
      }
    } catch (error) {
      console.error('Error loading user stats:', error);
      this.userStats = {
        level: 1,
        experience: 0,
        coins: 100,
        totalPoints: 0,
        achievementsUnlocked: 0,
        missionsCompleted: 0,
        currentStreak: 0,
        longestStreak: 0,
        totalWorkouts: 0,
        totalCalories: 0,
        totalDistance: 0,
        totalWeightLifted: 0
      };
    }
  }

  private saveUserStats() {
    try {
      localStorage.setItem('userGamificationStats', JSON.stringify(this.userStats));
    } catch (error) {
      console.error('Error saving user stats:', error);
    }
  }

  private generateLeaderboard() {
    this.leaderboard = [
      { userId: '1', username: 'FitnessKing', avatar: '👑', level: 45, points: 12500, achievements: 28, streak: 45, rank: 1 },
      { userId: '2', username: 'IronWoman', avatar: '💪', level: 42, points: 11800, achievements: 25, streak: 38, rank: 2 },
      { userId: '3', username: 'SpeedDemon', avatar: '🏃', level: 39, points: 11200, achievements: 23, streak: 42, rank: 3 },
      { userId: '4', username: 'GymRat', avatar: '🐀', level: 36, points: 10500, achievements: 21, streak: 35, rank: 4 },
      { userId: '5', username: 'CardioQueen', avatar: '❤️', level: 33, points: 9800, achievements: 19, streak: 31, rank: 5 },
      { userId: '6', username: 'StrengthBeast', avatar: '🦁', level: 30, points: 9200, achievements: 18, streak: 28, rank: 6 },
      { userId: '7', username: 'FlexMaster', avatar: '🧘', level: 27, points: 8700, achievements: 16, streak: 25, rank: 7 },
      { userId: '8', username: 'EnduranceElite', avatar: '🏃‍♂️', level: 24, points: 8200, achievements: 15, streak: 22, rank: 8 },
      { userId: '9', username: 'PowerLifter', avatar: '🏋️‍♂️', level: 21, points: 7800, achievements: 14, streak: 19, rank: 9 },
      { userId: '10', username: 'YogaGuru', avatar: '🧘‍♀️', level: 18, points: 7400, achievements: 12, streak: 16, rank: 10 }
    ];
  }

  // Achievement Management
  getAchievements(): Achievement[] {
    return Array.from(this.achievements.values());
  }

  getUnlockedAchievements(): Achievement[] {
    return Array.from(this.achievements.values()).filter(a => a.isUnlocked);
  }

  getAchievementById(id: string): Achievement | undefined {
    return this.achievements.get(id);
  }

  updateAchievementProgress(achievementId: string, progress: number): boolean {
    const achievement = this.achievements.get(achievementId);
    if (!achievement || achievement.isUnlocked) return false;

    achievement.progress = Math.min(progress, achievement.maxProgress);
    
    if (achievement.progress >= achievement.maxProgress && !achievement.isUnlocked) {
      this.unlockAchievement(achievementId);
      return true;
    }

    return false;
  }

  private unlockAchievement(achievementId: string): void {
    const achievement = this.achievements.get(achievementId);
    if (!achievement || achievement.isUnlocked) return;

    achievement.isUnlocked = true;
    achievement.unlockedAt = new Date();
    this.userStats.achievementsUnlocked++;
    this.userStats.totalPoints += achievement.points;
    this.addExperience(achievement.points);

    // Show notification
    this.showAchievementNotification(achievement);
  }

  private showAchievementNotification(achievement: Achievement): void {
    // This would integrate with the notification service
    console.log(`🎉 ¡Logro desbloqueado: ${achievement.name}!`);
  }

  // Mission Management
  getMissions(): Mission[] {
    return Array.from(this.missions.values());
  }

  getActiveMissions(): Mission[] {
    return Array.from(this.missions.values()).filter(m => !m.isCompleted && new Date() < m.expiresAt);
  }

  getMissionById(id: string): Mission | undefined {
    return this.missions.get(id);
  }

  updateMissionProgress(missionId: string, progress: number): boolean {
    const mission = this.missions.get(missionId);
    if (!mission || mission.isCompleted) return false;

    mission.progress = Math.min(progress, mission.maxProgress);
    
    if (mission.progress >= mission.maxProgress && !mission.isCompleted) {
      this.completeMission(missionId);
      return true;
    }

    return false;
  }

  private completeMission(missionId: string): void {
    const mission = this.missions.get(missionId);
    if (!mission || mission.isCompleted) return;

    mission.isCompleted = true;
    this.userStats.missionsCompleted++;
    this.userStats.totalPoints += mission.reward.points;
    this.userStats.coins += mission.reward.coins;
    this.addExperience(mission.reward.experience);

    // Show notification
    this.showMissionNotification(mission);
  }

  private showMissionNotification(mission: Mission): void {
    console.log(`✅ ¡Misión completada: ${mission.name}!`);
  }

  // Level Management
  getLevels(): Level[] {
    return this.levels;
  }

  getCurrentLevel(): Level {
    return this.levels.find(l => l.level === this.userStats.level) || this.levels[0];
  }

  getNextLevel(): Level | null {
    const nextLevel = this.levels.find(l => l.level === this.userStats.level + 1);
    return nextLevel || null;
  }

  addExperience(amount: number): void {
    this.userStats.experience += amount;
    
    // Check for level up
    const nextLevel = this.getNextLevel();
    if (nextLevel && this.userStats.experience >= nextLevel.experienceRequired) {
      this.levelUp();
    }

    this.saveUserStats();
  }

  private levelUp(): void {
    const currentLevel = this.getCurrentLevel();
    const nextLevel = this.getNextLevel();
    
    if (!nextLevel) return;

    this.userStats.level = nextLevel.level;
    this.userStats.coins += nextLevel.rewards.coins;
    
    // Unlock level rewards
    nextLevel.isUnlocked = true;

    // Show level up notification
    this.showLevelUpNotification(nextLevel);
  }

  private showLevelUpNotification(level: Level): void {
    console.log(`🎊 ¡Subiste al nivel ${level.level}: ${level.name}!`);
  }

  // Event Management
  getEvents(): Event[] {
    return Array.from(this.events.values());
  }

  getActiveEvents(): Event[] {
    return Array.from(this.events.values()).filter(e => e.isActive && new Date() < e.endDate);
  }

  joinEvent(eventId: string): boolean {
    const event = this.events.get(eventId);
    if (!event || !event.isActive || event.participants >= event.maxParticipants) return false;

    event.participants++;
    return true;
  }

  // Leaderboard
  getLeaderboard(): LeaderboardEntry[] {
    return this.leaderboard;
  }

  getUserRank(): number {
    // Simulate user rank based on stats
    const userPoints = this.userStats.totalPoints;
    const rank = this.leaderboard.findIndex(entry => entry.points < userPoints);
    return rank === -1 ? this.leaderboard.length + 1 : rank + 1;
  }

  // Stats Management
  getUserStats(): UserStats {
    return { ...this.userStats };
  }

  updateStats(stats: Partial<UserStats>): void {
    this.userStats = { ...this.userStats, ...stats };
    this.saveUserStats();
  }

  addCoins(amount: number): void {
    this.userStats.coins += amount;
    this.saveUserStats();
  }

  spendCoins(amount: number): boolean {
    if (this.userStats.coins >= amount) {
      this.userStats.coins -= amount;
      this.saveUserStats();
      return true;
    }
    return false;
  }

  // Streak Management
  updateStreak(): void {
    // This would be called daily to check if user maintained streak
    const today = new Date().toDateString();
    const lastWorkoutDate = localStorage.getItem('lastWorkoutDate');
    
    if (lastWorkoutDate === today) {
      // User already worked out today
      return;
    }

    if (lastWorkoutDate === new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString()) {
      // User worked out yesterday, continue streak
      this.userStats.currentStreak++;
      if (this.userStats.currentStreak > this.userStats.longestStreak) {
        this.userStats.longestStreak = this.userStats.currentStreak;
      }
    } else {
      // Streak broken
      this.userStats.currentStreak = 1;
    }

    localStorage.setItem('lastWorkoutDate', today);
    this.saveUserStats();
  }

  // Daily Rewards
  getDailyReward(): { coins: number; experience: number; streak: number } {
    const streak = this.userStats.currentStreak;
    const baseCoins = 10;
    const baseExperience = 25;
    
    return {
      coins: baseCoins + Math.floor(streak / 7) * 5,
      experience: baseExperience + Math.floor(streak / 7) * 10,
      streak: streak
    };
  }

  claimDailyReward(): boolean {
    const today = new Date().toDateString();
    const lastClaimDate = localStorage.getItem('lastDailyRewardClaim');
    
    if (lastClaimDate === today) {
      return false; // Already claimed today
    }

    const reward = this.getDailyReward();
    this.userStats.coins += reward.coins;
    this.addExperience(reward.experience);
    
    localStorage.setItem('lastDailyRewardClaim', today);
    this.saveUserStats();
    
    return true;
  }

  // Progress Tracking
  recordWorkout(calories: number, distance: number, weightLifted: number): void {
    this.userStats.totalWorkouts++;
    this.userStats.totalCalories += calories;
    this.userStats.totalDistance += distance;
    this.userStats.totalWeightLifted += weightLifted;
    
    this.updateStreak();
    this.checkAchievements();
    this.checkMissions();
    
    this.saveUserStats();
  }

  private checkAchievements(): void {
    // Check achievements based on current stats
    this.updateAchievementProgress('first_workout', this.userStats.totalWorkouts);
    this.updateAchievementProgress('week_warrior', this.userStats.currentStreak);
    this.updateAchievementProgress('calorie_crusher', this.userStats.totalCalories);
    this.updateAchievementProgress('strength_master', this.userStats.totalWeightLifted);
    this.updateAchievementProgress('distance_runner', this.userStats.totalDistance);
  }

  private checkMissions(): void {
    // Check missions based on current stats
    this.updateMissionProgress('daily_workout', 1);
    this.updateMissionProgress('weekly_calories', this.userStats.totalCalories);
  }
}

const gamificationService = new GamificationService();
export default gamificationService;
