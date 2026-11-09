export interface TeacherProfile {
  name: string;
  title: string;
  school: string;
  bio: string;
  quote: string;
  email: string;
  phone: string;
  zalo: string;
  facebook?: string;
  avatarUrl: string;
  achievements: {
    year: string;
    title: string;
    description: string;
  }[];
  teachingPhilosophy: string[];
}

export const TEACHER_DATA: TeacherProfile = {
  name: "Thầy Nguyễn Vương Gia",
  title: "Thạc sĩ Lịch sử • Giáo viên Chuyên môn Lịch sử THPT",
  school: "Trường THPT Chuyên • Tỉnh Bà Rịa - Vũng Tàu",
  bio: "Với hơn 10 năm tâm huyết nghiên cứu và đồng hành cùng các thế hệ học sinh trong các kỳ thi Học sinh Giỏi cấp Tỉnh, Quốc gia và Tốt nghiệp THPT, thầy mong muốn biến những trang sử hào hùng của dân tộc thành nguồn cảm hứng sống, lòng tự tôn và tri thức vững vàng cho thế hệ trẻ.",
  quote: "Lịch sử không phải là những con số và sự kiện khô khan nằm im trên trang sách, mà là nhịp đập, là hơi thở và máu xương của cha ông trao truyền lại cho chúng ta hôm nay.",
  email: "nguyennhu19022008@gmail.com",
  phone: "0876637806",
  zalo: "https://zalo.me/0876637806",
  avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80",
  achievements: [
    {
      year: "2024 - 2025",
      title: "Giải Nhất Giáo viên Dạy giỏi Môn Lịch sử",
      description: "Đổi mới phương pháp dạy học trực quan và ứng dụng công nghệ thông tin vào giảng dạy môn Lịch sử THPT."
    },
    {
      year: "2023 - 2024",
      title: "Bồi dưỡng 12 Học sinh đạt Điểm 10 Lịch sử THPT Quốc gia",
      description: "Phương pháp xâu chuỗi sự kiện theo tiến trình niên đại kết hợp giải mã bẫy trắc nghiệm phân hóa cao."
    },
    {
      year: "2022 - 2023",
      title: "Tác giả bộ tài liệu Sơ đồ Tư duy Lịch sử 10-11-12",
      description: "Cẩm nang học tập được chia sẻ công khai đến hơn 20.000 học sinh trên toàn quốc."
    }
  ],
  teachingPhilosophy: [
    "Học Sử để hiểu cội nguồn gốc tích, bồi đắp lòng tự hào và trách nhiệm công dân.",
    "Bản chất - Bối cảnh - Mối liên hệ logic quan trọng hơn việc học vẹt số liệu rời rạc.",
    "Đồng hành tận tâm cùng mọi học sinh từ mất gốc đến chinh phục điểm 9 - 10."
  ]
};
