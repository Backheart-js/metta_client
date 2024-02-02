import { IBMIData, IBMIResult, bmiRangeData } from '@/types/tool';

const getBMIData = (bmiValue: number) => {
    for (const [key, value] of Object.entries(bmiRangeData)) {
        const range = value.range;
        if (bmiValue >= range[0] && bmiValue <= range[1]) {
            return value;
        }
    }

    // Nếu giá trị BMI không nằm trong bất kỳ khoảng nào, có thể xử lý hoặc trả về một giá trị mặc định.
    return null;
};

export const calcBMI = function (data: IBMIData): IBMIResult {
    const { height, weight } = data;

    const bmi = weight / (height / 100) ** 2;
    const calcData = getBMIData(bmi);

    // Kiểm tra xem calcData có phải là null không
    if (calcData !== null) {
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
    } else {
        // Xử lý trường hợp calcData là null
        return {
            bmi: parseFloat(bmi.toFixed(1)),
            minWeight: 0,
            maxWeight: 0,
            idealWeight: 0,
            status: 'Không xác định',
            advice: 'Không có dữ liệu để tính toán trạng thái và đưa ra lời khuyên.',
        };
    }
};
