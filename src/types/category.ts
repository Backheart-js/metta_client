import {
    HomeOutlined,
    MonitorHeartOutlined,
    PsychologyAltOutlined,
    CalendarMonthOutlined,
    PersonOutlineOutlined,
    LogoutOutlined,
} from '@mui/icons-material';

export const category = [
    {
        text: 'Trang chủ',
        Icon: HomeOutlined,
        path: '/',
        short_text: 'Trang chủ',
    },
    {
        text: 'Công cụ sức khỏe',
        Icon: MonitorHeartOutlined,
        path: '/health-tool',
        short_text: 'Công cụ',
    },
    {
        text: 'Trợ lý ảo',
        Icon: PsychologyAltOutlined,
        path: '/ai-assistant',
        short_text: 'Trợ lý',
    },
    {
        text: 'Kế hoạch',
        Icon: CalendarMonthOutlined,
        path: '/plan',
        short_text: 'Kế hoạch',
    },
    {
        text: 'Thông tin người dùng',
        Icon: PersonOutlineOutlined,
        path: '/profile',
        short_text: 'Thông tin',
    },
    {
        text: 'Đăng xuất',
        Icon: LogoutOutlined,
        path: '/',
        short_text: 'Đăng xuất',
    },
];
