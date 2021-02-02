namespace Exam.Entities
{
    public class PapersStatistics
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