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
    const minWeight = calcData.range[0] * Math.pow(height / 100, 2);
    const maxWeight = calcData.range[1] * Math.pow(height / 100, 2);
    const idealWeight = (maxWeight + minWeight) / 2;

    return {
        minWeight: parseFloat(minWeight.toFixed(1)),
        maxWeight: parseFloat(maxWeight.toFixed(1)),
        idealWeight: parseFloat(idealWeight.toFixed(1)),
        status: calcData.status,
        advice: calcData.advice,
    };
};
