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
    imageUrl: '/images/dien-bien-phu-1954.jpg',
    imageCaption: 'Ảnh tư liệu: Chiều 7/5/1954, cờ Quyết chiến Quyết thắng tung bay trên nóc hầm De Castries, kết thúc toàn thắng chiến dịch Điện Biên Phủ.'
  },
  {
    id: 'nga-ba-dong-loc-1968',
    title: 'Huyền Thoại Tuyến Lửa Trường Sơn & Khúc Tráng Ca Đồng Lộc',
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
    imageUrl: '/images/duong-truong-son.jpg',
    imageCaption: 'Ảnh tư liệu: Đoàn xe vận tải và chiến sĩ công binh, thanh niên xung phong xẻ dọc Trường Sơn đi cứu nước.'
  },
  {
    id: 'dien-bien-phu-tren-khong-1972',
    title: '12 Ngày Đêm Khói Lửa: Bản Hùng Ca Điện Biên Phủ Trên Không 1972',
    tagline: 'Bản hùng ca kiên cường bảo vệ bầu trời Hà Nội',
    year: '1972',
    period: 'Kháng chiến chống Mỹ cứu nước (1954 - 1975)',
    quote: '"Hà Nội có thể bị tàn phá, một số nhà máy có thể bị phá hủy, nhưng nhân dân Việt Nam quyết không sợ!"',
    excerpt: 'Trong 12 ngày đêm tháng 12/1972, quân dân Hà Nội và miền Bắc đã lập nên kỳ tích vô tiền khoáng hậu: đập tan chiến dịch Linebacker II, bắn hạ 34 siêu pháo đài bay B-52.',
    content: [
      'Đêm 18/12/1972, đế quốc Mỹ mở cuộc tập kích chiến lược đường không quy mô lớn nhất sau Thế chiến II bằng máy bay ném bom chiến lược B-52 trút bom rải thảm xuống Thủ đô Hà Nội, Hải Phòng và các tỉnh lân cận hòng "đưa miền Bắc về thời kỳ đồ đá".',
      'Với bản lĩnh và trí tuệ Việt Nam, lưới lửa phòng không nhiều tầng nhiều lớp của bộ đội Tên lửa SAM-2, pháo cao xạ và không quân MiG-21 đã chủ động đón đánh giặc trời.',
      'Sau 12 ngày đêm kiên cường quả cảm, ta bắn rơi 81 máy bay hiện đại (trong đó có 34 chiếc B-52), bắt sống hàng chục giặc lái. Thất bại thảm hại này buộc Tổng thống Nixon phải tuyên bố ngừng ném bom và ký kết Hiệp định Paris.'
    ],
    heroes: [
      'Bộ đội Tên lửa SAM-2 Phòng không - Không quân',
      'Anh hùng Phi công Phạm Tuân (Bắn rơi B-52 đêm 27/12)',
      'Anh hùng Phi công Vũ Xuân Thiều (Cảm tử lao vào B-52)',
      'Đồng bào và chiến sĩ Thủ đô Hà Nội kiên trung'
    ],
    significance: 'Là thắng lợi quân sự trực tiếp mang tính quyết định buộc chính phủ Mỹ phải ký Hiệp định Paris (27/1/1973), chấm dứt chiến tranh, rút hết quân viễn chinh Mỹ về nước.',
    imageUrl: '/images/ha-noi-1972.jpg',
    imageCaption: 'Ảnh tư liệu: Xác máy bay B-52 rơi tại làng hoa Ngọc Hà (Hồ Hữu Tiệp, Hà Nội) - Dấu ấn chiến thắng 12 ngày đêm Điện Biên Phủ trên không.'
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
    imageUrl: '/images/giai-phong-1975.jpg',
    imageCaption: 'Ảnh tư liệu: Xe tăng Quân giải phóng húc đổ cổng Dinh Độc Lập trưa 30/4/1975, hoàn thành thống nhất non sông.'
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
    imageUrl: '/images/ho-chi-minh.jpg',
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
    imageUrl: '/images/vo-nguyen-giap.jpg',
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
    imageUrl: '/images/le-duan.jpg',
    historicalMilestone: 'Nghị quyết 15 & Đường lối kháng chiến thống nhất non sông'
  },
  {
    id: 'ton-duc-thang',
    name: 'Chủ Tịch Tôn Đức Thắng',
    role: 'Chủ tịch nước CHXHCN Việt Nam • Biểu tượng mẫu mực của khối Đại đoàn kết dân tộc',
    lifespan: '1888 - 1980',
    quote: '"Cả cuộc đời tôi chỉ có một tâm nguyện: phục vụ Tổ quốc, phục vụ nhân dân đến hơi thở cuối cùng."',
    contributions: [
      'Người kéo lá cờ đỏ trên chiến hạm France ở Biển Đen (1919) ủng hộ Cách mạng Tháng Mười Nga.',
      'Sáng lập Công hội Đỏ đầu tiên của giai cấp công nhân Việt Nam (1920) tại Sài Gòn - Chợ Lớn.',
      'Người chiến sĩ cộng sản kiên cường vượt qua 15 năm đày ải nơi địa ngục trần gian Côn Đảo.',
      'Kế tục Chủ tịch Hồ Chí Minh giữ chức Chủ tịch nước Việt Nam Dân chủ Cộng hòa và Chủ tịch nước CHXHCN Việt Nam đầu tiên sau ngày thống nhất.'
    ],
    imageUrl: '/images/ton-duc-thang.jpg',
    historicalMilestone: 'Chủ tịch nước CHXHCN Việt Nam đầu tiên & Khối Đại đoàn kết dân tộc'
  }
];
