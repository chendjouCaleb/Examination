namespace Exam.Models
{
    public class RoomForm
    {
        public string Name { get; set; }
        public uint Capacity { get; set; }
        public string Address { get; set; }
    }

    public class RoomInfoForm
    {
        public uint Capacity { get; set; }
        public string Address { get; set; }
    }
}