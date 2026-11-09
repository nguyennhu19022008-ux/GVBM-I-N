export interface WartimeStory {
  id: string;
  title: string;
  tagline: string;
  year: string;
  period: string;
  quote: string;
  excerpt: string;
  content: string[];
  heroes: string[];
  significance: string;
  imageUrl: string;
  imageCaption: string;
}

export interface LeaderProfile {
  id: string;
  name: string;
  role: string;
  lifespan: string;
  quote: string;
  contributions: string[];
  imageUrl: string;
  historicalMilestone: string;
}

export const WARTIME_STORIES: WartimeStory[] = [
  {
    id: 'dien-bien-phu-1954',
    title: 'Kéo Pháo Vào Trận Địa Điện Biên Phủ: Bản Hùng Ca Bất Tử',
    tagline: 'Chiến dịch lịch sử chấn động địa cầu',
    year: '1954',
    period: 'Kháng chiến chống thực dân Pháp (1945 - 1954)',
    quote: '"Thà hy sinh chứ không để pháo rơi xuống vực thẳm!"',
    excerpt: 'Những con người bằng da bằng thịt vượt qua dốc cao 70 độ, đưa những cỗ pháo nặng hàng tấn vào trận địa, lập nên kỳ tích chưa từng có trong lịch sử quân sự thế giới.',
    content: [
      'Đầu năm 1954, hàng vạn chiến sĩ và thanh niên xung phong Việt Minh nhận mệnh lệnh mở đường xuyên núi, kéo những khẩu lựu pháo 105mm và pháo cao xạ 37mm nặng gần 3 tấn qua đèo dốc hiểm trở vào lòng chảo Điện Biên Phủ.',
      'Khi Đại tướng Võ Nguyên Giáp đưa ra quyết định lịch sử: chuyển phương châm tác chiến từ "Đánh nhanh thắng nhanh" sang "Đánh chắc tiến chắc", bộ đội ta lại kiên cường kéo pháo ngược trở ra vị trí an toàn trong sự lùng sục ác liệt của máy bay địch.',
      'Hình ảnh Anh hùng Tô Vĩnh Diện lấy thân mình chèn bánh pháo trên dốc Chuối, Anh hùng Bế Văn Đàn lấy thân mình làm giá súng, Anh hùng Phan Đình Giót lấy thân mình lấp lỗ châu mai đã trở thành biểu tượng bất tử cho ý chí gang thép của dân tộc Việt Nam.'
    ],
    heroes: [
      'Đại tướng Võ Nguyên Giáp',
      'Anh hùng Tô Vĩnh Diện (Chèn lưng cứu pháo)',
      'Anh hùng Phan Đình Giót (Lấp lỗ châu mai)',
      'Anh hùng Bế Văn Đàn (Lấy thân làm giá súng)'
    ],
    significance: 'Đập tan Tập đoàn cứ điểm Điện Biên Phủ - "Pháo đài bất khả xâm phạm" của thực dân Pháp và can thiệp Mỹ, buộc Pháp phải ký Hiệp định Giơ-ne-vơ lập lại hòa bình tại Đông Dương.',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Tư liệu hào khí Điện Biên Phủ: Băng rừng vượt dốc, siết chặt vòng vây Mường Thanh lịch sử.'
  },
  {
    id: 'nga-ba-dong-loc-1968',
    title: 'Huyền Thoại 10 Cô Gái Ngã Ba Đồng Lộc & Tuyến Lửa Trường Sơn',
    tagline: 'Khúc tráng ca của tuổi trẻ vì độc lập tự do',
    year: '1968',
    period: 'Kháng chiến chống Mỹ cứu nước (1954 - 1975)',
    quote: '"Tim có thể ngừng đập, nhưng mạch máu giao thông Trường Sơn không bao giờ tắc!"',
    excerpt: 'Mảnh đất Đồng Lộc (Hà Tĩnh) phải oằn mình hứng chịu hàng vạn tấn bom đạn mỗi tháng. Nơi ấy, 10 đóa hoa trinh liệt của Tiểu đội 4 đã mãi mãi nằm lại ở độ tuổi đôi mươi.',
    content: [
      'Ngã ba Đồng Lộc nằm trên yết hầu đường Trường Sơn huyền thoại - con đường chi viện sống còn của hậu phương lớn miền Bắc cho tiền tuyến lớn miền Nam.',
      'Từ tháng 4 đến tháng 10 năm 1968, không quân Mỹ dội xuống nơi đây gần 50.000 quả bom các loại. Đất đá bị cày đi xới lại hàng trăm lần, không còn một ngọn cỏ xanh nào có thể sống sót.',
      'Chiều ngày 24/7/1968, trong lúc đang san lấp hố bom để thông đường cho đoàn xe ra trận, trận bom thứ 15 của giặc dội xuống cướp đi sinh mạng của 10 nữ liệt sĩ thanh niên xung phong do Tiểu đội trưởng Võ Thị Tần chỉ huy. Các chị đã dâng hiến trọn vẹn tuổi thanh xuân đẹp nhất cho Tổ quốc.'
    ],
    heroes: [
      'Tiểu đội trưởng Võ Thị Tần',
      'Tiểu đội phó Hồ Thị Cúc',
      '8 nữ thanh niên xung phong Tiểu đội 4 Đồng Lộc',
      'Hàng vạn chiến sĩ vận tải Đoàn 559 Trường Sơn'
    ],
    significance: 'Giữ vững huyết mạch chi viện Bắc - Nam, làm nên kỳ tích tuyến đường vận tải chiến lược Trường Sơn - nhân tố quyết định thắng lợi của cuộc kháng chiến chống Mỹ.',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Ký ức tuyến lửa Trường Sơn: Những đoàn xe không kính xẻ dọc Trường Sơn đi cứu nước.'
  },
  {
    id: 'thanh-co-quang-tri-1972',
    title: '81 Ngày Đêm Mùa Hè Đỏ Lửa: Khúc Bi Tráng Thành Cổ Quảng Trị',
    tagline: 'Bản hùng ca kiên cường bên bờ sông Thạch Hãn',
    year: '1972',
    period: 'Kháng chiến chống Mỹ cứu nước (1954 - 1975)',
    quote: '"Đò lên Thạch Hãn ơi… chèo nhẹ / Đáy sông còn đó bạn tôi nằm / Tan theo sóng nước, không phiến đá / Nhìn bờ xanh ngắt giọt sương rơi."',
    excerpt: 'Trong 81 ngày đêm, mỗi mét vuông đất tại Thành Cổ Quảng Trị phải chịu lượng bom đạn tương đương 7 quả bom nguyên tử, viết nên thiên sử thi kiên cường nhất của người lính.',
    content: [
      'Cuộc chiến đấu 81 ngày đêm (từ 28/6 đến 16/9/1972) bảo vệ Thành Cổ Quảng Trị và thị xã Quảng Trị diễn ra ác liệt bậc nhất trong lịch sử chiến tranh hiện đại.',
      'Quân đội Mỹ - Ngụy đã trút xuống mảnh đất chưa đầy 3 cây số vuông này hơn 328.000 tấn bom đạn. Các chiến sĩ quân giải phóng, phần lớn là những sinh viên, trí thức tuổi mười tám đôi mươi xếp bút nghiên lên đường đánh giặc, đã kiên cường bám trụ từng tấc đất.',
      'Sự hy sinh anh dũng kiên cường của quân và dân ta tại Quảng Trị đã tạo nên thế đứng vững chắc trên bàn đàm phán Hội nghị Paris, buộc Mỹ phải ký hiệp định rút quân.'
    ],
    heroes: [
      'Các chiến sĩ Sư đoàn 308, 320B, 325, 312',
      'Chiến sĩ Trung đoàn 48 Thành Cổ Quảng Trị',
      'Những người con sinh viên Đại học Tổng hợp, Bách khoa, Sư phạm xếp bút nghiên lên đường'
    ],
    significance: 'Tạo bước ngoặt quyết định trên bàn đàm phán ngoại giao Paris 1973, đánh bại ý chí tái chiếm của Mỹ - Ngụy, mở đường cho cuộc Tổng tiến công mùa Xuân 1975.',
    imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Màu xanh hồi sinh bên dòng Thạch Hãn - Nơi ghi dấu sự hy sinh anh dũng của tuổi trẻ Việt Nam.'
  },
  {
    id: 'dinh-doc-lap-1975',
    title: 'Khoảnh Khắc 11 Giờ 30 Ngày 30/4/1975: Thu Non Sông Về Một Mối',
    tagline: 'Đại thắng Mùa Xuân - Kết thúc 30 năm chiến tranh',
    year: '1975',
    period: 'Chiến dịch Hồ Chí Minh lịch sử (1975)',
    quote: '"Tổ quốc ta nhất định sẽ thống nhất. Đồng bào Nam Bắc nhất định sẽ sum họp một nhà!"',
    excerpt: 'Chiếc xe tăng 390 húc đổ cánh cổng sắt Dinh Độc Lập, lá cờ Mặt trận Giải phóng tung bay trên nóc dinh, đánh dấu giờ phút thiêng liêng đất nước hoàn toàn giải phóng.',
    content: [
      'Sau thắng lợi giòn giã của Chiến dịch Tây Nguyên và Chiến dịch Huế - Đà Nẵng, Bộ Chính trị quyết định mở Chiến dịch Hồ Chí Minh lịch sử với tư tưởng chỉ đạo: "Thần tốc, thần tốc hơn nữa; táo bạo, táo bạo hơn nữa; tranh thủ từng giờ, từng phút, xốc tới mặt trận, giải phóng miền Nam!".',
      'Năm cánh quân hợp đồng tác chiến dũng mãnh tiến thẳng vào sào huyệt cuối cùng của chính quyền Sài Gòn.',
      'Vào lúc 11 giờ 30 phút ngày 30 tháng 4 năm 1975, cờ chiến thắng tung bay trên nóc Dinh Độc Lập. Tổng thống Dương Văn Minh tuyên bố đầu hàng không điều kiện. Chiến dịch Hồ Chí Minh toàn thắng, kết thúc vẻ vang 30 năm chiến tranh giải phóng dân tộc và bảo vệ Tổ quốc.'
    ],
    heroes: [
      'Đại tướng Võ Nguyên Giáp (Tổng Tư lệnh)',
      'Đại tướng Văn Tiến Dũng (Tư lệnh Chiến dịch)',
      'Đồng chí Phạm Hùng (Chính ủy Chiến dịch)',
      'Tổ lái Xe tăng 390 và Xe tăng 843 húc đổ cổng Dinh Độc Lập'
    ],
    significance: 'Chấm dứt hoàn toàn ách thống trị của chủ nghĩa thực dân, đế quốc kéo dài hơn một thế kỷ; giang sơn thu về một mối, mở ra kỷ nguyên độc lập, thống nhất và đi lên chủ nghĩa xã hội.',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Ký ức ngày 30/4/1975: Mốc son chói lọi khép lại 30 năm chiến tranh gian khổ và anh dũng.'
  }
];

