// Daily Motivational Quotes - changes based on day of year
export const QUOTES = [
  { text: "The two most powerful warriors are patience and time.", author: "Leo Tolstoy" },
  { text: "Time you enjoy wasting is not wasted time.", author: "Marthe Troly-Curtin" },
  { text: "Lost time is never found again.", author: "Benjamin Franklin" },
  { text: "The key is not spending time, but investing it.", author: "Stephen Covey" },
  { text: "Time is what we want most, but what we use worst.", author: "William Penn" },
  { text: "Yesterday is gone. Tomorrow has not yet come. We have only today.", author: "Mother Teresa" },
  { text: "The trouble is, you think you have time.", author: "Buddha" },
  { text: "Time flies over us, but leaves its shadow behind.", author: "Nathaniel Hawthorne" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Time is the most valuable thing a man can spend.", author: "Theophrastus" },
  { text: "Your time is limited. Don't waste it living someone else's life.", author: "Steve Jobs" },
  { text: "The only time you should look back is to see how far you've come.", author: "Unknown" },
  { text: "Time is a created thing. To say 'I don't have time' is to say 'I don't want to.'", author: "Lao Tzu" },
  { text: "One day or day one. You decide.", author: "Unknown" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
  { text: "In the end, it's not the years in your life that count. It's the life in your years.", author: "Abraham Lincoln" },
  { text: "Time waits for no one.", author: "Unknown" },
  { text: "Every moment is a fresh beginning.", author: "T.S. Eliot" },
  { text: "Make each day your masterpiece.", author: "John Wooden" },
  { text: "The future depends on what you do today.", author: "Mahatma Gandhi" },
  { text: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" },
  { text: "Today is the first day of the rest of your life.", author: "Charles Dederich" },
  { text: "It's not about having time. It's about making time.", author: "Unknown" },
  { text: "The way we spend our days is the way we spend our lives.", author: "Annie Dillard" },
  { text: "Time is the coin of life. Spend it wisely.", author: "Carl Sandburg" },
  { text: "Every second is of infinite value.", author: "Johann Wolfgang von Goethe" },
  { text: "You may delay, but time will not.", author: "Benjamin Franklin" },
  { text: "Ordinary people think merely of spending time. Great people think of using it.", author: "Arthur Schopenhauer" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Start where you are. Use what you have. Do what you can.", author: "Arthur Ashe" },
  { text: "What you do today can improve all your tomorrows.", author: "Ralph Marston" },
  { text: "Dream big and dare to fail.", author: "Norman Vaughan" },
  { text: "Action is the foundational key to all success.", author: "Pablo Picasso" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Quality is not an act, it is a habit.", author: "Aristotle" },
  { text: "Well done is better than well said.", author: "Benjamin Franklin" },
  { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
  { text: "Life shrinks or expands in proportion to one's courage.", author: "Anaïs Nin" },
  { text: "Be the change you wish to see in the world.", author: "Mahatma Gandhi" },
  { text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.", author: "Ralph Waldo Emerson" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "Keep your face always toward the sunshine and shadows will fall behind you.", author: "Walt Whitman" },
  { text: "Happiness is not something ready made. It comes from your own actions.", author: "Dalai Lama" },
  { text: "The purpose of our lives is to be happy.", author: "Dalai Lama" },
  { text: "Life is really simple, but we insist on making it complicated.", author: "Confucius" },
  { text: "In three words I can sum up everything I've learned about life: it goes on.", author: "Robert Frost" },
  { text: "To live is the rarest thing in the world. Most people exist, that is all.", author: "Oscar Wilde" },
  { text: "Life is either a daring adventure or nothing at all.", author: "Helen Keller" },
  { text: "The greatest glory in living lies not in never falling, but in rising every time we fall.", author: "Nelson Mandela" },
  { text: "Not how long, but how well you have lived is the main thing.", author: "Seneca" },
  { text: "Life is short, and it's up to you to make it sweet.", author: "Sarah Louise Delany" },
  { text: "Every day is a new beginning. Take a deep breath and start again.", author: "Unknown" },
  { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", author: "Buddha" },
  { text: "You only live once, but if you do it right, once is enough.", author: "Mae West" },
  { text: "The unexamined life is not worth living.", author: "Socrates" },
  { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
];

/**
 * Get the quote for today based on day of year
 */
export function getDailyQuote() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  return QUOTES[dayOfYear % QUOTES.length];
}

/**
 * Get a quote by index
 */
export function getQuoteByIndex(index) {
  return QUOTES[index % QUOTES.length];
}
