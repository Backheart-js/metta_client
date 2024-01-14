import auth from '../utils/axios/auth';

export async function checkLoginStatus() {
    // Kiểm tra SessionStorage để xem liệu có isLogin hay không
    const storedIsLogin = sessionStorage.getItem('isLogin');

    if (storedIsLogin !== null) {
        const isLogin = JSON.parse(storedIsLogin);

        if (isLogin === null) {
            // Gọi API isLogin từ server
            try {
                const response = await auth.isLogin();
                console.log('isLogin res: ', response.data);
                if (response.data.isLogin) {
                    // Nếu đăng nhập thành công, lưu vào SessionStorage
                    sessionStorage.setItem('isLogin', 'true');
                } else {
                    // Nếu không đăng nhập, trả về biến 'loginStatus' có giá trị false
                    return { isLogin: false };
                }
                return response.data;
            } catch (error) {
                console.log(error);
            }
        } else {
            return { isLogin };
        }
    } else {
        // Nếu không có isLogin trong SessionStorage, gọi API để kiểm tra
        try {
            const response = await auth.isLogin();
            console.log('isLogin res: ', response.data);
            if (response.data.isLogin) {
                // Nếu đăng nhập thành công, lưu vào SessionStorage
                sessionStorage.setItem('isLogin', 'true');
            } else {
                // Nếu không đăng nhập, trả về biến 'loginStatus' có giá trị false
                return { isLogin: false };
            }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}
