const Loaderpyramid = () => {
  return (
    <div className="w-[400px] h-[400px] relative transform-style-3d rotate-x-[-20deg] mx-auto">
      <div className="w-full h-full relative animate-spin-slow transform-style-3d">
        {/* Side 1 */}
        <span className="absolute top-0 left-0 right-0 bottom-0 m-auto w-[200px] h-[200px] bg-gradient-to-br from-[#1afbf0] to-[#da00ff] clip-pyramid transform rotate-z-[-30deg] rotate-y-[90deg]" />

        {/* Side 2 */}
        <span className="absolute top-0 left-0 right-0 bottom-0 m-auto w-[200px] h-[200px] bg-gradient-to-br from-[#1afbf0] to-[#da00ff] clip-pyramid transform rotate-z-[30deg] rotate-y-[90deg]" />

        {/* Side 3 */}
        <span className="absolute top-0 left-0 right-0 bottom-0 m-auto w-[100px] h-[100px] bg-gradient-to-br from-[#1afbf0] to-[#da00ff] clip-pyramid transform rotate-x-[30deg]" />

        {/* Side 4 */}
        <span className="absolute top-0 left-0 right-0 bottom-0 m-auto w-[100px] h-[100px] bg-gradient-to-br from-[#1afbf0] to-[#da00ff] clip-pyramid transform rotate-x-[-30deg]" />

        {/* Shadow */}
        <span className="absolute top-0 left-0 right-0 bottom-0 m-auto w-[90px] h-[90px] bg-[#8b5ad5] blur-[12px] transform rotate-x-[90deg] -translate-z-[60px]" />
      </div>
    </div>
  );
};

export default Loaderpyramid;
