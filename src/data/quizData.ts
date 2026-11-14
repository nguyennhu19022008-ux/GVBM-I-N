export type QuestionType = 'single_choice' | 'true_false_group';

export interface TrueFalseStatement {
  id: 'a' | 'b' | 'c' | 'd';
  statement: string;
  isCorrect: boolean;
  explanation: string;
}

export interface QuizQuestion {
  id: number;
  type?: QuestionType; // Mặc định 'single_choice'
  stimulus?: string; // Đoạn trích tư liệu lịch sử cho đề thi THPT 2026 mới
  question: string;
  options?: string[]; // Dùng cho single_choice
  correctAnswer?: number; // Dùng cho single_choice (0, 1, 2, 3)
  statements?: TrueFalseStatement[]; // Dùng cho true_false_group (Phần II)
  explanation: string;
  topic: string;
}

export interface QuizExam {
  id: string;
  title: string;
  topicLabel: string;
  description: string;
  timeLimitMinutes: number;
  gradeLevel: '10' | '11' | '12';
  questionsCount: number;
  difficulty: 'Cơ Bản' | 'Vận Dụng' | 'Phân Hóa 8-9-10';
  questions: QuizQuestion[];
}

export type TrueFalseGroupAnswer = Record<'a' | 'b' | 'c' | 'd', boolean | undefined>;
export type StudentAnswer = number | TrueFalseGroupAnswer;
export type SelectedAnswersState = Record<number, StudentAnswer>;

export type QuestionCompletionStatus = 'unattempted' | 'partially_answered' | 'fully_answered';

export const getQuestionCompletionStatus = (
  q: QuizQuestion,
  ans: StudentAnswer | undefined
): QuestionCompletionStatus => {
  if (ans === undefined || ans === null) return 'unattempted';
  if (q.type === 'true_false_group') {
    const group = ans as TrueFalseGroupAnswer;
    const statements = q.statements || [];
    if (statements.length === 0) return 'unattempted';
    const answeredCount = statements.filter((st) => group[st.id] !== undefined).length;
    if (answeredCount === 0) return 'unattempted';
    if (answeredCount === statements.length) return 'fully_answered';
    return 'partially_answered';
  }
  return typeof ans === 'number' ? 'fully_answered' : 'unattempted';
};

/**
 * Thuật toán tính điểm hỗn hợp chuẩn cấu trúc Bộ GD&ĐT (Đề thi tốt nghiệp THPT mới):
 * - Phần I (Trắc nghiệm 4 lựa chọn): Mỗi câu đúng được 1 điểm quy đổi.
 * - Phần II (Trắc nghiệm Đúng/Sai đa mệnh đề):
 *   + Đúng 1 ý: 0.10 điểm
 *   + Đúng 2 ý: 0.25 điểm
 *   + Đúng 3 ý: 0.50 điểm
 *   + Đúng cả 4 ý: 1.00 điểm
 */
export const calculateExamScore = (
  questions: QuizQuestion[],
  answers: SelectedAnswersState
): {
  score: number;
  maxScore: number;
  normalizedScore: string;
  fullyCorrectQuestionsCount: number;
  correctStatementsTotal: number;
} => {
  let earnedPoints = 0;
  let maxPossiblePoints = 0;
  let fullyCorrectQuestionsCount = 0;
  let correctStatementsTotal = 0;

  questions.forEach((q) => {
    if (q.type === 'true_false_group') {
      maxPossiblePoints += 1.0;
      const userGroup = (answers[q.id] as TrueFalseGroupAnswer) || {};
      const statements = q.statements || [];
      let statementMatches = 0;

      statements.forEach((st) => {
        if (typeof userGroup[st.id] === 'boolean' && userGroup[st.id] === st.isCorrect) {
          statementMatches += 1;
          correctStatementsTotal += 1;
        }
      });

      if (statementMatches === 1) earnedPoints += 0.10;
      else if (statementMatches === 2) earnedPoints += 0.25;
      else if (statementMatches === 3) earnedPoints += 0.50;
      else if (statementMatches === 4) earnedPoints += 1.00;

      if (statementMatches === statements.length && statements.length > 0) {
        fullyCorrectQuestionsCount += 1;
      }
    } else {
      maxPossiblePoints += 1.0;
      const userAns = answers[q.id] as number | undefined;
      if (typeof userAns === 'number' && userAns === q.correctAnswer) {
        earnedPoints += 1.0;
        fullyCorrectQuestionsCount += 1;
        correctStatementsTotal += 1;
      }
    }
  });

  const normalized = maxPossiblePoints > 0 ? ((earnedPoints / maxPossiblePoints) * 10).toFixed(1) : '0.0';
  return {
    score: Number(earnedPoints.toFixed(2)),
    maxScore: maxPossiblePoints,
    normalizedScore: normalized,
    fullyCorrectQuestionsCount,
    correctStatementsTotal
  };
};

