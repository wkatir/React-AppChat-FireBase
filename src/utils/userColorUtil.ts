export const generateUserColor = (username: string): string => {
    const colors = [
      "text-emerald-300",
      "text-pink-300",
      "text-sky-300",
      "text-amber-300",
      "text-violet-300",
      "text-rose-300",
      "text-teal-300",
      "text-orange-300",
      "text-cyan-300",
      "text-yellow-300",
    ];
  
    let hash = 0;
    for (let i = 0; i < username.length; i++) {
      hash = username.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    const index = Math.abs(hash) % colors.length;
    return colors[index];
  };