export const HISTORICAL_LEADERS: LeaderProfile[] = [
  {
    id: 'ho-chi-minh',
    name: 'Chủ Tịch Hồ Chí Minh',
    role: 'Lãnh tụ vĩ đại của dân tộc • Người sáng lập Đảng & Nhà nước Việt Nam mới',
    lifespan: '1890 - 1969',
    quote: '"Không có gì quý hơn độc lập, tự do!"',
    contributions: [
      'Tìm ra con đường cứu nước giải phóng dân tộc theo con đường cách mạng vô sản (1911 - 1920).',
      'Sáng lập Đảng Cộng sản Việt Nam (1930) và Mặt trận Việt Minh (1941).',
      'Soạn thảo và đọc bản Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa (2/9/1945).',
      'Lãnh đạo toàn dân tiến hành hai cuộc kháng chiến vĩ đại chống thực dân Pháp và đế quốc Mỹ.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    historicalMilestone: 'Khai sinh nước VNDCCH 1945 & Đường lối kháng chiến kiến quốc'
  },
  {
    id: 'vo-nguyen-giap',
    name: 'Đại Tướng Võ Nguyên Giáp',
    role: 'Người Anh Cả của Quân đội nhân dân Việt Nam • Vị tướng huyền thoại',
    lifespan: '1911 - 2013',
    quote: '"Thần tốc, thần tốc hơn nữa; táo bạo, táo bạo hơn nữa; tranh thủ từng giờ, từng phút!"',
    contributions: [
      'Chỉ huy Đội Việt Nam Tuyên truyền Giải phóng quân - tiền thân của QĐND Việt Nam (1944).',
      'Tổng tư lệnh chiến dịch lịch sử Điện Biên Phủ 1954 lừng lẫy năm châu.',
      'Kiến trúc sư quân sự đại tài của cuộc kháng chiến chống Mỹ và Đại thắng Mùa Xuân 1975.',
      'Nhà quân sự kiệt xuất được thế giới tôn vinh là một trong những danh tướng vĩ đại nhất mọi thời đại.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
    historicalMilestone: 'Chiến thắng Điện Biên Phủ 1954 & Mệnh lệnh Thần tốc 1975'
  },
  {
    id: 'le-duan',
    name: 'Tổng Bí Thư Lê Duẩn',
    role: 'Nhà lãnh đạo kiệt xuất • Kiến trúc sư đường lối giải phóng miền Nam',
    lifespan: '1907 - 1986',
    quote: '"Dưới sự lãnh đạo của Đảng, nhân dân ta không chịu khuất phục trước bất kỳ thế lực bạo tàn nào."',
    contributions: [
      'Khởi thảo Đề cương Cách mạng miền Nam (1956) - ngọn cờ dẫn dắt phong trào Đồng Khởi 1960.',
      'Tổng Bí thư Đảng Cộng sản Việt Nam lãnh đạo cuộc kháng chiến chống Mỹ từ năm 1960 đến thắng lợi 1975.',
      'Chỉ đạo hoạch định chiến lược giải phóng miền Nam thống nhất đất nước trong 2 năm 1975 - 1976.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80',
    historicalMilestone: 'Nghị quyết 15 & Đường lối kháng chiến thống nhất non sông'
  },
  {
    id: 'nguyen-van-linh',
    name: 'Tổng Bí Thư Nguyễn Văn Linh',
    role: 'Nhà lãnh đạo khởi xướng công cuộc Đổi Mới toàn diện đất nước (1986)',
    lifespan: '1915 - 1998',
    quote: '"Hãy tự cứu mình trước khi trời cứu! Đổi mới là mệnh lệnh của cuộc sống."',
    contributions: [
      'Tổng Bí thư tại Đại hội Đảng lần thứ VI (1986), chính thức khởi xướng đường lối Đổi Mới đất nước.',
      'Tác giả loạt bài báo nổi tiếng "Những việc cần làm ngay" tạo luồng gió dân chủ, công khai và chống tiêu cực.',
      'Mở đường đưa Việt Nam thoát khỏi khủng hoảng kinh tế - xã hội, bước vào kỷ nguyên hội nhập quốc tế.'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    historicalMilestone: 'Đại hội VI (1986) & Đường lối Đổi Mới kinh tế - xã hội'
  }
];
