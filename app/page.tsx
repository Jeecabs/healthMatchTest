import TreeMatcher from "./components/TreeMatcher";

export default function Home() {
  return (
    <div className="grid min-h-screen p-4 md:p-8 lg:p-16 bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="flex flex-col gap-8 max-w-7xl mx-auto w-full">
        <header className="text-center py-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-green-800 dark:text-green-400 mb-4">
            TreeMatch
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Find the perfect tree for your garden by answering a few simple
            questions
          </p>
        </header>

        <main className="flex-1 w-full max-w-2xl mx-auto">
          <TreeMatcher />
        </main>

        <footer className="mt-auto pt-8 pb-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} TreeMatch • All rights reserved</p>
        </footer>
      </div>
    </div>
  );
}
