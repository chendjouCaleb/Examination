using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;

namespace Exam.Entities.Periods
{
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class SemesterGroup:Entity<long>
    {
        public string Name { get; set; }
        public uint Capacity { get; set; }
        public int Index { get; set; }

        public virtual SemesterLevel SemesterLevel { get; set; }
        public long SemesterLevelId { get; set; }

        public int StudentCount { get; set; }
    }
}