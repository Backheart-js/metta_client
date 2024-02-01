import { FormData } from '@/types/tool';

export const calcTDEE = (data: FormData) => {
    const { gender, age, height, weight, activityLevel, goal } = data;
    let calcBrm = null;
    let calcTdee = null;
    let averageCalo = null;

    if (gender) {
        calcBrm = 655 + 9.6 * weight + 1.8 * height - 4.7 * age;
    } else {
        calcBrm = 66 + 13.7 * weight + 5 * height - 6.8 * age;
    }

    switch (activityLevel) {
        case 'sedentary':
            calcTdee = calcBrm * 1.2;
            break;
        case 'low':
            calcTdee = calcBrm * 1.375;
            break;
        case 'medium':
            calcTdee = calcBrm * 1.55;
            break;
        case 'hight':
            calcTdee = calcBrm * 1.725;
            break;
        case 'athlete':
            calcTdee = calcBrm * 1.9;
            break;
        default:
            throw new Error();
    }
    switch (goal) {
        case 'increased':
            averageCalo = calcTdee + 200;
            break;
        case 'lose':
            averageCalo = calcTdee - 200;
            break;
        default:
            averageCalo = calcTdee;
    }

    const workoutDayCalo = averageCalo + 120;

    return {
        brm: parseFloat(calcBrm.toFixed(1)),
        tdee: parseFloat(calcTdee.toFixed(1)),
        workoutDayCalo: parseFloat(workoutDayCalo.toFixed(1)),
        restDayCalo: parseFloat(averageCalo.toFixed(1)),
    };
};