export const QUIZ_EXAMS: QuizExam[] = [
  {
    id: 'quiz-khang-chien-phap',
    title: 'Đề Số 01: Kháng Chiến Chống Thực Dân Pháp (1945 - 1954)',
    topicLabel: 'K/c Chống Pháp & Điện Biên Phủ',
    description: 'Bộ 10 câu hỏi chuẩn bám sát các chiến dịch Việt Bắc, Biên Giới, Kế hoạch Nava và Chiến thắng lịch sử Điện Biên Phủ.',
    timeLimitMinutes: 15,
    gradeLevel: '12',
    questionsCount: 10,
    difficulty: 'Cơ Bản',
    questions: [
      {
        id: 1,
        type: 'single_choice',
        question: 'Chiến thắng nào của quân dân ta đã làm phá sản hoàn toàn Kế hoạch Nava của thực dân Pháp?',
        options: [
          'A. Chiến dịch Việt Bắc thu - đông 1947.',
          'B. Chiến dịch Biên giới thu - đông 1950.',
          'C. Cuộc Tiến công chiến lược Đông - Xuân 1953 - 1954.',
          'D. Chiến dịch lịch sử Điện Biên Phủ 1954.'
        ],
        correctAnswer: 3,
        explanation: 'Chiến thắng lịch sử Điện Biên Phủ (7/5/1954) đã giáng đòn quyết định đập tan hoàn toàn ý chí xâm lược của Pháp và can thiệp Mỹ, làm phá sản hoàn toàn Kế hoạch Nava (vốn đã bị bước đầu phá sản trong Đông - Xuân 1953 - 1954).',
        topic: 'Chiến dịch Điện Biên Phủ'
      },
      {
        id: 2,
        type: 'single_choice',
        question: 'Nghệ thuật quân sự nổi bật nhất được Đại tướng Võ Nguyên Giáp chỉ đạo trong Chiến dịch Điện Biên Phủ 1954 là:',
        options: [
          'A. Chuyển phương châm từ "Đánh nhanh thắng nhanh" sang "Đánh chắc tiến chắc".',
          'B. Đánh điểm diệt viện kết hợp tập kích đường không.',
          'C. Đánh vu hồi, luồn sâu vào hậu phương tiêu diệt đầu não địch.',
          'D. Tổng công kích đồng loạt trên khắp các chiến trường Đông Dương.'
        ],
        correctAnswer: 0,
        explanation: 'Đây được coi là "quyết định lịch sử khó khăn nhất trong cuộc đời chỉ huy" của Đại tướng Võ Nguyên Giáp. Chuyển từ "đánh nhanh thắng nhanh" sang "đánh chắc tiến chắc" giúp quân ta kéo pháo ra chuẩn bị trận địa công sự vững chắc, bảo toàn lực lượng và đảm bảo chắc thắng 100%.',
        topic: 'Nghệ thuật tác chiến Điện Biên Phủ'
      },
      {
        id: 3,
        type: 'single_choice',
        question: 'Ý nghĩa quan trọng nhất của Chiến dịch Biên giới thu - đông 1950 là gì?',
        options: [
          'A. Buộc thực dân Pháp phải chuyển sang chiến lược "đánh lâu dài".',
          'B. Quân ta giành được thế chủ động trên chiến trường chính Bắc Bộ.',
          'C. Giải phóng hoàn toàn vùng đồng bằng sông Hồng.',
          'D. Buộc Mỹ phải chấm dứt viện trợ quân sự cho Pháp.'
        ],
        correctAnswer: 1,
        explanation: 'Chiến dịch Biên giới thu - đông 1950 là chiến dịch đầu tiên do ta chủ động mở, mở toang cánh cửa liên lạc với các nước XHCN và quan trọng nhất: quân đội ta đã giành được thế chủ động chiến lược trên chiến trường chính Bắc Bộ.',
        topic: 'Chiến dịch Biên giới 1950'
      },
      {
        id: 4,
        type: 'single_choice',
        question: 'Văn kiện nào sau đây được coi là Cương lĩnh kháng chiến toàn diện đầu tiên của Đảng ta?',
        options: [
          'A. Báo cáo "Bàn về Cách mạng Việt Nam" tại Đại hội II (1951).',
          'B. Tác phẩm "Kháng chiến nhất định thắng lợi" của đồng chí Trường Chinh (1947).',
          'C. Chỉ thị "Toàn dân kháng chiến" của Ban Thường vụ Trung ương Đảng (12/1946).',
          'D. Lời kêu gọi toàn quốc kháng chiến của Chủ tịch Hồ Chí Minh (19/12/1946).'
        ],
        correctAnswer: 1,
        explanation: 'Tác phẩm "Kháng chiến nhất định thắng lợi" của Tổng Bí thư Trường Chinh (xuất bản tháng 9/1947) đã giải thích cụ thể, hoàn chỉnh và sâu sắc đường lối kháng chiến toàn dân, toàn diện, trường kỳ, tự lực cánh sinh và tranh thủ sự ủng hộ quốc tế.',
        topic: 'Đường lối kháng chiến chống Pháp'
      },
      {
        id: 5,
        type: 'single_choice',
        question: 'Trong Kế hoạch Nava (1953), thực dân Pháp chủ trương tập trung quân ở đâu trong bước 1?',
        options: [
          'A. Điện Biên Phủ.',
          'B. Đồng bằng Bắc Bộ.',
          'C. Thượng Lào.',
          'D. Nam Tây Nguyên.'
        ],
        correctAnswer: 1,
        explanation: 'Ban đầu trong bước 1 Kế hoạch Nava, Pháp tập trung khối cơ động chiến lược lên tới 44 tiểu đoàn cơ động tại Đồng bằng Bắc Bộ để phòng ngự chiến lược. Về sau, do các đòn tiến công của ta trong Đông - Xuân 1953 - 1954, Nava mới bị động phân tán lực lượng và xây dựng Điện Biên Phủ thành nơi tập trung quân thứ hai.',
        topic: 'Kế hoạch Nava'
      },
      {
        id: 6,
        type: 'single_choice',
        question: 'Ai là người anh hùng đã lấy thân mình chèn lưng cứu khẩu pháo trong Chiến dịch Điện Biên Phủ?',
        options: [
          'A. Bế Văn Đàn.',
          'B. Phan Đình Giót.',
          'C. Tô Vĩnh Diện.',
          'D. Cù Chính Lan.'
        ],
        correctAnswer: 2,
        explanation: 'Anh hùng Tô Vĩnh Diện đã hi sinh anh dũng lấy thân mình chèn bánh pháo trên dốc Chuối hiểm trở, không để khẩu pháo cao xạ 37mm lao xuống vực sâu trong quá trình kéo pháo vào trận địa Điện Biên Phủ.',
        topic: 'Gương chiến đấu Điện Biên Phủ'
      },
      {
        id: 7,
        type: 'single_choice',
        question: 'Hiệp định Giơ-ne-vơ năm 1954 về Đông Dương quy định ranh giới quân sự tạm thời giữa hai miền Việt Nam tại:',
        options: [
          'A. Vĩ tuyến 16.',
          'B. Vĩ tuyến 17 (sông Bến Hải, Quảng Trị).',
          'C. Đèo Hải Vân.',
          'D. Sông Gianh (Quảng Bình).'
        ],
        correctAnswer: 1,
        explanation: 'Điều 1 Hiệp định Giơ-ne-vơ 1954 quy định: Một giới tuyến quân sự tạm thời được ấn định dọc theo sông Bến Hải (vĩ tuyến 17) để lực lượng hai bên tập kết quân đội, và giới tuyến này tuyệt đối không được coi là biên giới chính trị hay lãnh thổ.',
        topic: 'Hiệp định Giơ-ne-vơ 1954'
      },
      {
        id: 8,
        type: 'single_choice',
        question: 'Đại hội đại biểu lần thứ II của Đảng (2/1951) đã quyết định đổi tên Đảng thành:',
        options: [
          'A. Đảng Cộng sản Việt Nam.',
          'B. Đảng Lao động Việt Nam.',
          'C. Đảng Cộng sản Đông Dương.',
          'D. Mặt trận Dân tộc Giải phóng.'
        ],
        correctAnswer: 1,
        explanation: 'Đại hội II của Đảng họp tại Chiêm Hóa (Tuyên Quang) tháng 2/1951 đã quyết định đưa Đảng ra hoạt động công khai với tên gọi Đảng Lao động Việt Nam, đáp ứng yêu cầu lãnh đạo cuộc kháng chiến đến thắng lợi.',
        topic: 'Đại hội Đảng lần II (1951)'
      },
      {
        id: 9,
        type: 'single_choice',
        question: 'Điểm cốt lõi nào chứng minh Điện Biên Phủ 1954 là thắng lợi mang tầm vóc thời đại?',
        options: [
          'A. Lần đầu tiên quân đội một nước thuộc địa nhỏ bé đánh bại quân đội viễn chinh của một đế quốc thực dân hùng mạnh.',
          'B. Kết thúc sự tồn tại của chủ nghĩa tư bản trên phạm vi toàn cầu.',
          'C. Buộc tất cả các nước tư bản phải rút khỏi Đông Nam Á.',
          'D. Làm giải thể tổ chức quân sự NATO.'
        ],
        correctAnswer: 0,
        explanation: 'Điện Biên Phủ được ghi vào lịch sử thế giới như một mốc son chói lọi, là tiếng chuông báo tử cho chủ nghĩa thực dân cũ, cổ vũ mãnh liệt phong trào giải phóng dân tộc ở Á, Phi và Mỹ Latinh.',
        topic: 'Ý nghĩa thời đại của Điện Biên Phủ'
      },
      {
        id: 10,
        type: 'single_choice',
        question: 'Hiệp định Giơ-ne-vơ 1954 công nhận các quyền dân tộc cơ bản của ba nước Đông Dương gồm:',
        options: [
          'A. Độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ.',
          'B. Tự do, dân chủ, ấm no và hòa bình.',
          'C. Không liên kết, giải trừ quân bị và thương mại tự do.',
          'D. Tự quyết dân tộc và quyền gia nhập Liên Hợp Quốc.'
        ],
        correctAnswer: 0,
        explanation: 'Điều khoản pháp lý quốc tế quan trọng nhất của Hiệp định Giơ-ne-vơ là các nước tham dự hội nghị cam kết tôn trọng độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ của ba nước Việt Nam, Lào, Campuchia.',
        topic: 'Quyền dân tộc cơ bản'
      }
    ]
  },
  {
    id: 'quiz-khang-chien-my',
    title: 'Đề Số 02: Kháng Chiến Chống Mỹ Cứu Nước (1954 - 1975) — Cấu Trúc THPT Mới',
    topicLabel: 'K/c Chống Mỹ & Đại Thắng Mùa Xuân',
    description: '12 câu hỏi trắc nghiệm gồm câu hỏi lựa chọn đơn và câu hỏi trắc nghiệm Đúng/Sai đa mệnh đề phân tích 4 chiến lược chiến tranh, Hiệp định Paris và Chiến dịch Hồ Chí Minh.',
    timeLimitMinutes: 18,
    gradeLevel: '12',
    questionsCount: 12,
    difficulty: 'Phân Hóa 8-9-10',
    questions: [
      {
        id: 1,
        type: 'single_choice',
        question: 'Phong trào "Đồng Khởi" (1959 - 1960) ở miền Nam Việt Nam nổ ra mạnh mẽ và tiêu biểu nhất tại địa phương nào?',
        options: [
          'A. Huyện Mỏ Cày, tỉnh Bến Tre.',
          'B. Huyện Củ Chi, tỉnh Gia Định.',
          'C. Huyện Trảng Bàng, tỉnh Tây Ninh.',
          'D. Huyện Vĩnh Lợi, tỉnh Bạc Liêu.'
        ],
        correctAnswer: 0,
        explanation: 'Phong trào nổ ra đồng loạt từ ngày 17/1/1960 tại huyện Mỏ Cày (tỉnh Bến Tre), dưới sự chỉ đạo trực tiếp của Nữ tướng Nguyễn Thị Định, sau đó nhanh chóng lan tỏa khắp Nam Bộ và Nam Trung Bộ.',
        topic: 'Phong trào Đồng Khởi 1960'
      },
      {
        id: 2,
        type: 'single_choice',
        question: 'Chiến thắng quân sự nào của quân dân miền Nam đã mở đầu cho cao trào "Tìm Mỹ mà đánh, lùng Ngụy mà diệt"?',
        options: [
          'A. Chiến thắng Ấp Bắc (1/1963).',
          'B. Chiến thắng Vạn Tường (8/1965).',
          'C. Chiến thắng Bình Giã (12/1964).',
          'D. Chiến thắng Ba Gia (5/1965).'
        ],
        correctAnswer: 1,
        explanation: 'Chiến thắng Vạn Tường (tháng 8/1965) tại Quảng Ngãi là trận đọ sức trực diện đầu tiên giữa quân giải phóng và lính thủy đánh bộ Mỹ, chứng minh quân dân ta hoàn toàn có khả năng đánh bại quân viễn chinh Mỹ trong "Chiến tranh cục bộ".',
        topic: 'Chiến thắng Vạn Tường 1965'
      },
      {
        id: 3,
        type: 'true_false_group',
        stimulus: 'Đọc đoạn tư liệu sau: "Chiến tranh cục bộ (1965 - 1968) là hình thức chiến tranh xâm lược thực dân mới, được tiến hành bằng lực lượng quân viễn chinh Mỹ, quân đồng minh của Mỹ và quân đội Sài Gòn, trong đó quân Mỹ giữ vai trò nòng cốt. Quân Mỹ ồ ạt đổ vào miền Nam cùng phương tiện chiến tranh hiện đại nhằm nhanh chóng tiêu diệt bộ đội chủ lực của ta bằng hai gọng kìm Tìm diệt và Bình định."',
        question: 'Dựa vào đoạn tư liệu và kiến thức lịch sử đã học, hãy xác định tính đúng/sai của các mệnh đề sau:',
        statements: [
          {
            id: 'a',
            statement: 'Chiến lược Chiến tranh cục bộ có lực lượng chiến đấu nòng cốt là quân viễn chinh Mỹ.',
            isCorrect: true,
            explanation: 'Đúng: Quân Mỹ ồ ạt đổ bộ trực tiếp vào chiến trường miền Nam và đóng vai trò nòng cốt.'
          },
          {
            id: 'b',
            statement: 'Chiến lược này chỉ sử dụng quân viễn chinh Mỹ, hoàn toàn loại bỏ quân đội Sài Gòn khỏi chiến trường.',
            isCorrect: false,
            explanation: 'Sai: Quân đội Sài Gòn vẫn được sử dụng phối hợp chặt chẽ, chủ yếu làm nhiệm vụ bình định và kìm kẹp dân chúng.'
          },
          {
            id: 'c',
            statement: 'Hai gọng kìm chiến lược then chốt của Mỹ là "Tìm diệt" và "Bình định".',
            isCorrect: true,
            explanation: 'Đúng: Mỹ sử dụng gọng kìm "tìm diệt" nhắm vào quân chủ lực ta và "bình định" nhắm vào vùng nông thôn kiểm soát.'
          },
          {
            id: 'd',
            statement: 'Thắng lợi của phong trào Đồng Khởi (1960) đã làm phá sản hoàn toàn chiến lược Chiến tranh cục bộ.',
            isCorrect: false,
            explanation: 'Sai: Phong trào Đồng Khởi 1960 làm phá sản chiến lược Chiến tranh đơn phương; còn cuộc Tổng tiến công Tết Mậu Thân 1968 mới làm phá sản Chiến tranh cục bộ.'
          }
        ],
        explanation: 'Chiến tranh cục bộ (1965-1968) có đặc trưng là quân Mỹ làm nòng cốt, áp dụng hai gọng kìm tìm diệt và bình định, bị phá sản hoàn toàn sau đòn tiến công Mậu Thân 1968.',
        topic: 'Đặc trưng Chiến tranh cục bộ'
      },
      {
        id: 4,
        type: 'single_choice',
        question: 'Sự kiện nào đánh dấu bước ngoặt buộc Mỹ phải chuyển sang chiến lược "Việt Nam hóa chiến tranh"?',
        options: [
          'A. Thất bại trong trận "Điện Biên Phủ trên không" 1972.',
          'B. Cuộc Tổng tiến công và nổi dậy Tết Mậu Thân 1968.',
          'C. Phong trào Đồng Khởi 1960 làm tan rã chính quyền tay sai Ngô Đình Diệm.',
          'D. Hiệp định Paris năm 1973 được ký kết.'
        ],
        correctAnswer: 1,
        explanation: 'Cuộc Tổng tiến công Tết Mậu Thân 1968 đã đập tan ý chí xâm lược của Mỹ, làm phá sản hoàn toàn "Chiến tranh cục bộ", buộc Mỹ phải "phi Mỹ hóa" chiến tranh và sau đó là "Việt Nam hóa chiến tranh".',
        topic: 'Bước ngoặt Mậu Thân 1968'
      },
      {
        id: 5,
        type: 'single_choice',
        question: 'Mệnh lệnh lịch sử nổi tiếng: "Thần tốc, thần tốc hơn nữa; táo bạo, táo bạo hơn nữa..." do ai phát ra?',
        options: [
          'A. Chủ tịch Tôn Đức Thắng.',
          'B. Đồng chí Lê Duẩn.',
          'C. Đại tướng Võ Nguyên Giáp.',
          'D. Đại tướng Văn Tiến Dũng.'
        ],
        correctAnswer: 2,
        explanation: 'Ngày 7/4/1975, Đại tướng Tổng Tư lệnh Võ Nguyên Giáp đã phát đi bức điện lịch sử gửi toàn thể các cánh quân đang tiến về Sài Gòn: "Thần tốc, thần tốc hơn nữa; táo bạo, táo bạo hơn nữa; tranh thủ từng giờ từng phút, xốc tới chiến trường giải phóng miền Nam!".',
        topic: 'Chiến dịch Hồ Chí Minh'
      },
      {
        id: 6,
        type: 'single_choice',
        question: 'Trận then chốt mở màn cho Cuộc Tổng tiến công và nổi dậy mùa Xuân 1975 diễn ra tại đâu?',
        options: [
          'A. Trận Phước Long.',
          'B. Trận Buôn Ma Thuột (Chiến dịch Tây Nguyên).',
          'C. Trận đập tan phòng tuyến Xuân Lộc.',
          'D. Trận giải phóng Thành phố Huế.'
        ],
        correctAnswer: 1,
        explanation: 'Ngày 10/3/1975, quân ta bất ngờ tập kích đánh chiếm thị xã Buôn Ma Thuột - điểm huyệt hiểm yếu nhất của địch ở Tây Nguyên, mở màn thắng lợi rực rỡ cho Cuộc Tổng tiến công và nổi dậy Xuân 1975.',
        topic: 'Chiến dịch Tây Nguyên 1975'
      },
      {
        id: 7,
        type: 'single_choice',
        question: 'Hiệp định Paris năm 1973 quy định thời hạn quân viễn chinh Mỹ và đồng minh phải rút hết về nước là trong vòng bao nhiêu ngày?',
        options: [
          'A. 30 ngày.',
          'B. 60 ngày.',
          'C. 90 ngày.',
          'D. 180 ngày.'
        ],
        correctAnswer: 1,
        explanation: 'Điều 5 Hiệp định Paris 1973 quy định rõ: Trong thời hạn 60 ngày kể từ ngày ký Hiệp định, toàn bộ quân đội viễn chinh Mỹ và quân các nước đồng minh của Mỹ phải hoàn thành việc rút khỏi miền Nam Việt Nam.',
        topic: 'Hiệp định Paris 1973'
      },
      {
        id: 8,
        type: 'single_choice',
        question: 'Ai là người cắm lá cờ giải phóng trên nóc Dinh Độc Lập vào lúc 11h30 trưa ngày 30/4/1975?',
        options: [
          'A. Đại đội trưởng Bùi Quang Thận.',
          'B. Trung tướng Lê Trọng Tấn.',
          'C. Đồng chí Nguyễn Thành Trung.',
          'D. Đại tá Bùi Tín.'
        ],
        correctAnswer: 0,
        explanation: 'Đại đội trưởng xe tăng Bùi Quang Thận đã chạy lên tầng thượng Dinh Độc Lập, hạ cờ ba que của chính quyền ngụy và giương cao lá cờ nửa đỏ nửa xanh của Mặt trận Dân tộc Giải phóng miền Nam lúc 11h30 ngày 30/4/1975.',
        topic: 'Mốc son 30/4/1975'
      },
      {
        id: 9,
        type: 'single_choice',
        question: 'Thắng lợi nào đã hoàn thành mục tiêu chiến lược "Đánh cho Mỹ cút" của Chủ tịch Hồ Chí Minh?',
        options: [
          'A. Thắng lợi trận Vạn Tường 1965.',
          'B. Ký kết Hiệp định Paris ngày 27/01/1973.',
          'C. Chiến thắng Buôn Ma Thuột tháng 3/1975.',
          'D. Chiến dịch Hồ Chí Minh toàn thắng ngày 30/4/1975.'
        ],
        correctAnswer: 1,
        explanation: 'Hiệp định Paris 1973 buộc quân viễn chinh Mỹ phải rút hoàn toàn về nước, ta đã hoàn thành xuất sắc mục tiêu "Đánh cho Mỹ cút", tạo so sánh lực lượng áp đảo để chuyển sang mục tiêu "Đánh cho ngụy nhào" năm 1975.',
        topic: 'Lời dạy của Bác Hồ'
      },
      {
        id: 10,
        type: 'single_choice',
        question: 'Tuyến đường vận tải chiến lược chi viện sức người sức của từ hậu phương miền Bắc cho tiền tuyến miền Nam mang tên gì?',
        options: [
          'A. Đường 1A huyết mạch.',
          'B. Đường Hồ Chí Minh (Đường Trường Sơn trên bộ và đường mòn trên biển).',
          'C. Đường 9 Nam Lào.',
          'D. Tuyến đường sắt Bắc Nam.'
        ],
        correctAnswer: 1,
        explanation: 'Đoàn 559 (thành lập 19/5/1959) mở đường Trường Sơn huyền thoại trên bộ và Đoàn 759 mở đường Hồ Chí Minh trên biển chi viện liên tục vũ khí, đạn dược, bộ đội cho chiến trường miền Nam.',
        topic: 'Đường Trường Sơn huyền thoại'
      },
      {
        id: 11,
        type: 'single_choice',
        question: 'Chiến dịch nào đã giáng đòn quyết định đập tan phòng tuyến phòng ngự "cánh cửa thép" phía Đông Sài Gòn?',
        options: [
          'A. Trận chiến đấu tại đèo An Khê.',
          'B. Trận tiến công giải phóng Xuân Lộc (Đồng Nai).',
          'C. Trận giải phóng Tam Kỳ (Quảng Nam).',
          'D. Trận phòng ngự căn cứ Đồng Dù.'
        ],
        correctAnswer: 1,
        explanation: 'Phòng tuyến Xuân Lộc được tướng ngụy Lê Minh Đảo tuyên bố tử thủ như "cánh cửa thép" bảo vệ Sài Gòn. Sau 12 ngày đêm chiến đấu kiên cường (9/4 - 21/4/1975), quân ta đập tan Xuân Lộc, mở toang cửa ngõ tiến thẳng vào đầu não địch.',
        topic: 'Phòng tuyến Xuân Lộc'
      },
      {
        id: 12,
        type: 'single_choice',
        question: 'Nguyên nhân mang tính quyết định hàng đầu làm nên thắng lợi vĩ đại của cuộc kháng chiến chống Mỹ (1954 - 1975) là:',
        options: [
          'A. Sự viện trợ to lớn từ Liên Xô, Trung Quốc và các nước XHCN.',
          'B. Sự lãnh đạo đúng đắn, tài tình của Đảng Cộng sản Việt Nam với đường lối độc lập, tự chủ.',
          'C. Tinh thần đoàn kết chiến đấu của nhân dân ba nước Đông Dương.',
          'D. Phong trào phản chiến rầm rộ của nhân dân tiến bộ toàn thế giới.'
        ],
        correctAnswer: 1,
        explanation: 'Nguyên nhân quyết định hàng đầu chi phối mọi nhân tố thắng lợi khác chính là sự lãnh đạo sáng suốt, đúng đắn, kiên định của Đảng ta và Chủ tịch Hồ Chí Minh với đường lối chính trị, quân sự độc lập, tự chủ và sáng tạo.',
        topic: 'Nguyên nhân thắng lợi K/c Chống Mỹ'
      }
    ]
  },
  {
    id: 'quiz-the-gioi-ianta',
    title: 'Đề Số 03: Lịch Sử Thế Giới Hiện Đại & Trật Tự Hai Cực Ianta',
    topicLabel: 'Trật Tự Ianta & Quốc Tế',
    description: '10 câu hỏi bao quát trật tự Ianta, Liên Hợp Quốc, phong trào giải phóng dân tộc Á - Phi, ASEAN và trật tự thế giới sau Chiến tranh Lạnh.',
    timeLimitMinutes: 15,
    gradeLevel: '12',
    questionsCount: 10,
    difficulty: 'Vận Dụng',
    questions: [
      {
        id: 1,
        type: 'single_choice',
        question: 'Hội nghị Ianta (tháng 2/1945) diễn ra với sự tham dự của nguyên thủ ba cường quốc nào?',
        options: [
          'A. Liên Xô, Mỹ, Pháp.',
          'B. Liên Xô, Mỹ, Anh.',
          'C. Mỹ, Anh, Trung Quốc.',
          'D. Liên Xô, Đức, Nhật Bản.'
        ],
        correctAnswer: 1,
        explanation: 'Hội nghị Ianta họp tại Liên Xô từ ngày 4 đến 11/2/1945 với sự tham dự của J. Stalin (Liên Xô), F. Roosevelt (Mỹ) và W. Churchill (Anh).',
        topic: 'Hội nghị Ianta 1945'
      },
      {
        id: 2,
        type: 'single_choice',
        question: 'Cơ quan nào của Liên Hợp Quốc giữ vai trò trọng yếu trong việc duy trì hòa bình và an ninh thế giới?',
        options: [
          'A. Đại hội đồng.',
          'B. Hội đồng Bảo an.',
          'C. Ban Thư ký.',
          'D. Tòa án Công lý Quốc tế.'
        ],
        correctAnswer: 1,
        explanation: 'Hội đồng Bảo an Liên Hợp Quốc gồm 5 ủy viên thường trực (Mỹ, Nga, Anh, Pháp, Trung Quốc) và 10 ủy viên không thường trực, chịu trách nhiệm chính về duy trì hòa bình và an ninh quốc tế theo nguyên tắc nhất trí của 5 nước lớn.',
        topic: 'Liên Hợp Quốc'
      },
      {
        id: 3,
        type: 'single_choice',
        question: 'Năm 1960 đi vào lịch sử phong trào giải phóng dân tộc thế giới với tên gọi là gì?',
        options: [
          'A. Năm châu Á bừng tỉnh.',
          'B. Năm châu Phi (với 17 quốc gia tuyên bố độc lập).',
          'C. Năm giải phóng Mỹ Latinh.',
          'D. Năm sụp đổ của chủ nghĩa thực dân mới.'
        ],
        correctAnswer: 1,
        explanation: 'Năm 1960 được lịch sử gọi là "Năm châu Phi" vì có tới 17 quốc gia ở lục địa đen tuyên bố giành được độc lập, làm sụp đổ từng mảng lớn hệ thống thuộc địa của chủ nghĩa thực dân.',
        topic: 'Năm Châu Phi 1960'
      },
      {
        id: 4,
        type: 'single_choice',
        question: 'Hiệp hội các quốc gia Đông Nam Á (ASEAN) được thành lập vào ngày tháng năm nào?',
        options: [
          'A. 08/08/1967 tại Bangkok (Thái Lan).',
          'B. 28/07/1995 tại Hà Nội.',
          'C. 24/02/1976 tại Bali (Indonesia).',
          'D. 15/12/1986 tại Manila.'
        ],
        correctAnswer: 0,
        explanation: 'Ngày 8/8/1967, tại Bangkok (Thái Lan), đại diện 5 nước sáng lập (Indonesia, Malaysia, Philippines, Singapore, Thái Lan) đã ký bản Tuyên ngôn ASEAN, chính thức khai sinh tổ chức.',
        topic: 'Thành lập ASEAN'
      },
      {
        id: 5,
        type: 'single_choice',
        question: 'Việt Nam chính thức trở thành thành viên thứ 7 của Hiệp hội các quốc gia Đông Nam Á (ASEAN) vào năm nào?',
        options: [
          'A. Năm 1991.',
          'B. Năm 1995 (ngày 28/7/1995).',
          'C. Năm 1997.',
          'D. Năm 2007.'
        ],
        correctAnswer: 1,
        explanation: 'Ngày 28/7/1995, tại Hội nghị Bộ trưởng Ngoại giao ASEAN lần thứ 28 tại Brunei, Việt Nam chính thức được kết nạp làm thành viên thứ 7 của ASEAN, mở ra trang mới trong tiến trình hội nhập khu vực.',
        topic: 'Việt Nam gia nhập ASEAN'
      },
      {
        id: 6,
        type: 'single_choice',
        question: 'Xu thế bao trùm trong quan hệ quốc tế từ sau khi Chiến tranh Lạnh chấm dứt (1989 - 1991) là:',
        options: [
          'A. Chạy đua vũ trang hạt nhân giữa các siêu cường.',
          'B. Hòa hoãn, đối thoại và hợp tác phát triển kinh tế.',
          'C. Chia rẽ thế giới thành hai phe đối đầu gay gắt.',
          'D. Chiến tranh thương mại toàn cầu.'
        ],
        correctAnswer: 1,
        explanation: 'Sau Chiến tranh Lạnh, các nước điều chỉnh chiến lược phát triển lấy kinh tế làm trọng tâm; xu thế chủ đạo của thế giới chuyển từ đối đầu sang hòa hoãn, đối thoại và hợp tác bình đẳng cùng có lợi.',
        topic: 'Xu thế quốc tế sau 1991'
      },
      {
        id: 7,
        type: 'single_choice',
        question: 'Cuộc cách mạng khoa học - công nghệ hiện đại bắt đầu từ những năm 40 của thế kỷ XX có nguồn gốc sâu xa từ:',
        options: [
          'A. Nhu cầu đáp ứng các đơn đặt hàng quân sự trong Thế chiến II.',
          'B. Đòi hỏi giải quyết nhu cầu vật chất và tinh thần ngày càng cao của loài người.',
          'C. Cạnh tranh giữa các tập đoàn tư bản đa quốc gia.',
          'D. Sự cạn kiệt tài nguyên thiên nhiên.'
        ],
        correctAnswer: 1,
        explanation: 'Nguồn gốc sâu xa nhất của mọi cuộc cách mạng khoa học kỹ thuật xuất phát từ chính đòi hỏi của thực tiễn cuộc sống: giải quyết nhu cầu vật chất và tinh thần ngày càng cao và đa dạng của con người.',
        topic: 'Cách mạng KH-CN'
      },
      {
        id: 8,
        type: 'single_choice',
        question: 'Quốc gia nào ở châu Á vươn lên thành nền kinh tế lớn thứ hai thế giới tư bản trong thập niên 70 của thế kỷ XX?',
        options: [
          'A. Hàn Quốc.',
          'B. Nhật Bản ("Thần kỳ Nhật Bản").',
          'C. Singapore.',
          'D. Trung Quốc.'
        ],
        correctAnswer: 1,
        explanation: 'Từ một nước bại trận tàn phá nặng nề, nhờ chiến lược con người và đầu tư khoa học công nghệ, Nhật Bản đã vươn lên đạt mức tăng trưởng "thần kỳ", trở thành trung tâm kinh tế - tài chính lớn thứ hai thế giới tư bản (chỉ sau Mỹ).',
        topic: 'Thần kỳ Nhật Bản'
      },
      {
        id: 9,
        type: 'single_choice',
        question: 'Sự sụp đổ của trật tự hai cực Ianta (1991) đã mở đường cho xu thế hình thành trật tự thế giới mới nào?',
        options: [
          'A. Trật tự đơn cực do Mỹ hoàn toàn chi phối.',
          'B. Trật tự đa cực với nhiều trung tâm quyền lực lớn mạnh.',
          'C. Trật tự lưỡng cực mới giữa Mỹ và phương Tây.',
          'D. Trật tự vô chính phủ.'
        ],
        correctAnswer: 1,
        explanation: 'Mặc dù Mỹ mưu toan thiết lập trật tự đơn cực, nhưng xu thế thực tế của thế giới đang tiến tới trật tự "đa cực" với sự vươn lên của nhiều trung tâm: Mỹ, EU, Nga, Trung Quốc, Nhật Bản, Ấn Độ...',
        topic: 'Trật tự thế giới đa cực'
      },
      {
        id: 10,
        type: 'single_choice',
        question: 'Văn kiện pháp lý đầu tiên của Liên bang Nga khẳng định quan hệ hữu nghị với Việt Nam ký năm 1994 là:',
        options: [
          'A. Hiệp ước về những nguyên tắc cơ bản của quan hệ hữu nghị.',
          'B. Thỏa ước liên minh quân sự Việt - Nga.',
          'C. Hiệp định thương mại tự do song phương.',
          'D. Tuyên bố chung thiết lập Đối tác chiến lược toàn diện.'
        ],
        correctAnswer: 0,
        explanation: 'Tháng 6/1994, Việt Nam và Liên bang Nga ký Hiệp ước về những nguyên tắc cơ bản của quan hệ hữu nghị, đặt nền móng pháp lý cho mối quan hệ đối tác tin cậy trong thời kỳ mới.',
        topic: 'Ngoại giao Việt - Nga'
      }
    ]
  },
  {
    id: 'quiz-lich-su-10-van-minh',
    title: 'Đề Khối 10 Số 01: Sử Học & Các Nền Văn Minh Cổ - Trung Đại',
    topicLabel: 'Sử Học & Văn Minh Nhân Loại',
    description: 'Bộ câu hỏi trắc nghiệm chuẩn chương trình GDPT 2018 dành riêng cho Khối 10: Hiện thực lịch sử, Văn minh Ai Cập, Hy Lạp - La Mã và Văn Lang - Âu Lạc.',
    timeLimitMinutes: 15,
    gradeLevel: '10',
    questionsCount: 5,
    difficulty: 'Cơ Bản',
    questions: [
      {
        id: 1001,
        type: 'single_choice',
        question: 'Hiện thực lịch sử khác với nhận thức lịch sử ở điểm cơ bản nào?',
        options: [
          'A. Hiện thực lịch sử có thể thay đổi theo quan điểm của người nghiên cứu.',
          'B. Hiện thực lịch sử chỉ diễn ra một lần, tồn tại khách quan; nhận thức lịch sử mang tính chủ quan và có thể thay đổi.',
          'C. Nhận thức lịch sử luôn phản ánh đúng hoàn toàn 100% hiện thực lịch sử.',
          'D. Hiện thực lịch sử chỉ tồn tại trong sách giáo khoa.'
        ],
        correctAnswer: 1,
        explanation: 'Hiện thực lịch sử là toàn bộ những gì đã diễn ra trong quá khứ một cách khách quan, duy nhất. Nhận thức lịch sử là sự hiểu biết của con người về hiện thực đó nên phụ thuộc vào tư liệu và góc nhìn.',
        topic: 'Khái niệm Sử học'
      },
      {
        id: 1002,
        type: 'single_choice',
        question: 'Cơ sở kinh tế chủ yếu của các quốc gia cổ đại phương Đông (Ai Cập, Lưỡng Hà, Ấn Độ, Trung Hoa) là:',
        options: [
          'A. Công thương nghiệp và hàng hải.',
          'B. Nông nghiệp tưới tiêu gắn liền với các dòng sông lớn.',
          'C. Kinh tế đồn điền sử dụng nô lệ quy mô lớn.',
          'D. Thủ công nghiệp tinh xảo.'
        ],
        correctAnswer: 1,
        explanation: 'Các nền văn minh cổ đại phương Đông đều hình thành trên lưu vực các con sông lớn (sông Nin, Ơ-phơ-rát, Ti-gơ-rơ, sông Ấn, Hoàng Hà), tạo điều kiện phát triển nông nghiệp lúa nước và thủy lợi.',
        topic: 'Văn minh phương Đông'
      },
      {
        id: 1003,
        type: 'single_choice',
        question: 'Quốc gia thành bang nào ở Hy Lạp cổ đại là điển hình cho thể chế dân chủ chủ nô?',
        options: [
          'A. Thành bang Xpác (Sparta).',
          'B. Thành bang A-ten (Athens).',
          'C. Đế quốc Ba Tư.',
          'D. Vương quốc Macedonia.'
        ],
        correctAnswer: 1,
        explanation: 'Thành bang A-ten (Athens) thế kỷ V TCN đã thiết lập thể chế dân chủ chủ nô tiến bộ nhất thời cổ đại với Đại hội công dân và Hội đồng 500 người.',
        topic: 'Văn minh Hy Lạp - La Mã'
      },
      {
        id: 1004,
        type: 'single_choice',
        question: 'Hiện vật tiêu biểu nhất biểu trưng cho trình độ luyện kim và nghệ thuật đúc đồng của cư dân Văn Lang - Âu Lạc là:',
        options: [
          'A. Trống đồng Đông Sơn (Ngọc Lũ).',
          'B. Tháp Chàm Pô Klong Garai.',
          'C. Tượng Phật Đồng Dương.',
          'D. Tiền đồng Óc Eo.'
        ],
        correctAnswer: 0,
        explanation: 'Trống đồng Đông Sơn (tiêu biểu là trống đồng Ngọc Lũ) là đỉnh cao của văn minh sông Hồng, phản ánh đời sống sinh hoạt, tín ngưỡng và trình độ đúc đồng kiệt xuất của người Việt cổ.',
        topic: 'Văn minh Văn Lang - Âu Lạc'
      },
      {
        id: 1005,
        type: 'true_false_group',
        stimulus: 'Văn minh Đại Việt phát triển rực rỡ trong thời kỳ độc lập tự chủ (thế kỷ X - XIX), kết hợp hài hòa giữa truyền thống bản địa và tiếp thu có chọn lọc tinh hoa văn hóa bên ngoài.',
        question: 'Xác định tính đúng/sai của các nhận định sau về Văn minh Đại Việt:',
        statements: [
          {
            id: 'a',
            statement: 'Văn minh Đại Việt hình thành và phát triển trên nền tảng độc lập, tự chủ của dân tộc.',
            isCorrect: true,
            explanation: 'Đúng: Chiến thắng Bạch Đằng 938 mở ra kỷ nguyên độc lập lâu dài, tạo điều kiện cho văn minh Đại Việt phát triển rực rỡ.'
          },
          {
            id: 'b',
            statement: 'Văn Miếu - Quốc Tử Giám (thành lập năm 1070, 1076) là trường đại học đầu tiên của nước ta.',
            isCorrect: true,
            explanation: 'Đúng: Thời Lý đã cho xây dựng Văn Miếu (1070) và lập Quốc Tử Giám (1076) để đào tạo nhân tài.'
          },
          {
            id: 'c',
            statement: 'Chữ Nôm là hệ thống chữ viết do thực dân Pháp truyền bá vào nước ta.',
            isCorrect: false,
            explanation: 'Sai: Chữ Nôm do cha ông ta sáng tạo trên cơ sở chữ Hán từ thời Lý - Trần để ghi âm tiếng Việt.'
          },
          {
            id: 'd',
            statement: 'Nông nghiệp lúa nước vẫn là nền tảng kinh tế căn bản của quốc gia Đại Việt.',
            isCorrect: true,
            explanation: 'Đúng: Các triều đại đều coi trọng đê điều, thủy lợi ("dĩ nông vi bản").'
          }
        ],
        explanation: 'Văn minh Đại Việt mang bản sắc dân tộc sâu sắc, lấy nông nghiệp làm gốc và đề cao giáo dục, khoa cử.',
        topic: 'Văn minh Đại Việt'
      }
    ]
  },
  {
    id: 'quiz-lich-su-11-can-dai',
    title: 'Đề Khối 11 Số 01: Việt Nam (1858 - 1918) & Thế Giới Cận - Hiện Đại',
    topicLabel: 'Kháng Pháp & Phong Trào Yêu Nước',
    description: 'Bộ câu hỏi trắc nghiệm chuyên sâu dành riêng cho Khối 11 về cuộc kháng chiến chống Pháp xâm lược, phong trào Cần Vương, Yên Thế và xu hướng cứu nước đầu thế kỷ XX.',
    timeLimitMinutes: 15,
    gradeLevel: '11',
    questionsCount: 5,
    difficulty: 'Vận Dụng',
    questions: [
      {
        id: 1101,
        type: 'single_choice',
        question: 'Thực dân Pháp nổ súng mở đầu cuộc chiến tranh xâm lược Việt Nam (1/9/1858) tại địa điểm nào?',
        options: [
          'A. Cửa biển Thuận An (Huế).',
          'B. Bán đảo Sơn Trà (Đà Nẵng).',
          'C. Thành Gia Định.',
          'D. Cửa biển Cần Giờ.'
        ],
        correctAnswer: 1,
        explanation: 'Rạng sáng ngày 1/9/1858, liên quân Pháp - Tây Ban Nha nổ súng tấn công bán đảo Sơn Trà (Đà Nẵng), thực hiện âm mưu "đánh nhanh thắng nhanh".',
        topic: 'Pháp xâm lược 1858'
      },
      {
        id: 1102,
        type: 'single_choice',
        question: 'Hiệp ước nào đã chính thức đánh dấu sự đầu hàng hoàn toàn của triều đình phong kiến nhà Nguyễn trước thực dân Pháp?',
        options: [
          'A. Hiệp ước Nhâm Tuất (1862).',
          'B. Hiệp ước Giáp Tuất (1874).',
          'C. Hiệp ước Hác-măng (1883).',
          'D. Hiệp ước Pa-tơ-nốt (1884).'
        ],
        correctAnswer: 3,
        explanation: 'Với Hiệp ước Pa-tơ-nốt (6/6/1884), triều đình Huế chính thức thừa nhận quyền bảo hộ của Pháp trên toàn cõi Việt Nam, chấm dứt sự tồn tại của nhà nước phong kiến độc lập.',
        topic: 'Các hiệp ước 1862 - 1884'
      },
      {
        id: 1103,
        type: 'single_choice',
        question: 'Cuộc khởi nghĩa nào được xem là tiêu biểu nhất và có thời gian tồn tại lâu dài nhất trong phong trào Cần Vương (1885 - 1896)?',
        options: [
          'A. Khởi nghĩa Ba Đình.',
          'B. Khởi nghĩa Bãi Sậy.',
          'C. Khởi nghĩa Hương Khê (do Phan Đình Phùng và Cao Thắng lãnh đạo).',
          'D. Khởi nghĩa Hùng Lĩnh.'
        ],
        correctAnswer: 2,
        explanation: 'Khởi nghĩa Hương Khê (1885 - 1896) có quy mô rộng lớn trên 4 tỉnh Bắc Trung Kỳ, trình độ tổ chức cao, tự chế tạo được súng trường kiểu 1874 và kéo dài hơn 10 năm.',
        topic: 'Phong trào Cần Vương'
      },
      {
        id: 1104,
        type: 'single_choice',
        question: 'Điểm khác biệt căn bản về phương pháp đấu tranh giữa Phan Bội Châu và Phan Châu Trinh đầu thế kỷ XX là:',
        options: [
          'A. Phan Bội Châu chủ trương bạo động vũ trang; Phan Châu Trinh chủ trương cải cách ôn hòa, nâng cao dân trí.',
          'B. Phan Bội Châu dựa vào Pháp; Phan Châu Trinh dựa vào Nhật.',
          'C. Phan Bội Châu theo khuynh hướng vô sản; Phan Châu Trinh theo khuynh hướng phong kiến.',
          'D. Hai ông hoàn toàn giống nhau về phương pháp đấu tranh.'
        ],
        correctAnswer: 0,
        explanation: 'Phan Bội Châu chủ trương bạo động vũ trang, cầu viện Nhật Bản (phong trào Đông Du); trong khi Phan Châu Trinh chủ trương cải cách dân chủ, "khai dân trí, chấn dân khí, hậu dân sinh", phản đối bạo động.',
        topic: 'Xu hướng cứu nước đầu TK XX'
      },
      {
        id: 1105,
        type: 'true_false_group',
        stimulus: 'Khởi nghĩa nông dân Yên Thế (1884 - 1913) do Đề Nắm và sau đó là Hoàng Hoa Thám (Hùm thiêng Yên Thế) lãnh đạo đã gây cho thực dân Pháp nhiều tổn thất nặng nề trong gần 30 năm.',
        question: 'Xác định tính đúng/sai của các nhận định sau về Khởi nghĩa Yên Thế:',
        statements: [
          {
            id: 'a',
            statement: 'Khởi nghĩa Yên Thế là một bộ phận của phong trào Cần Vương do vua Hàm Nghi phát động.',
            isCorrect: false,
            explanation: 'Sai: Yên Thế là phong trào tự phát của nông dân chống cướp đất lập đồn điền, không chịu sự chi phối của chiếu Cần Vương.'
          },
          {
            id: 'b',
            statement: 'Đây là cuộc khởi nghĩa nông dân kéo dài gần 30 năm (1884 - 1913), bền bỉ nhất cuối thế kỷ XIX đầu XX.',
            isCorrect: true,
            explanation: 'Đúng: Khởi nghĩa diễn ra liên tục trong gần 3 thập kỷ tại vùng núi rừng Bắc Giang.'
          },
          {
            id: 'c',
            statement: 'Lực lượng tham gia chủ yếu là nông dân địa phương tự vệ bảo vệ quê hương.',
            isCorrect: true,
            explanation: 'Đúng: Mục tiêu trực tiếp của nghĩa quân là giữ đất, giữ làng trước chính sách bình định của Pháp.'
          },
          {
            id: 'd',
            statement: 'Khởi nghĩa Yên Thế đã giành thắng lợi hoàn toàn, buộc Pháp phải rút khỏi Bắc Kỳ.',
            isCorrect: false,
            explanation: 'Sai: Cuối cùng khởi nghĩa thất bại do lực lượng chênh lệch và hạn chế về đường lối lãnh đạo giai cấp.'
          }
        ],
        explanation: 'Khởi nghĩa Yên Thế thể hiện tinh thần quật cường của giai cấp nông dân Việt Nam, nhưng vẫn mang tính chất tự phát, cục bộ địa phương.',
        topic: 'Khởi nghĩa Yên Thế'
      }
    ]
  }
];
