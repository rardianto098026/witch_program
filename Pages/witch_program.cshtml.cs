using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Code_Test.Pages
{
    public class witch_program : PageModel
    {
        private readonly ILogger<witch_program> _logger;

        public witch_program(ILogger<witch_program> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
        }
    }
}