export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
      <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      <p className="text-gray-400 font-medium tracking-widest uppercase text-sm animate-pulse">
        Initializing...
      </p>
    </div>
  );
}
