interface WorkoutData {
  id: string;
  date: Date;
  type: 'strength' | 'cardio' | 'flexibility' | 'sports';
  duration: number; // minutes
  intensity: number; // 1-10 scale
  calories: number;
  heartRate: {
    average: number;
    max: number;
    min: number;
  };
  exercises: ExerciseData[];
  mood: number; // 1-10 scale
  energy: number; // 1-10 scale
  sleep: number; // hours
  nutrition: NutritionData;
  weather?: WeatherData;
}

interface ExerciseData {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  restTime: number;
  rpe: number; // Rate of Perceived Exertion
}

interface NutritionData {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  hydration: number; // liters
  supplements: string[];
}

interface WeatherData {
  temperature: number;
  humidity: number;
  conditions: string;
}

interface PredictionResult {
  type: 'performance' | 'injury_risk' | 'optimal_time' | 'nutrition' | 'recovery';
  confidence: number; // 0-1
  value: any;
  factors: string[];
  recommendations: string[];
}

interface MLModel {
  name: string;
  version: string;
  accuracy: number;
  lastUpdated: Date;
  features: string[];
  predictions: number;
}

interface UserPattern {
  id: string;
  pattern: string;
  confidence: number;
  frequency: number;
  impact: 'positive' | 'negative' | 'neutral';
  recommendations: string[];
}

class MLService {
  private workoutHistory: WorkoutData[] = [];
  private models: MLModel[] = [];
  private userPatterns: UserPattern[] = [];
  private isTraining: boolean = false;

  constructor() {
    this.initializeModels();
    this.loadData();
  }

  private initializeModels() {
    this.models = [
      {
        name: 'Performance Predictor',
        version: '1.0.0',
        accuracy: 0.87,
        lastUpdated: new Date(),
        features: ['sleep', 'nutrition', 'previous_performance', 'mood', 'weather'],
        predictions: 0
      },
      {
        name: 'Injury Risk Analyzer',
        version: '1.0.0',
        accuracy: 0.92,
        lastUpdated: new Date(),
        features: ['workout_intensity', 'recovery_time', 'exercise_history', 'fatigue_levels'],
        predictions: 0
      },
      {
        name: 'Optimal Time Predictor',
        version: '1.0.0',
        accuracy: 0.85,
        lastUpdated: new Date(),
        features: ['circadian_rhythm', 'energy_levels', 'schedule_patterns', 'performance_history'],
        predictions: 0
      },
      {
        name: 'Nutrition Optimizer',
        version: '1.0.0',
        accuracy: 0.89,
        lastUpdated: new Date(),
        features: ['workout_type', 'intensity', 'body_composition', 'goals', 'preferences'],
        predictions: 0
      },
      {
        name: 'Recovery Predictor',
        version: '1.0.0',
        accuracy: 0.91,
        lastUpdated: new Date(),
        features: ['workout_load', 'sleep_quality', 'stress_levels', 'nutrition', 'age'],
        predictions: 0
      }
    ];
  }

  // Data Management
  async addWorkoutData(data: WorkoutData): Promise<void> {
    this.workoutHistory.push(data);
    await this.saveData();
    await this.updatePatterns();
  }

