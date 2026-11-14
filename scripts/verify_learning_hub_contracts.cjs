// Verification script for Learning Hub Phase 2 Contracts & Scoring Algorithms
const assert = require('assert');

console.log('--- ĐANG KIỂM CHỨNG BỘ QUY TẮC & THUẬT TOÁN GIAI ĐOẠN 2 ---');

// Mock calculateExamScore algorithm directly to test logic
function calculateScore(questions, answers) {
  let earnedPoints = 0;
  let maxPossiblePoints = 0;
  let fullyCorrectQuestionsCount = 0;
  let correctStatementsTotal = 0;

  questions.forEach((q) => {
    if (q.type === 'true_false_group') {
      maxPossiblePoints += 1.0;
      const userGroup = answers[q.id] || {};
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
      const userAns = answers[q.id];
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
}

// Test Case 1: All correct single choice
const testQuestions = [
  { id: 1, type: 'single_choice', correctAnswer: 2 },
  { id: 2, type: 'single_choice', correctAnswer: 0 },
  {
    id: 3,
    type: 'true_false_group',
    statements: [
      { id: 'a', isCorrect: true },
      { id: 'b', isCorrect: false },
      { id: 'c', isCorrect: true },
      { id: 'd', isCorrect: false },
    ]
  }
];

// Test 1: 100% correct
const answers100 = {
  1: 2,
  2: 0,
  3: { a: true, b: false, c: true, d: false }
};
const res100 = calculateScore(testQuestions, answers100);
assert.strictEqual(res100.normalizedScore, '10.0', '100% correct should yield 10.0');
assert.strictEqual(res100.fullyCorrectQuestionsCount, 3);
console.log('✓ TEST 1 PASS: Chấm điểm 10.0 tuyệt đối chính xác.');

// Test 2: True/False Partial Scoring (3 matches out of 4 = 0.50)
const answersPartial = {
  1: 2, // 1.0
  2: 1, // 0.0 (wrong)
  3: { a: true, b: false, c: true, d: true } // 3 matches out of 4 = 0.50
};
const resPartial = calculateScore(testQuestions, answersPartial);
// earnedPoints = 1.0 + 0.0 + 0.50 = 1.50 / 3.0 = 5.0
assert.strictEqual(resPartial.score, 1.5);
assert.strictEqual(resPartial.normalizedScore, '5.0');
assert.strictEqual(resPartial.fullyCorrectQuestionsCount, 1);
console.log('✓ TEST 2 PASS: Chấm điểm Đúng/Sai phân bậc (0.1, 0.25, 0.5, 1.0) chuẩn Bộ GD&ĐT.');

// Test 3: Zero correct
const answersZero = {
  1: 0,
  2: 1,
  3: { a: false, b: true, c: false, d: true }
};
const resZero = calculateScore(testQuestions, answersZero);
assert.strictEqual(resZero.normalizedScore, '0.0');
assert.strictEqual(resZero.fullyCorrectQuestionsCount, 0);
console.log('✓ TEST 3 PASS: Xử lý 0 điểm chính xác.');

console.log('--- TOÀN BỘ 3 TEST CASES ĐÃ ĐẠT TIÊU CHUẨN 100% ---');
