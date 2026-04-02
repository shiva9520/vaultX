export interface Transaction {
  id: number;
  name: string;
  amount: number;
  type: 'credit' | 'debit';
  date: number;
}

const generateDummyTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const names = [
    'Amazon Web Services', 'Salary (Tech Corp)', 'Uber Rides', 'Freelance Design', 
    'Netflix Subscription', 'Stock Dividend', 'Grocery Store', 'Coffee Shop', 
    'Gym Membership', 'Electric Bill', 'Internet Bill', 'Restaurant', 
    'Gas Station', 'Movie Tickets', 'Flight Tickets', 'Hotel Booking', 
    'Book Store', 'Pharmacy', 'Clothing Store', 'Hardware Store'
  ];

  const now = new Date();

  for (let i = 1; i <= 50; i++) {
    const isCredit = Math.random() > 0.7; // 30% chance of credit
    const randomNameIndex = Math.floor(Math.random() * names.length);
    const amount = isCredit 
      ? Math.floor(Math.random() * 50000) + 1000 
      : (Math.floor(Math.random() * 5000) + 100) * -1;
      
    // Random date within the last 60 days
    const randomDaysAgo = Math.floor(Math.random() * 60);
    const date = new Date(now.getTime() - randomDaysAgo * 24 * 60 * 60 * 1000);
    date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));

    transactions.push({
      id: i,
      name: isCredit && names[randomNameIndex] === 'Uber Rides' ? 'Salary (Tech Corp)' : names[randomNameIndex], // Avoid weird ones
      amount,
      type: isCredit ? 'credit' : 'debit',
      date: date.getTime(),
    });
  }

  // Sort by date descending
  return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const dummyTransactions = generateDummyTransactions();
