namespace Exam.Entities
{
    /// <summary>
    /// Represente une décomposition de la note d'une épreuve.
    /// Il peut arriver que la notation de l'épreuve néccessite une notation
    /// détaillée sur les différentes performances de l'étudiant.
    /// C'est le cas en rédaction ou en dissertation.
    /// </summary>
    public class Score
    {
        public string Name { get; set; }
    }
}