export interface TimelineEvent {
  id: string;
  year: string;
  numericYear: number;
  exactDate?: string;
  title: string;
  period: 'vietnam-1858-1945' | 'khang-chien-phap-1945-1954' | 'khang-chien-my-1954-1975' | 'doi-moi-1975-nay' | 'the-gioi-hien-dai';
  periodLabel: string;
  gradeLevel: '11' | '12' | 'all';
  summary: string;
  context: string;
  keyPoints: string[];
  significance: string;
  examTips: string;
  imageUrl: string;
  imageCaption: string;
  keyFigures: string[];
  tags: string[];
  relatedQuizId?: string;
  relatedResourceId?: string;
}

export const PERIOD_FILTERS = [
  { id: 'all', label: 'Toàn Cảnh Biên Niên Sử (1858 - Nay)' },
  { id: 'vietnam-1858-1945', label: 'Đấu Tranh & CM Tháng Tám (1858 - 1945)' },
  { id: 'khang-chien-phap-1945-1954', label: 'Kháng Chiến Chống Pháp (1945 - 1954)' },
  { id: 'khang-chien-my-1954-1975', label: 'Kháng Chiến Chống Mỹ (1954 - 1975)' },
  { id: 'doi-moi-1975-nay', label: 'Đổi Mới & Hội Nhập (1975 - Nay)' },
  { id: 'the-gioi-hien-dai', label: 'Lịch Sử Thế Giới Hiện Đại' },
] as const;

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 'dien-bien-phu-1954',
    year: '1954',
    numericYear: 1954,
    exactDate: '13/03/1954 - 07/05/1954',
    title: 'Chiến Thắng Lịch Sử Điện Biên Phủ: "Lừng Lẫy Năm Châu, Chấn Động Địa Cầu"',
    period: 'khang-chien-phap-1945-1954',
    periodLabel: 'K/c Chống Pháp (1945 - 1954)',
    gradeLevel: '12',
    summary: 'Trận quyết chiến chiến lược đập tan hoàn toàn tập đoàn cứ điểm mạnh nhất Đông Dương của thực dân Pháp và can thiệp Mỹ, buộc Pháp phải ký Hiệp định Giơ-ne-vơ lập lại hòa bình.',
    context: 'Cuối năm 1953, tướng Nava xây dựng Điện Biên Phủ thành tập đoàn cứ điểm mạnh nhất Đông Dương gồm 49 cứ điểm, 3 phân khu hòng biến nơi đây thành cỗ máy nghiền nát quân chủ lực Việt Minh.',
    keyPoints: [
      'Chủ trương chuyển đổi phương châm tác chiến lịch sử của Đại tướng Võ Nguyên Giáp từ "Đánh nhanh thắng nhanh" sang "Đánh chắc tiến chắc".',
      'Đợt 1 (13/3 - 17/3): Tiêu diệt cụm cứ điểm Him Lam, Độc Lập, bức hàng Bản Kéo, mở toang cánh cửa phía Bắc.',
      'Đợt 2 (30/3 - 26/4): Đánh chiếm các ngọn đồi phía Đông (A1, C1, D1...), thắt chặt vòng vây chiến hào bóp nghẹt sân bay Mường Thanh.',
      'Đợt 3 (01/5 - 07/5): Tổng công kích dứt điểm; 17h30 ngày 7/5/1954, lá cờ "Quyết chiến Quyết thắng" tung bay trên nóc hầm De Castries.'
    ],
    significance: 'Đỉnh cao của nghệ thuật chiến tranh nhân dân Việt Nam, giáng đòn quyết định đập tan Kế hoạch Nava, làm sụp đổ hoàn toàn chủ nghĩa thực dân cũ trên thế giới, mở đường giải phóng hoàn toàn miền Bắc.',
    examTips: 'Từ khóa then chốt thi THPT: "Trận quyết chiến chiến lược", "Đánh chắc tiến chắc", "Kế hoạch Nava phá sản hoàn toàn", "Điều kiện quyết định ký Hiệp định Giơ-ne-vơ 1954".',
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Tư liệu chiến hào Điện Biên Phủ 1954 - Vận kéo pháo xuyên đèo dốc và công sự siết chặt vòng vây Mường Thanh.',
    keyFigures: ['Chủ tịch Hồ Chí Minh', 'Đại tướng Võ Nguyên Giáp', 'Anh hùng Phan Đình Giót', 'Anh hùng Bế Văn Đàn', 'Anh hùng Tô Vĩnh Diện'],
    tags: ['Điện Biên Phủ', 'Kế hoạch Nava', 'Hiệp định Giơ-ne-vơ', 'Trọng tâm thi THPT'],
    relatedQuizId: 'quiz-khang-chien-phap',
    relatedResourceId: 'res-slide-khang-chien-phap'
  },
  {
    id: 'cach-mang-thang-tam-1945',
    year: '1945',
    numericYear: 1945,
    exactDate: '14/08/1945 - 02/09/1945',
    title: 'Cách Mạng Tháng Tám & Tuyên Ngôn Độc Lập Khai Sinh Nước VNDCCH',
    period: 'vietnam-1858-1945',
    periodLabel: 'Thời kỳ 1858 - 1945',
    gradeLevel: '12',
    summary: 'Toàn dân tộc vùng lên chớp thời cơ nghìn năm có một, đập tan xiềng xích thực dân phát xít và chế độ phong kiến ngàn năm, lập nên nhà nước công nông đầu tiên ở Đông Nam Á.',
    context: 'Tháng 8/1945, phát xít Nhật đầu hàng Đồng minh không điều kiện. Quân Nhật ở Đông Dương tê liệt, chính phủ bù nhìn Trần Trọng Kim hoang mang tột độ. Thời cơ chín muồi.',
    keyPoints: [
      'Ngày 14-15/8/1945: Hội nghị toàn quốc của Đảng tại Tân Trào quyết định phát động Tổng khởi nghĩa giành chính quyền.',
      'Bốn tỉnh giành chính quyền sớm nhất cả nước trong ngày 18/8: Bắc Giang, Hải Dương, Hà Tĩnh, Quảng Nam.',
      'Khởi nghĩa thắng lợi vang dội tại 3 thành phố lớn: Hà Nội (19/8), Huế (23/8), Sài Gòn (25/8). Vua Bảo Đại thoái vị ngày 30/8.',
      'Ngày 2/9/1945: Tại Quảng trường Ba Đình, Chủ tịch Hồ Chí Minh đọc bản Tuyên ngôn Độc lập khai sinh nước Việt Nam Dân chủ Cộng hòa.'
    ],
    significance: 'Mở ra bước ngoặt vĩ đại trong lịch sử dân tộc: chấm dứt hơn 80 năm đô hộ của thực dân, xóa bỏ ngai vàng phong kiến ngàn năm; nhân dân Việt Nam từ thân phận nô lệ trở thành người làm chủ đất nước.',
    examTips: 'Trọng tâm trắc nghiệm: "Thời cơ ngàn năm có một" (khoảng thời gian từ khi Nhật đầu hàng đến trước khi quân Đồng minh vào tước khí giới), "4 tỉnh giành chính quyền sớm nhất", "Tính chất: cuộc cách mạng dân tộc dân chủ nhân dân".',
    imageUrl: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Quảng trường Ba Đình lịch sử - Chiều ngày 2 tháng 9 năm 1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập.',
    keyFigures: ['Chủ tịch Hồ Chí Minh', 'Đồng chí Trường Chinh', 'Võ Nguyên Giáp', 'Vua Bảo Đại'],
    tags: ['Cách mạng Tháng Tám', 'Tuyên ngôn Độc lập', 'Thời cơ lịch sử', 'VNDCCH'],
    relatedQuizId: 'quiz-khang-chien-phap',
    relatedResourceId: 'res-de-cuong-thpt-quoc-gia-2026'
  },
  {
    id: 'dong-khoi-1960',
    year: '1960',
    numericYear: 1960,
    exactDate: '17/01/1960',
    title: 'Phong Trào "Đồng Khởi" Bến Tre: Bước Ngoặt Chuyển Sang Thế Tiến Công',
    period: 'khang-chien-my-1954-1975',
    periodLabel: 'K/c Chống Mỹ (1954 - 1975)',
    gradeLevel: '12',
    summary: 'Cao trào nổi dậy đồng loạt của đồng bào miền Nam phá tan bộ máy kìm kẹp của chính quyền Ngô Đình Diệm, dẫn đến sự ra đời của Mặt trận Dân tộc Giải phóng miền Nam Việt Nam.',
    context: 'Mỹ - Diệm thi hành đạo luật 10/59 man rợ lê máy chém khắp miền Nam. Nghị quyết 15 BCH Trung ương Đảng (1/1959) xác định con đường bạo lực cách mạng giải phóng miền Nam.',
    keyPoints: [
      'Khởi phát ngày 17/1/1960 tại huyện Mỏ Cày (Bến Tre) dưới sự chỉ đạo của Nữ tướng Nguyễn Thị Định, lan nhanh khắp Nam Bộ và Tây Nguyên.',
      'Quần chúng nổi dậy với vũ khí thô sơ, kết hợp "Đội quân tóc dài", diệt ác ôn, phá đồn bốt, giải tán tề ngụy.',
      'Hệ thống chính quyền cơ sở địch bị phá vỡ từng mảng lớn, thành lập Ủy ban nhân dân tự quản và chia ruộng đất cho dân nghèo.',
      'Ngày 20/12/1960: Mặt trận Dân tộc Giải phóng miền Nam Việt Nam chính thức được thành lập tại Tây Ninh.'
    ],
    significance: 'Giáng đòn chí mạng vào chiến lược Thực dân mới của Mỹ, làm phá sản hình thức thống trị bằng tay sai Ngô Đình Diệm; đánh dấu bước phát triển nhảy vọt: chuyển cách mạng miền Nam từ thế giữ gìn lực lượng sang thế tiến công.',
    examTips: 'Câu hỏi phân loại: Ý nghĩa lớn nhất của Đồng Khởi là gì? Đáp án chuẩn: "Chuyển cách mạng miền Nam từ thế giữ gìn lực lượng sang thế tiến công liên tục".',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Đội quân tóc dài Bến Tre - Biểu tượng bất khuất của phong trào Đồng Khởi hào hùng năm 1960.',
    keyFigures: ['Nguyễn Thị Định', 'Luật sư Nguyễn Hữu Thọ', 'Chủ tịch Hồ Chí Minh'],
    tags: ['Đồng Khởi', 'Bến Tre', 'Nghị quyết 15', 'Mặt trận DTGPMNVN'],
    relatedQuizId: 'quiz-khang-chien-my',
    relatedResourceId: 'res-slide-khang-chien-my'
  },
  {
    id: 'mau-than-1968',
    year: '1968',
    numericYear: 1968,
    exactDate: '30/01/1968 - Cuối 1968',
    title: 'Cuộc Tổng Tiến Công & Nổi Dậy Tết Mậu Thân 1968: Rung Chuyển Nước Mỹ',
    period: 'khang-chien-my-1954-1975',
    periodLabel: 'K/c Chống Mỹ (1954 - 1975)',
    gradeLevel: '12',
    summary: 'Đòn sấm sét đánh thẳng vào các đô thị, sào huyệt trung tâm đầu não của Mỹ - Ngụy, làm rung chuyển nước Mỹ và đảo lộn toàn bộ cục diện chiến tranh.',
    context: 'Sau thất bại của hai cuộc phản công chiến lược mùa khô (1965-1966 và 1966-1967), Mỹ lâm vào thế phòng ngự bị động. Ta chọn thời điểm Tết Mậu Thân bất ngờ mở cuộc tập kích quy mô lớn.',
    keyPoints: [
      'Đêm 30 rạng ngày 31/1/1968, quân và dân ta đồng loạt nổ súng đánh vào 37/44 thị xã, 4/6 đô thị lớn toàn miền Nam.',
      'Tại Sài Gòn, biệt động tấn công táo bạo vào Tòa Đại sứ Mỹ, Dinh Độc Lập, Bộ Tổng tham mưu ngụy, Đài phát thanh.',
      'Cuộc chiến đấu giữ Thành cổ Huế kiên cường suốt 25 ngày đêm dưới mưa bom bão đạn.',
      'Dư luận nhân dân Mỹ phản chiến lên cao trào chưa từng thấy, đòi rút quân về nước.'
    ],
    significance: 'Làm phá sản hoàn toàn chiến lược "Chiến tranh cục bộ" của Mỹ, buộc Tổng thống Johnson phải tuyên bố ngừng ném bom miền Bắc từ vĩ tuyến 20 trở ra, chấp nhận ngồi vào bàn đàm phán tại Paris.',
    examTips: 'Điểm cốt tử thi THPT: Ý nghĩa bước ngoặt của Mậu Thân 1968 là "Buộc Mỹ phải chấp nhận đàm phán tại Paris và tuyên bố phi Mỹ hóa chiến tranh".',
    imageUrl: 'https://images.unsplash.com/photo-1533158307587-828f0a76ef46?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Biệt động Sài Gòn quả cảm tấn công các mục tiêu sào huyệt địch trong chiến dịch Tết Mậu Thân 1968.',
    keyFigures: ['Chủ tịch Hồ Chí Minh', 'Đại tướng Võ Nguyên Giáp', 'Trung tướng Trần Văn Trà'],
    tags: ['Mậu Thân 1968', 'Chiến tranh cục bộ', 'Đàm phán Paris', 'Đô thị miền Nam'],
    relatedQuizId: 'quiz-khang-chien-my',
    relatedResourceId: 'res-slide-khang-chien-my'
  },
  {
    id: 'dien-bien-phu-tren-khong-1972',
    year: '1972',
    numericYear: 1972,
    exactDate: '18/12/1972 - 29/12/1972',
    title: 'Trận "Điện Biên Phủ Trên Không" 12 Ngày Đêm: Bẻ Gãy Pháo Đài Bay B-52',
    period: 'khang-chien-my-1954-1975',
    periodLabel: 'K/c Chống Mỹ (1954 - 1975)',
    gradeLevel: '12',
    summary: 'Cuộc đọ sức thần kỳ của quân và dân Hà Nội đập tan chiến dịch tập kích đường không bằng B-52 của đế quốc Mỹ, buộc Mỹ phải ký Hiệp định Paris rút toàn bộ quân viễn chinh về nước.',
    context: 'Tháng 12/1972, sau thất bại trên bàn đàm phán, Tổng thống Nixon mở cuộc tập kích chiến lược đường không Linebacker II bằng máy bay B-52 hòng "đưa miền Bắc về thời kỳ đồ đá".',
    keyPoints: [
      'Quân dân miền Bắc, nòng cốt là Bộ đội Phòng không - Không quân, lập lưới lửa phòng không nhiều tầng nhiều lớp bắn rơi hàng chục siêu pháo đài bay.',
      'Đêm 27/12: Phi công Phạm Tuân bắn rơi B-52 bằng máy bay MiG-21 trên bầu trời Mộc Châu.',
      'Tổng kết 12 ngày đêm: Ta bắn rơi 81 máy bay (trong đó có 34 chiếc B-52, 5 chiếc F-111 cánh cụp cánh xòe), bắt sống hàng chục giặc lái Mỹ.',
      'Sáng 30/12/1972: Tổng thống Mỹ Nixon tuyên bố ngừng ném bom từ vĩ tuyến 20 trở ra và đề nghị nối lại đàm phán.'
    ],
    significance: 'Là thắng lợi quân sự trực tiếp quyết định buộc Mỹ phải ký Hiệp định Paris (27/1/1973), hoàn thành xuất sắc mục tiêu chiến lược "Đánh cho Mỹ cút".',
    examTips: 'Lưu ý phân biệt: Trận Điện Biên Phủ 1954 buộc Pháp ký Giơ-ne-vơ; còn trận Điện Biên Phủ trên không 1972 buộc Mỹ ký Hiệp định Paris rút quân về nước.',
    imageUrl: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Lưới lửa phòng không rực sáng bầu trời Hà Nội 12 ngày đêm tháng 12 năm 1972 quật ngã pháo đài bay B-52.',
    keyFigures: ['Phi công Phạm Tuân', 'Phi công Vũ Xuân Thiều', 'Bộ đội Tên lửa SAM-2'],
    tags: ['Điện Biên Phủ trên không', 'B-52', 'Hiệp định Paris 1973', 'Hà Nội 1972'],
    relatedQuizId: 'quiz-khang-chien-my',
    relatedResourceId: 'res-de-cuong-thpt-quoc-gia-2026'
  },
  {
    id: 'dai-thang-mua-xuan-1975',
    year: '1975',
    numericYear: 1975,
    exactDate: '04/03/1975 - 30/04/1975',
    title: 'Đại Thắng Mùa Xuân 1975 & Chiến Dịch Hồ Chí Minh: Thu Non Sông Về Một Mối',
    period: 'khang-chien-my-1954-1975',
    periodLabel: 'K/c Chống Mỹ (1954 - 1975)',
    gradeLevel: '12',
    summary: 'Cuộc Tổng tiến công và nổi dậy thần tốc, táo bạo, bất ngờ giải phóng hoàn toàn miền Nam, thống nhất non sông đất nước, kết thúc 30 năm chiến tranh giải phóng dân tộc.',
    context: 'Sau Hiệp định Paris 1973, tương quan lực lượng thay đổi căn bản có lợi cho ta. Hội nghị Bộ Chính trị quyết định kế hoạch giải phóng miền Nam trong hai năm 1975 - 1976, nếu thời cơ đến sẽ giải phóng ngay trong năm 1975.',
    keyPoints: [
      'Chiến dịch Tây Nguyên (4/3 - 24/3): Trận then chốt Buôn Ma Thuột giáng đòn điểm huyệt, địch hoảng loạn rút chạy tan tác.',
      'Chiến dịch Huế - Đà Nẵng (21/3 - 29/3): Quét sạch quân đoàn 1 ngụy, mở toang hành lang tiến vào Sài Gòn.',
      'Mệnh lệnh lịch sử của Đại tướng Võ Nguyên Giáp: "Thần tốc, thần tốc hơn nữa; táo bạo, táo bạo hơn nữa; tranh thủ từng giờ, từng phút, xốc tới chiến trường giải phóng miền Nam!".',
      'Chiến dịch Hồ Chí Minh (26/4 - 30/4): 5 cánh quân đồng loạt tiến vào trung tâm Sài Gòn. Đúng 11h30 ngày 30/4/1975, xe tăng số 390 húc đổ cổng Dinh Độc Lập, cờ giải phóng bay phấp phới.'
    ],
    significance: 'Kết thúc oanh liệt 21 năm kháng chiến chống Mỹ và 30 năm chiến tranh giải phóng dân tộc; bảo vệ toàn vẹn lãnh thổ thiêng liêng, non sông thống nhất, mở ra kỷ nguyên độc lập, tự do và đi lên Chủ nghĩa Xã hội.',
    examTips: 'Trọng tâm thi THPT: Thứ tự 3 chiến dịch lớn (Tây Nguyên -> Huế-Đà Nẵng -> Chiến dịch Hồ Chí Minh); Ý nghĩa trận then chốt Buôn Ma Thuột (chuyển từ tiến công chiến lược sang tổng tiến công chiến lược).',
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80',
    imageCaption: '11 giờ 30 phút trưa ngày 30/4/1975 - Xe tăng Quân giải phóng húc đổ cổng Dinh Độc Lập, non sông trọn niềm vui.',
    keyFigures: ['Đại tướng Võ Nguyên Giáp', 'Đại tướng Văn Tiến Dũng', 'Trung tướng Lê Trọng Tấn', 'Đại đội trưởng Bùi Quang Thận'],
    tags: ['Đại thắng mùa Xuân 1975', 'Chiến dịch Hồ Chí Minh', 'Dinh Độc Lập', 'Thống nhất non sông'],
    relatedQuizId: 'quiz-khang-chien-my',
    relatedResourceId: 'res-slide-khang-chien-my'
  },
  {
    id: 'doi-moi-1986',
    year: '1986',
    numericYear: 1986,
    exactDate: '15/12/1986 - 18/12/1986',
    title: 'Đại Hội Đảng Lần Thứ VI (1986): Khởi Xướng Công Cuộc Đổi Mới Toàn Diện',
    period: 'doi-moi-1975-nay',
    periodLabel: 'Đổi Mới & Hội Nhập (1975 - Nay)',
    gradeLevel: '12',
    summary: 'Bước ngoặt lịch sử mở đường cho dân tộc Việt Nam vượt qua khủng hoảng kinh tế - xã hội, chuyển từ cơ chế tập trung quan liêu bao cấp sang nền kinh tế thị trường định hướng XHCN.',
    context: 'Sau 10 năm thống nhất (1975 - 1985), đất nước lâm vào khủng hoảng kinh tế - xã hội trầm trọng do áp dụng máy móc mô hình bao cấp. Yêu cầu đổi mới trở thành mệnh lệnh sống còn.',
    keyPoints: [
      'Đại hội nhìn thẳng vào sự thật, đánh giá đúng sự thật, nói rõ sự thật và đề ra đường lối đổi mới toàn diện.',
      'Trọng tâm đổi mới: Đổi mới kinh tế là then chốt, đồng thời từng bước đổi mới chính trị.',
      'Xóa bỏ cơ chế quản lý tập trung quan liêu, bao cấp; xây dựng nền kinh tế nhiều thành phần vận hành theo cơ chế thị trường định hướng XHCN.',
      'Thực hiện ba chương trình kinh tế lớn: Lương thực - thực phẩm, Hàng tiêu dùng và Hàng xuất khẩu.'
    ],
    significance: 'Cứu nguy đất nước thoát khỏi khủng hoảng, tạo tiền đề vững chắc để Việt Nam hội nhập quốc tế sâu rộng, nâng cao đời sống nhân dân và củng cố vị thế đất nước trên trường quốc tế.',
    examTips: 'Từ khóa thi tốt nghiệp THPT: "Đổi mới kinh tế là trọng tâm", "Xóa bỏ bao cấp", "3 chương trình kinh tế lớn", "Đại hội VI tháng 12/1986".',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Kỷ nguyên Đổi mới bắt đầu từ Đại hội VI (1986) đưa đất nước vươn mình phát triển mạnh mẽ.',
    keyFigures: ['Tổng Bí thư Nguyễn Văn Linh', 'Tổng Bí thư Trường Chinh', 'Thủ tướng Võ Văn Kiệt'],
    tags: ['Đại hội VI', 'Đổi mới 1986', 'Kinh tế thị trường', 'Hội nhập quốc tế'],
    relatedQuizId: 'quiz-the-gioi-ianta',
    relatedResourceId: 'res-so-do-tu-duy-7-thoi-ky'
  },
  {
    id: 'nguyen-tat-thanh-1911',
    year: '1911',
    numericYear: 1911,
    exactDate: '05/06/1911',
    title: 'Người Thanh Niên Nguyễn Tất Thành Ra Đi Tìm Đường Cứu Nước',
    period: 'vietnam-1858-1945',
    periodLabel: 'Thời kỳ 1858 - 1945',
    gradeLevel: '11',
    summary: 'Từ Bến cảng Nhà Rồng, người thanh niên Nguyễn Tất Thành quyết định sang phương Tây để tìm con đường cứu nước mới đúng đắn cho dân tộc Việt Nam.',
    context: 'Các phong trào yêu nước theo khuynh hướng phong kiến (Cần Vương) và dân chủ tư sản (Đông Du, Duy Tân) đầu thế kỷ XX đều lần lượt thất bại. Cách mạng Việt Nam lâm vào cuộc khủng hoảng sâu sắc về đường lối cứu nước và giai cấp lãnh đạo.',
    keyPoints: [
      'Ngày 5/6/1911, trên con tàu Đô đốc Latouche-Tréville, Nguyễn Tất Thành lấy tên Văn Ba bắt đầu hành trình bôn ba khắp năm châu.',
      'Khác với các bậc tiền bối sang phương Đông (Nhật Bản, Trung Quốc), Người chọn sang phương Tây để tìm hiểu ngọn nguồn tự do, bình đẳng, bác ái.',
      'Hành trình qua nhiều châu lục giúp Người nhận thức sâu sắc: Ở đâu bọn đế quốc thực dân cũng tàn bạo, ở đâu người lao động cùng khổ cũng là bạn bè.',
      'Tháng 7/1920: Người đọc Sơ thảo lần thứ nhất Luận cương của Lênin về vấn đề dân tộc và thuộc địa, tìm ra con đường cứu nước duy nhất: Cách mạng vô sản.'
    ],
    significance: 'Mở đầu quá trình chuẩn bị toàn diện về tư tưởng, chính trị và tổ chức cho sự ra đời của Đảng Cộng sản Việt Nam năm 1930; chuyển hướng phong trào giải phóng dân tộc Việt Nam gắn liền với phong trào công nhân quốc tế.',
    examTips: 'Câu hỏi phân hóa Khối 11 & 12: Điểm khác biệt lớn nhất giữa Nguyễn Tất Thành và các bậc tiền bối tiền trạm (Phan Bội Châu, Phan Châu Trinh) về hướng đi và cách tiếp cận chân lý cứu nước.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Bến cảng Nhà Rồng (Sài Gòn) - Nơi ghi dấu sự kiện lịch sử ngày 5 tháng 6 năm 1911 Người ra đi tìm đường cứu nước.',
    keyFigures: ['Nguyễn Tất Thành (Chủ tịch Hồ Chí Minh)', 'V.I. Lênin'],
    tags: ['Bến cảng Nhà Rồng', 'Tìm đường cứu nước', '1911', 'Lịch sử 11 & 12'],
    relatedQuizId: 'quiz-the-gioi-ianta',
    relatedResourceId: 'res-de-cuong-lop-11'
  },
  {
    id: 'hoi-nghi-ianta-1945',
    year: '1945 (TG)',
    numericYear: 1945,
    exactDate: '04/02/1945 - 11/02/1945',
    title: 'Hội Nghị Ianta & Sự Xác Lập Trật Tự Hai Cực: Nền Tảng Quan Hệ Quốc Tế Sau CTTG II',
    period: 'the-gioi-hien-dai',
    periodLabel: 'Lịch Sử Thế Giới Hiện Đại',
    gradeLevel: '12',
    summary: 'Hội nghị lịch sử giữa 3 cường quốc (Liên Xô, Mỹ, Anh) phân chia khu vực ảnh hưởng và đặt nền móng cho trật tự thế giới mới và sự ra đời của Liên Hợp Quốc.',
    context: 'Đầu năm 1945, Chiến tranh thế giới thứ hai bước vào giai đoạn kết thúc. Nhiều vấn đề cấp bách đặt ra trước các nước Đồng minh: tiêu diệt tận gốc chủ nghĩa phát xít, phân chia khu vực đóng quân và thiết lập trật tự hòa bình.',
    keyPoints: [
      'Ba vị nguyên thủ đại diện: J. Stalin (Liên Xô), F. Roosevelt (Mỹ), W. Churchill (Anh).',
      'Thỏa thuận thành lập tổ chức Liên Hợp Quốc nhằm duy trì hòa bình và an ninh thế giới.',
      'Phân chia khu vực chiếm đóng và phạm vi ảnh hưởng ở châu Âu (Đông Đức/Đông Âu thuộc Liên Xô; Tây Đức/Tây Âu thuộc Mỹ-Anh).',
      'Ở châu Á: Chấp nhận các điều kiện của Liên Xô tham chiến chống Nhật; Đông Nam Á vẫn thuộc phạm vi ảnh hưởng truyền thống của các nước phương Tây.'
    ],
    significance: 'Những quyết định của Hội nghị Ianta cùng thỏa thuận Potsdam đã trở thành khuôn khổ của trật tự thế giới mới - "Trật tự hai cực Ianta" do hai siêu cường Liên Xô và Mỹ đứng đầu chi phối suốt nửa sau thế kỷ XX.',
    examTips: 'Câu hỏi phân hóa: Phân biệt phạm vi ảnh hưởng giữa châu Âu và châu Á theo Ianta; Lý do tại sao Đông Nam Á vẫn thuộc phương Tây (tạo điều kiện cho Pháp quay lại xâm lược Đông Dương năm 1945).',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    imageCaption: 'Hội nghị Ianta tháng 2/1945 với ba nguyên thủ Churchill, Roosevelt và Stalin phân định trật tự thế giới mới.',
    keyFigures: ['J. Stalin', 'F. Roosevelt', 'W. Churchill'],
    tags: ['Ianta', 'Trật tự 2 cực', 'Liên Hợp Quốc', 'Lịch sử thế giới'],
    relatedQuizId: 'quiz-the-gioi-ianta',
    relatedResourceId: 'res-so-do-tu-duy-7-thoi-ky'
  }
];
