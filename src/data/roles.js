export const roleHierarchy = {
//STUDENT SECTION
  student: {
    title: "請選擇學生年齡層",
    options: [
      { label: "12歲以下", next: "studentUnder12" },
      { label: "12-14歲", next: "student12to14" },
      { label: "14-18歲", next: "student14to18" },
      { label: "18歲以上", next: "studentAbove18" },
    ],
  },

  //12歲以下
  studentUnder12: {
    title: "請選擇學生類別（12歲以下）",
    options: [
      { label: "一般生", next: "end" },
      { label: "特殊教育生", next: "end" },
      { label: "原住民學生", next: "end" },
      { label: "弱勢學生", next: "end" },
      { label: "特定身分學生", next: "under12_special" },
      { label: "僑生", next: "end" },
      { label: "外籍生", next: "end" },
      { label: "陸生", next: "end" },
      { label: "港澳生", next: "end" },
      { label: "新住民生", next: "end" },
    ],
  },

  under12_special: {
    title: "請選擇特定身分學生類別（12歲以下）",
    options: [
      { label: "體育生", next: "end" },
      { label: "藝術才能班學生", next: "end" },
      { label: "其他", next: "end" },
    ],
  },

  //12～14歲
  student12to14: {
    title: "請選擇學生類別（12～14歲）",
    options: [
      { label: "一般生", next: "end" },
      { label: "特殊教育生", next: "end" },
      { label: "原住民學生", next: "end" },
      { label: "弱勢學生", next: "end" },
      { label: "特定身分學生", next: "t12to14_special" },
      { label: "僑生", next: "end" },
      { label: "外籍生", next: "end" },
      { label: "陸生", next: "end" },
      { label: "港澳生", next: "end" },
      { label: "新住民生", next: "end" },
    ],
  },

  t12to14_special: {
    title: "請選擇特定身分學生類別（12～14歲）",
    options: [
      { label: "體育生", next: "end" },
      { label: "藝術才能班學生", next: "end" },
      { label: "其他", next: "end" },
    ],
  },

  //14～18歲
  student14to18: {
    title: "請選擇學生類別（14～18歲）",
    options: [
      { label: "一般生", next: "end" },
      { label: "特殊教育生", next: "end" },
      { label: "原住民學生", next: "end" },
      { label: "弱勢學生", next: "end" },
      { label: "特定身分學生", next: "t14to18_special" },
      { label: "僑生", next: "end" },
      { label: "外籍生", next: "end" },
      { label: "陸生", next: "end" },
      { label: "港澳生", next: "end" },
      { label: "新住民生", next: "end" },
    ],
  },

  t14to18_special: {
    title: "請選擇特定身分學生類別（14～18歲）",
    options: [
      { label: "體育生", next: "end" },
      { label: "藝術才能班學生", next: "end" },
      { label: "其他", next: "end" },
    ],
  },

  //18歲以上
  studentAbove18: {
    title: "請選擇學生類別（18歲以上）",
    options: [
      { label: "一般生", next: "end" },
      { label: "特殊教育生", next: "end" },
      { label: "原住民學生", next: "end" },
      { label: "弱勢學生", next: "end" },
      { label: "特定身分學生", next: "above18_special" },
      { label: "僑生", next: "end" },
      { label: "外籍生", next: "end" },
      { label: "陸生", next: "end" },
      { label: "港澳生", next: "end" },
      { label: "新住民生", next: "end" },
    ],
  },

  above18_special: {
    title: "請選擇特定身分學生類別（18歲以上）",
    options: [
      { label: "體育生", next: "end" },
      { label: "藝術才能班學生", next: "end" },
      { label: "其他", next: "end" },
    ],
  },

  //TEACHER SECTION
  teacher: {
    title: "請選擇教師類別",
    options: [
      { label: "公校", next: "teacher_public" },
      { label: "私校", next: "teacher_private" },
      { label: "校園支援人員", next: "teacher_support" },
    ],
  },

  // 公校
  teacher_public: {
    title: "請選擇公校教師類別",
    options: [
      { label: "專任", next: "teacher_public_fulltime" },
      { label: "兼任", next: "teacher_public_parttime" },
      { label: "行政與輔導員", next: "teacher_public_admin" },
    ],
  },

  // 公校 - 專任
  teacher_public_fulltime: {
    title: "請選擇專任教師職位",
    options: [
      { label: "校長", next: "end" },
      { label: "副校長", next: "end" },
      { label: "專任教師", next: "end" },
      { label: "其他", next: "end" },
    ],
  },

  // 公校 - 兼任
  teacher_public_parttime: {
    title: "請選擇兼任教師職位",
    options: [
      { label: "代課(短期)", next: "end" },
      { label: "代理(長期)", next: "end" },
      { label: "鐘點/兼課", next: "end" },
      { label: "輔導教師", next: "end" },
      { label: "其他", next: "end" },
      { label: "行政助理", next: "end" },
    ],
  },

  // 公校 - 行政與輔導員
  teacher_public_admin: {
    title: "請選擇行政與輔導員類別",
    options: [
      { label: "行政職員", next: "end" },
      { label: "輔導員", next: "end" },
      { label: "教官(具教師資格)", next: "end" },
      { label: "教官(軍職轉任者)", next: "end" },
      { label: "專職社工師/心理師", next: "end" },
      { label: "其他", next: "end" },
    ],
  },

  // 私校
  teacher_private: {
    title: "請選擇私校教師類別",
    options: [
      { label: "校長", next: "end" },
      { label: "副校長", next: "end" },
      { label: "教師", next: "teacher_private_teacher" },
      { label: "行政與輔導員", next: "teacher_private_admin" },
    ],
  },

  // 私校 - 教師
  teacher_private_teacher: {
    title: "請選擇私校教師職位",
    options: [
      { label: "代課(短期)", next: "end" },
      { label: "代理(長期)", next: "end" },
      { label: "鐘點/兼課", next: "end" },
      { label: "輔導教師", next: "end" },
      { label: "教師", next: "end" },
      { label: "其他", next: "end" },
    ],
  },

  // 私校 - 行政與輔導員
  teacher_private_admin: {
    title: "請選擇行政與輔導員類別（私校）",
    options: [
      { label: "行政職員", next: "end" },
      { label: "輔導員", next: "end" },
      { label: "教官(具教師資格)", next: "end" },
      { label: "教官(軍職轉任者)", next: "end" },
      { label: "專職社工師/心理師", next: "end" },
      { label: "其他", next: "end" },
    ],
  },

  // 校園支援人員
  teacher_support: {
    title: "請選擇校園支援人員職位",
    options: [
      { label: "公友/校務維修人員", next: "end" },
      { label: "校護", next: "end" },
      { label: "警衛", next: "end" },
      { label: "營養師", next: "end" },
      { label: "其他", next: "end" },
    ],
  },
};
