import { IBMIData, IBMIResult, bmiRangeData } from '@/types/tool';

const getBMIData = (bmiValue: number) => {
    for (const key in bmiRangeData) {
        const range = bmiRangeData[key].range;
        if (bmiValue >= range[0] && bmiValue <= range[1]) {
            return bmiRangeData[key];
        }
    }

    // Nếu giá trị BMI không nằm trong bất kỳ khoảng nào, có thể xử lý hoặc trả về một giá trị mặc định.
    return null;
};

export const calcBMI = function (data: IBMIData): IBMIResult {
    const { height, weight } = data;

    const bmi = weight / (height / 100) ** 2;
    const calcData = getBMIData(bmi);
    const minWeight = 18.5 * Math.pow(height / 100, 2);
    const maxWeight = 24.9 * Math.pow(height / 100, 2);
    const idealWeight = (maxWeight + minWeight) / 2;

    return {
        bmi: parseFloat(bmi.toFixed(1)),
        minWeight: parseFloat(minWeight.toFixed(1)),
        maxWeight: parseFloat(maxWeight.toFixed(1)),
        idealWeight: parseFloat(idealWeight.toFixed(1)),
        status: calcData.status,
        advice: calcData.advice,
    };
};
