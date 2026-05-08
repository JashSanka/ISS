export function getOutOfScopeMessage() {
  return 'I can only answer questions about the currently loaded ISS tracking data, people in space, and news articles shown in this dashboard.'
}

const dashboardTerms = [
  'iss',
  'space station',
  'space',
  'astronaut',
  'people',
  'location',
  'latitude',
  'longitude',
  'speed',
  'trajectory',
  'tracked',
  'position',
  'news',
  'article',
  'headline',
  'source',
  'author',
  'category',
  'date',
]

const unrelatedTerms = [
  'write code',
  'recipe',
  'homework',
  'weather',
  'stock',
  'movie',
  'song',
  'joke',
  'translate',
  'summarize this',
]

export function isQuestionInDashboardScope(question: string) {
  const normalizedQuestion = question.trim().toLowerCase()

  if (!normalizedQuestion) {
    return false
  }

  if (unrelatedTerms.some((term) => normalizedQuestion.includes(term))) {
    return false
  }

  return dashboardTerms.some((term) => normalizedQuestion.includes(term))
}

export function constrainUnsupportedAnswer(answer: string) {
  const normalizedAnswer = answer.toLowerCase()
  const suspiciousPhrases = ['as of my knowledge', 'i searched', 'on the internet', 'according to wikipedia']

  if (suspiciousPhrases.some((phrase) => normalizedAnswer.includes(phrase))) {
    return getOutOfScopeMessage()
  }

  return answer.trim()
}
