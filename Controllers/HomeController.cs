using Microsoft.AspNetCore.Mvc;
using splitwise_tracker.Models;
using System.Diagnostics;

namespace splitwise_tracker.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Report()
        {
            return View();
        }

        public IActionResult Charts()
        {
            return View();
        }

        public IActionResult About()
        {
            return View();
        }
    }
}
