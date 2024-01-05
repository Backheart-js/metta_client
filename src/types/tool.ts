export interface IBMIData {
    weight: number;
    height: number;
}

export interface IBMIResult {
    bmi: number;
    minWeight: number;
    maxWeight: number;
    idealWeight: number;
    status: string;
    advice: string;
}

export interface FormData {
    gender: number;
    age: number | null;
    height: number | null;
    weight: number | null;
    activityLevel: string;
    goal: string;
}

export interface TDEEResult {
    brm: number;
    tdee: number;
    workoutDayCalo: number;
    restDayCalo: number;
}

export interface IRating {
    isRated: boolean;
    status: number;
}

export interface ICombineData extends IBMIResult, TDEEResult, FormData {
    userId?: string;
    message?: string;
    userLike?: IRating;
}

export const bmiRangeData = {
    lever_1: {
        range: [0, 18.4],
        status: 'CÂN NẶNG THẤP',
        advice: 'Cơ thể thiếu cân bạn nên áp dụng các phương pháp ăn uống và luyện tập để tăng trọng lượng cơ thể nhé!',
    },
    lever_2: {
        range: [18.5, 24.9],
        status: 'BÌNH THƯỜNG',
        advice: 'Chỉ số BMI của bạn ở mức bình thường, bạn hoàn toàn khỏe mạnh, hãy tiếp tục duy trì quá trình ăn uống và sinh hoạt như thường ngày nhé!',
    },
    lever_3: {
        range: [25, 29.9],
        status: 'TIỀN BÉO PHÌ',
        advice: 'Chỉ số BMI của bạn đang ở mức cao, bạn cần áp dụng thực đơn ăn kiêng hợp lý cùng việc luyện tập khoa học để lấy lại vóc dáng chuẩn nhất nhé!',
    },
    lever_4: {
        range: [30, 34.9],
        status: 'BÉO PHÌ ĐỘ I',
        advice: 'Bạn đang ở nhóm độ I, với tình trạng này kéo dài cơ thể bạn có thể gặp nhiều vấn đề về sức khỏe và cả sinh hoạt. Hãy thay đổi thực đơn ăn uống lành mạnh và tập thể dục khoa học nhé!',
    },
    lever_5: {
        range: [35, 50],
        status: 'BÉO PHÌ ĐỘ II',
        advice: 'Bạn đang ở trong nhóm béo phì cấp độ 2, đây là tình trạng nghiêm trọng và có thể gây ra nhiều vấn đề sức khỏe nếu không được kiểm soát. Hãy tìm kiếm sự hỗ trợ từ chuyên gia dinh dưỡng và bác sĩ để lập kế hoạch giảm cân an toàn và hiệu quả. Áp dụng lối sống lành mạnh, thực đơn giảm calo và tập luyện đều đặn để cải thiện tình trạng sức khỏe của bạn.',
    },
};
