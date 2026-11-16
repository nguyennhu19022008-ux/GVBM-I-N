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
  name: "Bùi Thị Điền",
  title: "Giáo viên Bộ môn Lịch sử THPT",
  school: "Trường THPT Nguyễn Du",
  bio: "Với tâm huyết nghiên cứu và đồng hành cùng các thế hệ học sinh trong các kỳ thi Học sinh Giỏi cấp Tỉnh, Quốc gia và Tốt nghiệp THPT, cô mong muốn biến những trang sử hào hùng của dân tộc thành nguồn cảm hứng sống, lòng tự tôn và tri thức vững vàng cho thế hệ trẻ.",
  quote: "Lịch sử không phải là những con số và sự kiện khô khan nằm im trên trang sách, mà là nhịp đập, là hơi thở và máu xương của cha ông trao truyền lại cho chúng ta hôm nay.",
  email: "buithidien491982@gmail.com",
  phone: "0985646348",
  zalo: "https://zalo.me/0985646348",
  avatarUrl: "/images/thay-giao-nguyen-vuong-gia.jpg",
  achievements: [],
  teachingPhilosophy: [
    "Học Sử để hiểu cội nguồn gốc tích, bồi đắp lòng tự hào và trách nhiệm công dân.",
    "Bản chất - Bối cảnh - Mối liên hệ logic quan trọng hơn việc học vẹt số liệu rời rạc.",
    "Đồng hành tận tâm cùng mọi học sinh từ mất gốc đến chinh phục điểm 9 - 10."
  ]
};
