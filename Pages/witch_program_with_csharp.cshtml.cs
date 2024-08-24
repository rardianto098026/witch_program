using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.Extensions.Logging;

namespace Code_Test.Pages
{
    public class witch_program_with_csharp : PageModel
    {
        private readonly ILogger<witch_program_with_csharp> _logger;

        public witch_program_with_csharp(ILogger<witch_program_with_csharp> logger)
        {
            _logger = logger;
        }

        [BindProperty]
        public int AgeOfDeathA { get; set; }

        [BindProperty]
        public int YearOfDeathA { get; set; }

        [BindProperty]
        public int AgeOfDeathB { get; set; }

        [BindProperty]
        public int YearOfDeathB { get; set; }

        public double? AverageResult { get; set; }

        public void OnGet()
        {
        }

        public void OnPost()
        {
            if (IsValidInput(AgeOfDeathA, YearOfDeathA, AgeOfDeathB, YearOfDeathB))
            {
                int birthYearA = YearOfDeathA - AgeOfDeathA;
                int birthYearB = YearOfDeathB - AgeOfDeathB;

                int killedInBirthYearA = GetKilledInYear(birthYearA);
                int killedInBirthYearB = GetKilledInYear(birthYearB);

                if (killedInBirthYearA != -1 && killedInBirthYearB != -1)
                {
                    AverageResult = (killedInBirthYearA + killedInBirthYearB) / 2.0;
                }
                else
                {
                    AverageResult = -1;
                }
            }
            else
            {
                AverageResult = -1; 
            }
        }

        private bool IsValidInput(int ageOfDeathA, int yearOfDeathA, int ageOfDeathB, int yearOfDeathB)
        {
            return ageOfDeathA >= 0 && yearOfDeathA > 0 && ageOfDeathB >= 0 && yearOfDeathB > 0 &&
                   ageOfDeathA < yearOfDeathA && ageOfDeathB < yearOfDeathB;
        }

        private int GetKilledInYear(int year)
        {
            if (year <= 0) return -1;

            var results = new List<int> { 1 };
            var sortKills = new List<int> { 1 };

            for (int i = 1; i < year; i++)
            {
                int lastResult = results[^1];
                int killsData = sortKills.Count < 2 ? 1 : sortKills[^1] + sortKills[^2];
                sortKills.Add(killsData);
                int newResult = lastResult + killsData;

                results.Add(newResult);
            }

            return results[year - 1];
        }
    }
}