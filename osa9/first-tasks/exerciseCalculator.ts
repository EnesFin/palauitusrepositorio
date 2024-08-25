interface Result {
    periodLength: number
    trainingDays: number
    success: boolean
    rating: number
    ratingDescription: string
    target: number
    average: number
}


function getRating(average: number, target: number): number  {
    if (average < target * 0.5) 
        return 1;
    if (average < target) 
        return 2;
    return 3;
}

function ratingToDescription(rating: number): string {
    if (rating === 1)
        return '';
    if (rating === 2)
        return 'not too bad but could be better';
    if (rating === 3)
        return '';
    return '';
}

function calculateExercises(hours: Array<number>, dailyTargetHours: number): Result {
    const periodLength = hours.length;
    const trainingDays = hours.filter(h => h > 0).length;
    const target = dailyTargetHours;
    const average = hours.length === 0 ? 0 : hours.reduce((prev, curr) => prev + curr, 0) / hours.length;
    const success = average >= dailyTargetHours;
    const rating = getRating(average, dailyTargetHours);
    const ratingDescription = ratingToDescription(rating);
  
    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average,
    };
  }
  
  export { calculateExercises };