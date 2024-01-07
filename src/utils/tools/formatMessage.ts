export function formatInput(inputString: string) {
    const lines = inputString.split('\n');

    // Khởi tạo đối tượng kết quả với kiểu cụ thể
    const resultObject: {
        'Chế độ sinh hoạt': string[];
        'Chế độ dinh dưỡng': string[];
        'Phương pháp tập luyện': string[];
    } = {
        'Chế độ sinh hoạt': [],
        'Chế độ dinh dưỡng': [],
        'Phương pháp tập luyện': [],
    };

    // Biến đếm để xác định loại chế độ
    let currentMode: keyof typeof resultObject = 'Chế độ sinh hoạt';

    // Duyệt qua từng dòng và thêm vào đối tượng kết quả
    lines.forEach((line) => {
        if (line.startsWith('Chế độ sinh hoạt:')) {
            currentMode = 'Chế độ sinh hoạt';
        } else if (line.startsWith('Chế độ dinh dưỡng:')) {
            currentMode = 'Chế độ dinh dưỡng';
        } else if (line.startsWith('Phương pháp tập luyện:')) {
            currentMode = 'Phương pháp tập luyện';
        } else if (line.trim() !== '') {
            resultObject[currentMode].push(line.trim());
        }
    });

    return resultObject;
}
