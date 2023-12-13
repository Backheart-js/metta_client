// middleware.ts
import auth from '../utils/auth';

export async function checkLoginStatus() {
    // Kiểm tra SessionStorage để xem liệu có isLogin hay không
    const isLogin = sessionStorage.getItem('isLogin');

    if (!isLogin) {
        // Gọi API isLogin từ server
        try {
            const response = await auth.isLogin();
            console.log('isLogin res: ', response.data);
            // if (data.isLogin) {
            //   // Nếu đăng nhập thành công, lưu vào SessionStorage
            //   sessionStorage.setItem('isLogin', 'true');
            // } else {
            //   // Nếu không đăng nhập, trả về biến 'loginStatus' có giá trị false
            //   return { loginStatus: false };
            // }
            return response.data;
        } catch (error) {
            console.log(error);
        }
    } else {
        return isLogin;
    }
}
