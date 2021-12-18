using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Exam.Entities.Courses;
using Exam.Entities.Periods;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Test : Entity<long>, IExtendedPeriod
    {
        public string RegisterUserId { get; set; }

        public uint Coefficient { get; set; }

        public uint Radical { get; set; }

        public bool IsGeneral { get; set; }
        public bool MultipleScore { get; set; }

        public bool UseAnonymity { get; set; }

        public DateTime ExpectedStartDate { get; set; }
        public DateTime ExpectedEndDate { get; set; }

        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        [NotMapped] public bool IsPublished => PublicationDate != null;

        public DateTime? PublicationDate { get; set; }

        public DateTime? LastGroupingDate { get; set; }

        public bool Grouped { get; set; }

        [NotMapped] public bool IsClosed => ClosingDate != null;
        public DateTime? ClosingDate { get; set; }


        public uint TestGroupCount { get; set; }
        public uint PaperCount { get; set; }
        public uint CorrectedPaperCount { get; set; }
        public uint PresentPaperCount { get; set; }
        public uint ConsignedPaperCount { get; set; }

        public uint NotGroupedStudentCount { get; set; }

        [JsonIgnore]
        public virtual SemesterCourse SemesterCourse { get; set; }
        public long? SemesterCourseId { get; set; }
        
        [JsonIgnore] public virtual ExaminationLevel ExaminationLevel { get; set; }
        public long? ExaminationLevelId { get; set; }


        [JsonIgnore]
        public virtual List<TestLevelSpeciality> TestLevelSpecialities { get; set; }
        
        [JsonIgnore] public virtual List<TestGroup> Groups { get; set; }
        [JsonIgnore] public virtual List<TestScore> TestScores { get; set; }

        [JsonIgnore] public virtual List<Paper> Papers { get; set; }
        

        [NotMapped] public string State => this.GetState();

        [NotMapped]
        [JsonIgnore]
        public string GroupsState
        {
            get
            {
                if (Groups.TrueForAll(g => g.GetState() == PeriodState.FINISHED))
                {
                    return PeriodState.FINISHED;
                }

                if (Groups.TrueForAll(g => g.GetState() == PeriodState.PENDING))
                {
                    return PeriodState.PENDING;
                }

                return PeriodState.PROGRESS;
            }
        }

        [NotMapped] public UserTest UserTest { get; set; }
    }


    public class UserTest
    {
        public bool IsCorrector { get; set; }
        public bool IsSupervisor { get; set; }
        public bool IsSecretary { get; set; }
        public bool IsStudent { get; set; }
    }


    public class TestStatistics
    {
        public long Frequency { get; set; }
        public double Median { get; set; }
        public double Mean { get; set; }
        public double Std { get; set; }
        public double Variance { get; set; }
        public double Skewness { get; set; }
        public double Mode { get; set; }
        public double Min { get; set; }
        public double Max { get; set; }

        public double Radical { get; set; }

        public double Quartile0 { get; set; }
        public double Quartile1 { get; set; }
        public double Quartile2 { get; set; }

        public double[] Scores { get; set; } = new double[0];


        public Paper MaxPaper { get; set; }

        public Paper MinPaper { get; set; }

        public int ConsignedFrequency { get; set; }
        public int CorrectedFrequency { get; set; }
        public int Presence { get; set; }
    }
}