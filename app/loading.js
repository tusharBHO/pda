// app/loading.js
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl space-y-4 animate-pulse">
        <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto"></div>
        <div className="h-64 bg-gray-300 rounded-xl"></div>
        <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-gray-300 rounded w-2/3 mx-auto"></div>
      </div>
    </div>
  );
}
