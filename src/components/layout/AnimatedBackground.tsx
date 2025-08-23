export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-[10%] left-[15%] w-[32rem] h-[32rem] bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-25 blur-3xl animate-float1"></div>
      <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full opacity-30 blur-3xl animate-float2 animation-delay-1000"></div>
      <div className="absolute bottom-[15%] left-[25%] w-80 h-80 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full opacity-25 blur-3xl animate-float3 animation-delay-2000"></div>
      <div className="absolute bottom-[25%] right-[20%] w-72 h-72 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full opacity-35 blur-3xl animate-float4 animation-delay-1000"></div>
      <div className="absolute top-[40%] left-[8%] w-64 h-64 bg-gradient-to-r from-violet-400 to-indigo-500 rounded-full opacity-30 blur-3xl animate-float5 animation-delay-3000"></div>
      <div className="absolute top-[65%] right-[12%] w-56 h-56 bg-gradient-to-r from-teal-400 to-blue-500 rounded-full opacity-25 blur-3xl animate-float6 animation-delay-2000"></div>
    </div>
  );
};
