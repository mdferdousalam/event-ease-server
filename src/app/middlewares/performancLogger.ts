/**
 * Performance logging middleware
 * Tracks request processing time and logs performance metrics
 */
const performanceLogger = (req, res, next) => {
  const start = Date.now();

  // Log request duration when response finishes
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`[PERF] ${req.method} ${req.path} - ${duration}ms`);

    // Log slow requests
    if (duration > 100) {
      console.warn(
        `[SLOW_REQUEST] ${req.method} ${req.path} took ${duration}ms`
      );
    }
  });

  next();
};

export default performanceLogger;