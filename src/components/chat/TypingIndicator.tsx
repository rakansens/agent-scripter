const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 animate-fade-in">
      <div className="flex space-x-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-accent rounded-full animate-typing-dot"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>
    </div>
  );
};

export default TypingIndicator;