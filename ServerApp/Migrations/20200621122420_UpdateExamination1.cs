using Microsoft.EntityFrameworkCore.Migrations;

namespace Exam.Migrations
{
    public partial class UpdateExamination1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NonGroupedStudentsCount",
                table: "Examinations",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NonGroupedStudentsCount",
                table: "Examinations");
        }
    }
}
