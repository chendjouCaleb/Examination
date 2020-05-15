using Everest.AspNetStartup.Binding;
using Everest.AspNetStartup.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Exam.Entities
{
    /// <summary>
    /// Poste en charge de la reception des copies après une
    /// épreuve et des traitements néccessaires sur ces copies.
    /// </summary>
    [ModelBinder(BinderType = typeof(ItemValueModelBinder))]
    public class Secretary : Entity<long>
    {
        public string UserId { get; set; }
        public string RegisterUserId { get; set; }

        [JsonIgnore] public virtual Examination Examination { get; set; }
        public long ExaminationId { get; set; }
    }
}