﻿using System;
using System.ComponentModel.DataAnnotations;
using Exam.Entities;

namespace Exam.Models
{
    public class TestForm : IExpectedPeriod
    {
        [Required] public uint Coefficient { get; set; }

        [Required]
        public uint Radical  { get; set; }

        public bool UseAnonymity { get; set; }


        [Required] public DateTime ExpectedStartDate { get; set; }

        [Required] public DateTime ExpectedEndDate { get; set; }
    }

    public class TestEditForm
    {
        [Required] public uint Coefficient { get; set; }
        public bool UseAnonymity { get; set; }
    }
}