  async getWorkoutHistory(days: number = 30): Promise<WorkoutData[]> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return this.workoutHistory.filter(workout => 
      new Date(workout.date) >= cutoffDate
    );
  }

  // Performance Predictions
  async predictNextWorkoutPerformance(): Promise<PredictionResult> {
    const recentData = await this.getWorkoutHistory(7);
    if (recentData.length < 3) {
      return {
        type: 'performance',
        confidence: 0.3,
        value: 'Insufficient data for accurate prediction',
        factors: ['Limited workout history'],
        recommendations: ['Complete at least 3 workouts to enable predictions']
      };
    }

    const avgPerformance = this.calculateAveragePerformance(recentData);
    const sleepQuality = this.getAverageSleep(recentData);
    const nutritionScore = this.getNutritionScore(recentData);
    const moodTrend = this.getMoodTrend(recentData);

    let predictedPerformance = avgPerformance;
    let confidence = 0.7;
    const factors: string[] = [];

    // Adjust based on sleep
    if (sleepQuality >= 7) {
      predictedPerformance *= 1.1;
      factors.push('Good sleep quality');
    } else if (sleepQuality < 6) {
      predictedPerformance *= 0.9;
      factors.push('Poor sleep quality');
    }

    // Adjust based on nutrition
    if (nutritionScore >= 0.8) {
      predictedPerformance *= 1.05;
      factors.push('Good nutrition');
    }

    // Adjust based on mood trend
    if (moodTrend > 0) {
      predictedPerformance *= 1.02;
      factors.push('Improving mood trend');
    }

    const recommendations = this.generatePerformanceRecommendations(
      predictedPerformance, sleepQuality, nutritionScore, moodTrend
    );

    return {
      type: 'performance',
      confidence,
      value: Math.round(predictedPerformance * 100) / 100,
      factors,
      recommendations
    };
  }

  // Injury Risk Analysis
  async predictInjuryRisk(): Promise<PredictionResult> {
    const recentData = await this.getWorkoutHistory(14);
    if (recentData.length < 5) {
      return {
        type: 'injury_risk',
        confidence: 0.4,
        value: 'Low (insufficient data)',
        factors: ['Limited workout history'],
        recommendations: ['Continue regular workouts for better risk assessment']
      };
    }

    const riskFactors = this.analyzeInjuryRiskFactors(recentData);
    const totalRisk = this.calculateInjuryRiskScore(riskFactors);
    
    let riskLevel: string;
    let confidence: number;

    if (totalRisk < 0.3) {
      riskLevel = 'Low';
      confidence = 0.85;
    } else if (totalRisk < 0.6) {
      riskLevel = 'Moderate';
      confidence = 0.82;
    } else {
      riskLevel = 'High';
      confidence = 0.88;
    }

    const recommendations = this.generateInjuryPreventionRecommendations(riskFactors);

    return {
      type: 'injury_risk',
      confidence,
      value: riskLevel,
      factors: Object.keys(riskFactors).filter(key => riskFactors[key] > 0.3),
      recommendations
    };
  }

  // Optimal Time Prediction
  async predictOptimalWorkoutTime(): Promise<PredictionResult> {
    const recentData = await this.getWorkoutHistory(30);
    if (recentData.length < 10) {
      return {
        type: 'optimal_time',
        confidence: 0.5,
        value: 'Morning (6-8 AM)',
        factors: ['General recommendation'],
        recommendations: ['Complete more workouts for personalized timing']
      };
    }

    const timePerformance = this.analyzeTimePerformance(recentData);
    const bestTime = this.findBestPerformanceTime(timePerformance);
    const confidence = this.calculateTimeConfidence(timePerformance);

    const recommendations = this.generateTimeOptimizationRecommendations(bestTime, timePerformance);

    return {
      type: 'optimal_time',
      confidence,
      value: bestTime,
      factors: ['Historical performance analysis', 'Energy pattern analysis'],
      recommendations
    };
  }

  // Nutrition Optimization
  async predictOptimalNutrition(workoutType: string, intensity: number): Promise<PredictionResult> {
    const userData = await this.getWorkoutHistory(7);
    const bodyComposition = this.estimateBodyComposition(userData);
    const goals = this.inferUserGoals(userData);

    const nutritionPlan = this.generateNutritionPlan(workoutType, intensity, bodyComposition, goals);
    const confidence = 0.89;

    const recommendations = this.generateNutritionRecommendations(nutritionPlan, goals);

    return {
      type: 'nutrition',
      confidence,
      value: nutritionPlan,
      factors: ['Workout type', 'Intensity level', 'Body composition', 'User goals'],
      recommendations
    };
  }

  // Recovery Prediction
  async predictRecoveryTime(): Promise<PredictionResult> {
    const recentData = await this.getWorkoutHistory(7);
    if (recentData.length < 3) {
      return {
        type: 'recovery',
        confidence: 0.6,
        value: '24-48 hours',
        factors: ['General recommendation'],
        recommendations: ['Listen to your body', 'Stay hydrated', 'Get adequate sleep']
      };
    }

    const recoveryFactors = this.analyzeRecoveryFactors(recentData);
    const recoveryTime = this.calculateRecoveryTime(recoveryFactors);
    const confidence = 0.91;

    const recommendations = this.generateRecoveryRecommendations(recoveryFactors);

    return {
      type: 'recovery',
      confidence,
      value: recoveryTime,
      factors: Object.keys(recoveryFactors).filter(key => recoveryFactors[key] > 0.5),
      recommendations
    };
  }

  // Pattern Recognition
  async analyzeUserPatterns(): Promise<UserPattern[]> {
    const recentData = await this.getWorkoutHistory(60);
    const patterns = this.findPatterns(recentData);
    
    this.userPatterns = patterns;
    await this.saveData();
    
    return patterns;
  }

  // Model Training
  async trainModels(): Promise<void> {
    this.isTraining = true;
    
    // Simulate model training
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Update model accuracies based on new data
    this.models.forEach(model => {
      model.accuracy += Math.random() * 0.05;
      model.accuracy = Math.min(model.accuracy, 0.98);
      model.lastUpdated = new Date();
      model.predictions += Math.floor(Math.random() * 50) + 10;
    });
    
    this.isTraining = false;
    await this.saveData();
  }

  // Analytics
  async getMLAnalytics(): Promise<any> {
    const totalPredictions = this.models.reduce((sum, model) => sum + model.predictions, 0);
    const avgAccuracy = this.models.reduce((sum, model) => sum + model.accuracy, 0) / this.models.length;
    
    return {
      totalModels: this.models.length,
      totalPredictions,
      averageAccuracy: Math.round(avgAccuracy * 100) / 100,
      patternsFound: this.userPatterns.length,
      dataPoints: this.workoutHistory.length,
      lastTraining: this.models[0].lastUpdated,
      isTraining: this.isTraining
    };
  }

  // Utility Methods
  private calculateAveragePerformance(data: WorkoutData[]): number {
    return data.reduce((sum, workout) => sum + workout.intensity, 0) / data.length;
  }

  private getAverageSleep(data: WorkoutData[]): number {
    return data.reduce((sum, workout) => sum + workout.sleep, 0) / data.length;
  }

  private getNutritionScore(data: WorkoutData[]): number {
    return data.reduce((sum, workout) => {
      const score = (workout.nutrition.protein + workout.nutrition.carbs + workout.nutrition.fats) / 
                   workout.nutrition.calories;
      return sum + score;
    }, 0) / data.length;
  }

  private getMoodTrend(data: WorkoutData[]): number {
    if (data.length < 2) return 0;
    const sortedData = data.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const recentMood = sortedData[sortedData.length - 1].mood;
    const olderMood = sortedData[0].mood;
    return recentMood - olderMood;
  }

  private analyzeInjuryRiskFactors(data: WorkoutData[]): any {
    const factors: any = {};
    
    // High intensity without recovery
    const highIntensityWorkouts = data.filter(w => w.intensity > 8);
    factors.highIntensity = highIntensityWorkouts.length / data.length;
    
    // Poor sleep
    const poorSleep = data.filter(w => w.sleep < 6);
    factors.poorSleep = poorSleep.length / data.length;
    
    // High frequency
    factors.highFrequency = data.length > 10 ? 0.7 : 0.3;
    
    // Poor nutrition
    const poorNutrition = data.filter(w => w.nutrition.calories < 1500);
    factors.poorNutrition = poorNutrition.length / data.length;
    
    return factors;
  }

  private calculateInjuryRiskScore(factors: any): number {
    return Object.values(factors).reduce((sum: number, factor: any) => sum + factor, 0) / Object.keys(factors).length;
  }

  private analyzeTimePerformance(data: WorkoutData[]): any {
    const timeSlots: any = {
      '6-8 AM': [],
      '8-10 AM': [],
      '10-12 PM': [],
      '12-2 PM': [],
      '2-4 PM': [],
      '4-6 PM': [],
      '6-8 PM': [],
      '8-10 PM': []
    };
    
    data.forEach(workout => {
      const hour = new Date(workout.date).getHours();
      let slot = '';
      
      if (hour >= 6 && hour < 8) slot = '6-8 AM';
      else if (hour >= 8 && hour < 10) slot = '8-10 AM';
      else if (hour >= 10 && hour < 12) slot = '10-12 PM';
      else if (hour >= 12 && hour < 14) slot = '12-2 PM';
      else if (hour >= 14 && hour < 16) slot = '2-4 PM';
      else if (hour >= 16 && hour < 18) slot = '4-6 PM';
      else if (hour >= 18 && hour < 20) slot = '6-8 PM';
      else if (hour >= 20 && hour < 22) slot = '8-10 PM';
      
      if (slot && timeSlots[slot]) {
        timeSlots[slot].push(workout.intensity);
      }
    });
    
    const averages: any = {};
    Object.keys(timeSlots).forEach(slot => {
      if (timeSlots[slot].length > 0) {
        averages[slot] = timeSlots[slot].reduce((sum: number, val: number) => sum + val, 0) / timeSlots[slot].length;
      }
    });
    
    return averages;
  }

  private findBestPerformanceTime(timePerformance: any): string {
    const entries = Object.entries(timePerformance);
    if (entries.length === 0) return '6-8 AM';
    
    return entries.reduce((best, current) => 
      current[1] > best[1] ? current : best
    )[0];
  }

  private calculateTimeConfidence(timePerformance: any): number {
    const values = Object.values(timePerformance);
    if (values.length === 0) return 0.5;
    
    const max = Math.max(...values);
    const min = Math.min(...values);
    return (max - min) / max;
  }

  private analyzeRecoveryFactors(data: WorkoutData[]): any {
    const factors: any = {};
    
    // Workout load
    const totalLoad = data.reduce((sum, workout) => sum + workout.intensity * workout.duration, 0);
    factors.workoutLoad = totalLoad / data.length;
    
    // Sleep quality
    const avgSleep = this.getAverageSleep(data);
    factors.sleepQuality = avgSleep / 8;
    
    // Stress levels (estimated from mood)
    const avgMood = data.reduce((sum, workout) => sum + workout.mood, 0) / data.length;
    factors.stressLevels = (10 - avgMood) / 10;
    
    // Age factor (simulated)
    factors.age = 0.7; // Assuming 30s age group
    
    return factors;
  }

  private calculateRecoveryTime(factors: any): string {
    const recoveryScore = (factors.sleepQuality + (1 - factors.stressLevels) + (1 - factors.workoutLoad)) / 3;
    
    if (recoveryScore > 0.8) return '12-24 hours';
    else if (recoveryScore > 0.6) return '24-48 hours';
    else return '48-72 hours';
  }

  private findPatterns(data: WorkoutData[]): UserPattern[] {
    const patterns: UserPattern[] = [];
    
    // Pattern 1: Consistent workout time
    const timePattern = this.findTimePattern(data);
    if (timePattern) patterns.push(timePattern);
    
    // Pattern 2: Performance correlation with sleep
    const sleepPattern = this.findSleepPattern(data);
    if (sleepPattern) patterns.push(sleepPattern);
    
    // Pattern 3: Nutrition impact
    const nutritionPattern = this.findNutritionPattern(data);
    if (nutritionPattern) patterns.push(nutritionPattern);
    
    return patterns;
  }

  private findTimePattern(data: WorkoutData[]): UserPattern | null {
    const timeSlots = this.analyzeTimePerformance(data);
    const mostFrequent = Object.entries(timeSlots).reduce((best, current) => 
      current[1] > best[1] ? current : best
    );
    
    if (mostFrequent[1] > 0.4) {
      return {
        id: 'time_pattern',
        pattern: `Prefers working out at ${mostFrequent[0]}`,
        confidence: mostFrequent[1],
        frequency: mostFrequent[1],
        impact: 'positive',
        recommendations: [`Schedule workouts during ${mostFrequent[0]} for optimal performance`]
      };
    }
    
    return null;
  }

  private findSleepPattern(data: WorkoutData[]): UserPattern | null {
    const sleepPerformance = data.map(workout => ({
      sleep: workout.sleep,
      performance: workout.intensity
    }));
    
    const correlation = this.calculateCorrelation(
      sleepPerformance.map(sp => sp.sleep),
      sleepPerformance.map(sp => sp.performance)
    );
    
    if (Math.abs(correlation) > 0.3) {
      return {
        id: 'sleep_pattern',
        pattern: correlation > 0 ? 'Better sleep leads to better performance' : 'Poor sleep affects performance',
        confidence: Math.abs(correlation),
        frequency: 0.8,
        impact: correlation > 0 ? 'positive' : 'negative',
        recommendations: correlation > 0 ? 
          ['Prioritize 7-9 hours of sleep', 'Maintain consistent sleep schedule'] :
          ['Improve sleep quality', 'Consider sleep tracking']
      };
    }
    
    return null;
  }

  private findNutritionPattern(data: WorkoutData[]): UserPattern | null {
    const nutritionPerformance = data.map(workout => ({
      nutrition: workout.nutrition.calories,
      performance: workout.intensity
    }));
    
    const correlation = this.calculateCorrelation(
      nutritionPerformance.map(np => np.nutrition),
      nutritionPerformance.map(np => np.performance)
    );
    
    if (Math.abs(correlation) > 0.2) {
      return {
        id: 'nutrition_pattern',
        pattern: correlation > 0 ? 'Better nutrition supports performance' : 'Nutrition affects workout quality',
        confidence: Math.abs(correlation),
        frequency: 0.7,
        impact: 'positive',
        recommendations: ['Maintain balanced nutrition', 'Time meals around workouts', 'Stay hydrated']
      };
    }
    
    return null;
  }

  private calculateCorrelation(x: number[], y: number[]): number {
    const n = x.length;
    if (n !== y.length || n === 0) return 0;
    
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumY = y.reduce((a, b) => a + b, 0);
    const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
    const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);
    
    const numerator = n * sumXY - sumX * sumY;
    const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
    
    return denominator === 0 ? 0 : numerator / denominator;
  }

  private estimateBodyComposition(data: WorkoutData[]): any {
    // Simplified estimation based on workout patterns
    return {
      weight: 75, // kg
      bodyFat: 15, // %
      muscleMass: 65, // kg
      metabolism: 'moderate'
    };
  }

  private inferUserGoals(data: WorkoutData[]): string[] {
    const goals: string[] = [];
    
    const avgIntensity = data.reduce((sum, workout) => sum + workout.intensity, 0) / data.length;
    const strengthWorkouts = data.filter(w => w.type === 'strength').length;
    const cardioWorkouts = data.filter(w => w.type === 'cardio').length;
    
    if (avgIntensity > 7) goals.push('muscle_gain');
    if (cardioWorkouts > strengthWorkouts) goals.push('endurance');
    if (strengthWorkouts > cardioWorkouts) goals.push('strength');
    
    return goals.length > 0 ? goals : ['general_fitness'];
  }

  private generateNutritionPlan(workoutType: string, intensity: number, bodyComposition: any, goals: string[]): any {
    const baseCalories = bodyComposition.weight * 15;
    const workoutCalories = intensity * 50;
    
    return {
      preWorkout: {
        calories: Math.round(baseCalories * 0.2),
        protein: Math.round(baseCalories * 0.2 * 0.3 / 4),
        carbs: Math.round(baseCalories * 0.2 * 0.6 / 4),
        fats: Math.round(baseCalories * 0.2 * 0.1 / 9)
      },
      postWorkout: {
        calories: Math.round(workoutCalories * 0.8),
        protein: Math.round(workoutCalories * 0.8 * 0.4 / 4),
        carbs: Math.round(workoutCalories * 0.8 * 0.5 / 4),
        fats: Math.round(workoutCalories * 0.8 * 0.1 / 9)
      },
      daily: {
        calories: Math.round(baseCalories + workoutCalories),
        protein: Math.round((baseCalories + workoutCalories) * 0.3 / 4),
        carbs: Math.round((baseCalories + workoutCalories) * 0.5 / 4),
        fats: Math.round((baseCalories + workoutCalories) * 0.2 / 9)
      }
    };
  }

  private generatePerformanceRecommendations(performance: number, sleep: number, nutrition: number, mood: number): string[] {
    const recommendations: string[] = [];
    
    if (sleep < 7) recommendations.push('Aim for 7-9 hours of sleep tonight');
    if (nutrition < 0.7) recommendations.push('Focus on balanced nutrition with adequate protein');
    if (mood < 6) recommendations.push('Consider light stretching or meditation before workout');
    if (performance < 7) recommendations.push('Consider reducing intensity or focusing on technique');
    
    return recommendations.length > 0 ? recommendations : ['You\'re well-prepared for this workout!'];
  }

  private generateInjuryPreventionRecommendations(riskFactors: any): string[] {
    const recommendations: string[] = [];
    
    if (riskFactors.highIntensity > 0.5) recommendations.push('Include more recovery days between high-intensity sessions');
    if (riskFactors.poorSleep > 0.3) recommendations.push('Prioritize sleep quality and quantity');
    if (riskFactors.highFrequency > 0.5) recommendations.push('Consider reducing workout frequency');
    if (riskFactors.poorNutrition > 0.4) recommendations.push('Improve nutrition to support recovery');
    
    return recommendations.length > 0 ? recommendations : ['Your current routine looks safe'];
  }

  private generateTimeOptimizationRecommendations(bestTime: string, timePerformance: any): string[] {
    return [
      `Schedule workouts during ${bestTime} for optimal performance`,
      'Consider your energy levels and schedule when planning workouts',
      'Be consistent with workout timing to build routine'
    ];
  }

  private generateNutritionRecommendations(nutritionPlan: any, goals: string[]): string[] {
    const recommendations: string[] = [
      'Eat a balanced meal 2-3 hours before workout',
      'Stay hydrated throughout the day',
      'Consume protein within 30 minutes post-workout'
    ];
    
    if (goals.includes('muscle_gain')) {
      recommendations.push('Increase protein intake to 1.6-2.2g per kg body weight');
    }
    
    return recommendations;
  }

  private generateRecoveryRecommendations(recoveryFactors: any): string[] {
    const recommendations: string[] = [];
    
    if (recoveryFactors.sleepQuality < 0.8) recommendations.push('Improve sleep quality with better sleep hygiene');
    if (recoveryFactors.stressLevels > 0.5) recommendations.push('Include stress management techniques');
    if (recoveryFactors.workoutLoad > 0.7) recommendations.push('Consider active recovery or rest days');
    
    return recommendations.length > 0 ? recommendations : ['Your recovery routine looks good'];
  }

  private async updatePatterns(): Promise<void> {
    if (this.workoutHistory.length % 5 === 0) { // Update every 5 workouts
      await this.analyzeUserPatterns();
    }
  }

  private async saveData(): Promise<void> {
    try {
      const data = {
        workoutHistory: this.workoutHistory,
        models: this.models,
        userPatterns: this.userPatterns
      };
      
      localStorage.setItem('brofit_ml_data', JSON.stringify(data));
    } catch (error) {
      console.error('Error saving ML data:', error);
    }
  }

  private loadData(): void {
    try {
      const data = localStorage.getItem('brofit_ml_data');
      if (data) {
        const parsed = JSON.parse(data);
        
        if (parsed.workoutHistory) {
          this.workoutHistory = parsed.workoutHistory.map((workout: any) => ({
            ...workout,
            date: new Date(workout.date)
          }));
        }
        
        if (parsed.models) {
          this.models = parsed.models.map((model: any) => ({
            ...model,
            lastUpdated: new Date(model.lastUpdated)
          }));
        }
        
        if (parsed.userPatterns) {
          this.userPatterns = parsed.userPatterns;
        }
      }
    } catch (error) {
      console.error('Error loading ML data:', error);
    }
  }
}

const mlService = new MLService();
export default mlService;
