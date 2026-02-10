class HealthController {
  getHealth(req, res) {
    const response = {
      is_success: true,
      server_time: new Date().toISOString(),
      status: "operational",
      version: "1.0.0",
      message: "API is healthy and running"
    };
    
    res.status(200).json(response);
  }
}

module.exports = new HealthController();